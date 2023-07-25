<template>
  <div class="manage_board">
    <div v-if="!isEdit" class="board_title">
      {{ board.title }}
    </div>
    <div v-if="isEdit" class="board_title">
      <v-text-field class="edit_title" label="제목 수정하기" v-model="title"></v-text-field>
    </div>
    <div class="board_category_title">
      in {{ board.boardCategory }}
    </div>
    <v-row>
      <v-col cols="10">
        <div class="manage_board_left">
    <div class="board_info">
      {{ board.writer }}<br> 
      <div>작성일자: {{ new Date(board.createDate).toLocaleDateString('en-US') }}</div>
      <div v-if="board.updateDate && board.updateDate != board.createDate">
      수정일자: {{ new Date(board.updateDate).toLocaleDateString('en-US') }}
      </div>
    </div>
    <v-row style="padding: 20px">
      <v-col cols="4" v-if="isEdit">
        <v-file-input
          label="썸네일"
          prepend-icon="mdi-star"
          chips
          ref="mainFile"
          type="file" 
          @change="handleMainFileUpload()">
        </v-file-input>
      </v-col>
      <v-col>
        <div>
        <div style="text-align: center; margin-bottom: -25px">
          <span><h2>게시글 표시 형식 보기: </h2></span>
        </div>
          <v-card
            class="mx-auto my-12"
            max-width="374">
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>

              <v-img
                v-if="mainFilePreview && isEdit"
                height="250"
                :src="mainFilePreview"
              >
                <div class="title_container">
                  <v-card-title class="title_text">{{board.title}}</v-card-title>
                </div>
              </v-img>
              <v-img v-else
                height="250"
                :src="getImage(board.thumbNailName)"
              >
                <div class="title_container">
                  <v-card-title class="title_text">{{board.title}}</v-card-title>
                </div>
              </v-img>

              <v-card-text>
                <div class="text-subtitle-1" style="margin-top: -10px">
                  in {{ board.boardCategory }}
                </div>
                <div class="my-2 text-subtitle-1">
                  {{ board.writer }}
                </div>

              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <div class="my-3 text-subtitle-2" style="padding-left: 16px;">
                  {{ board.content }}
                </div>

              <v-card-text>
                <v-chip-group>
                  <v-chip>
                    <v-icon class="chip_icon">mdi-eye</v-icon>
                    {{ board.viewCount}} 
                  </v-chip>

                  <v-chip>
                    <v-icon class="chip_icon">mdi-thumb-up-outline</v-icon> 
                    {{ board.likeCount}}
                  </v-chip>

                  <v-chip>
                    <v-icon class="chip_icon">mdi-message</v-icon>
                    {{ board.commentCount}}
                  </v-chip>

                </v-chip-group>
              </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="isEdit">
      <v-file-input
        style="padding: 20px;"
        label="사진"
        prepend-icon="mdi-camera"
        multiple
        ref="additionalFile"
        type="file" 
        @change="handleAdditionalFilesUpload()">
      </v-file-input>
    </v-row>
    <v-row v-if="isEdit">
      <v-col v-for="(previewURL, index) in additionalFilePreviews" :key="index" cols="3">
        <v-img :src="previewURL" v-if="previewURL" style="max-width: 100%; max-height: 100%;">
          <v-icon
            class="file-input__action-icon remove_icon"
            @click="removeNewFile(index)"
          >
            mdi-close
          </v-icon>
        </v-img>
        <span>{{ additionalFileNames[index] }}</span>
      </v-col>   
    </v-row>
    <v-row v-if="isEdit" style="margin-bottom: 50px;">   
      <v-col v-for="(imageName, index) in currentImageNameList" :key="index" cols="3">
        <v-img :src="getImage(imageName)" style="max-width: 100%; max-height: 100%;">
          <v-icon
            class="file-input__action-icon remove_icon"
            @click="removeCurrentFile(index)"
          >
            mdi-close
          </v-icon>
        </v-img>
      </v-col>
    </v-row>
    <v-row style="padding-left: 9px" v-if="!isEdit">
      <v-col cols="6">
        <v-card
        >
        <v-img :src="board.imageNameList ? getImage(board.imageNameList[0]) : ''"></v-img>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
        >
        <v-img :src="board.imageNameList ? getImage(board.imageNameList[1]) : ''" style="margin-bottom: 10px;"></v-img>
        <v-img :src="board.imageNameList ? getImage(board.imageNameList[2]) : ''"></v-img>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
        >
        <v-img :src="board.imageNameList ? getImage(board.imageNameList[3]) : ''" style="margin-bottom: 10px;"></v-img>
        <v-img :src="board.imageNameList ? getImage(board.imageNameList[4]) : ''"></v-img>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="!isEdit" class="board_content" v-html="board.content"></div>
    <div v-if="isEdit">
      <v-textarea style="padding: 20px;" 
                  label="본 글 수정하기" 
                  v-model="content"
                  clearable
                  rows="6"
                  row-height="20">
      </v-textarea>
      <div align="center">
        <v-btn @click="modifyBoard">게시글 <br> 수정하기</v-btn>
      </div>
    </div>  
    <v-divider class="board_divider"></v-divider>
    <div class="board_current_comments">
      <h4 style="line-height: 3; padding-left: 18px;">Comments</h4>
      <v-data-table
        :headers="commentHeaders"
        :items="comments"
        hide-default-header
        hide-default-footer
        item-key="commentId">
        <template #item="{ item }">
          <td colspan="3" class="comment-container">
            <div class="comment-meta">
              <div class="comment-nickname">{{ item.nickname }}</div>
              <div class="comment-created">{{ new Date(item.createDate).toLocaleDateString('en-US') }}</div>
            </div>
            <div class="comment-content">
              <span v-html="item.content"></span>
            </div>
          </td>
        </template>
      </v-data-table>
    </div>
  </div>
      </v-col>
      <v-col cols="2" class="right_col">
        <div class="manage_board_right">
      <div class="board_buttons">
        <button v-if="!isEdit" class="manage_button" @click="readyToEdit">Edit</button>
        <button v-if="isEdit" class="clicked_manage_button" @click="isEdit=!isEdit">Edit</button>
        <button class="manage_button" @click="openDeleteConfirmation">Delete</button>
      </div>
      <div class="views_and_comments">
        <v-icon>mdi-eye</v-icon>
        {{ board.views }} views <br>
        <v-icon>mdi-message</v-icon>
        {{ board.commentCount }} comments <br>
        <v-icon>mdi-thumb-up-outline</v-icon> 
        {{ board.likeCount }} likes
      </div>
    </div>
</v-col>
</v-row>

  <div v-if="showConfirmation" class="popup-container">
      <div class="popup" align="center">
        삭제를 위해 비밀번호를 입력 하세요
        <v-text-field
            v-model="password"
            label="비밀번호: "
            :disabled="false"
            type="password">
        </v-text-field>
        <button @click="closeDeleteConfirmation">취소</button>
        <button @click="deleteBoard()">삭제</button>
      </div>
    </div>
</div>
</template>

<script>
import env from '@/env'
import AWS from 'aws-sdk'
import { mapActions } from 'vuex';

const boardModule = 'boardModule'
const accountModule = 'accountModule'

export default {
  data() {
    return {
      commentHeaders: [
        {
          align: 'start',
          value: 'content',
          class: '*'
        }
      ],
      isEdit: false,
      showConfirmation: false,
      content: '',
      title: '',
      password: '',
      userToken: localStorage.getItem('userToken'),

      file: null,
      newThumbNailName: '',
      additionalImageNameList:[],
      selectedFiles: [],
      currentImageNameList: [],
      deletedFileNameList: [],

      mainFilePreview: '',
      additionalFilePreviews: [],
      additionalFileNames: [],

      s3: null,
      awsBucketName: env.api.MAIN_AWS_BUCKET_NAME,
      awsBucketRegion: env.api.MAIN_AWS_BUCKET_REGION,
      awsIdentityPoolId: env.api.MAIN_AWS_BUCKET_IDENTITY_POOL_ID,
    }
  },
  props: {
    board: {
      type: Object,
      required: true
    },
    boardId: {
      type: String,
      required: true
    },
    comments: {
      type: Array
    }
  },
  watch: {
    isEdit(newVal) {
      if (newVal) {
        const convertedContent = this.board.content.replace(/<br\s*\/?>/g, '\n')
        this.content = convertedContent
        this.title = this.board.title
      }
    },
  },
  methods: {
    ...mapActions(boardModule, ['requestModifyBoardToSpring', 'requestDeleteBoardToSpring']),
    ...mapActions(accountModule, ['requestCheckPasswordToSpring']),
    async modifyBoard() {
      if (confirm("게시글을 수정 하시겠습니까?")) {
        await this.modifyThumbNail()
        if (this.deletedFileNameList.length > 0 ) {
          await this.deleteImages()
        }
        if (this.selectedFiles.length > 0) {
          await this.modifyImages()
        }
        if (!this.title) {
         this.title = this.board.title
        }
        if (!this.content) {
          this.content = this.board.content
        }
        const newImageNameList = [...this.additionalImageNameList, ...this.currentImageNameList]
        const { boardId, title, content, newThumbNailName} = this
        await this.requestModifyBoardToSpring({ boardId, title, content, newThumbNailName, newImageNameList })
        setTimeout(() => {
          location.reload()
        }, 500)
      }
    },
    openDeleteConfirmation() {
      this.showConfirmation = true;
    },
    closeDeleteConfirmation() {
      this.showConfirmation = false;
      this.password = '';
    },
    async deleteBoard() {
      const { userToken, password } = this
      const passwordPass = await this.requestCheckPasswordToSpring({ userToken, password })
      if (!passwordPass) {
        alert("비밀번호를 확인하세요")
        return
      }
      else if (confirm("게시글을 삭제 하시겠습니까?")) {
        await this.requestDeleteBoardToSpring(this.boardId)
        alert("게시글이 삭제 됐습니다")
        await this.$router.push({ name: 'MyPostsPage' })
      }
    },
    readyToEdit() {
      this.isEdit = !this.isEdit
      this.mainFilePreview = ''
      this.file = null
      this.selectedFiles = []
      this.additionalFilePreviews = []
      this.additionalFileNames = []
      this.deletedFileNameList = []
      if (this.currentImageNameList.length == 0) {
        for (let i = 0; i < this.board.imageNameList.length; i++) {
        this.currentImageNameList.push(this.board.imageNameList[i])
        }
      } else {
        this.currentImageNameList = []
        for (let i = 0; i < this.board.imageNameList.length; i++) {
        this.currentImageNameList.push(this.board.imageNameList[i])
        }
      }
    },
    handleMainFileUpload() {
      const inputElement = this.$refs.mainFile.$el.querySelector('input[type="file"]');
      if (inputElement.files && inputElement.files.length > 0) {
        this.file = inputElement.files[0];

        const reader = new FileReader();
        reader.onload = (event) => {
          this.mainFilePreview = event.target.result;
        };
        reader.readAsDataURL(this.file);
      }
    },
    handleAdditionalFilesUpload() {
      const inputElement = this.$refs.additionalFile.$el.querySelector('input[type="file"]');
      if (inputElement.files && inputElement.files.length > 0) {
        this.additionalFilePreviews = []; 
        this.additionalFileNames = []; 
        this.selectedFiles = []; 

        this.readFilesSequentially(inputElement.files, 0);
      }
    },
    readFilesSequentially(files, index) {
      const file = files[index];
      const reader = new FileReader();
      const vm = this;
      this.selectedFiles.push(file);

      reader.onload = (event) => {
        vm.additionalFilePreviews.push(event.target.result);
        vm.additionalFileNames.push(file.name);

        if (index + 1 < files.length) {
          vm.readFilesSequentially(files, index + 1);
        }
      };
      reader.readAsDataURL(file);
    },
    removeNewFile(index) {
      this.selectedFiles.splice(index, 1);
      this.additionalFilePreviews.splice(index, 1);
      this.additionalFileNames.splice(index, 1);
    },
    removeCurrentFile(index) {
      this.deletedFileNameList.push(this.currentImageNameList[index])
      this.currentImageNameList[index]
      this.currentImageNameList.splice(index, 1);
    },
    async modifyThumbNail () {    
      this.awsS3Config()
      if (this.file != null) {
        await this.s3.deleteObject({
          Key: this.board.thumbNailName
        }, (err, data) => {
          if (err) {
            return alert('문제 발생' + err.message)
          }
        })
        this.newThumbNailName = this.createUniqueName() + this.file.name
        await this.s3.upload({
          Key: this.newThumbNailName,
          Body: this.file,
          ACL: 'public-read',
        }, (err, data) => {
          if (err) {
              console.log(err)
              return alert("메인 이미지 업로드 중 문제 발생", err.message)
          }
        })
      } else {
        this.newThumbNailName = this.board.thumbNailName
      }
    },

    async deleteImages() {
      this.awsS3Config()
      for(let i = 0; i < this.deletedFileNameList.length; i++) {
        const imageName = this.deletedFileNameList[i]
        await this.s3.deleteObject({
          Key: imageName
        }, (err, data) => {
          if (err) {
            return alert('문제 발생' + err.message)
          }
        })
      }
    },

    async modifyImages() {  
      this.awsS3Config()
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const imageName = this.createUniqueName() + this.selectedFiles[i].name
        this.additionalImageNameList.push(imageName)
        await this.s3.upload({
          Key: imageName,
          Body: this.selectedFiles[i],
          ACL: 'public-read',
        }, (err, data) => {
          if (err) {
            console.log(err)
            return alert("새로운 이미지 업로드 실패", err.message)
          }
        })
      }
    },

    awsS3Config () {
      AWS.config.update({
          region: this.awsBucketRegion,
          credentials: new AWS.CognitoIdentityCredentials({
              IdentityPoolId: this.awsIdentityPoolId
          })
      })

      this.s3 = new AWS.S3({
          apiVersion: '2006-03-01',
          params: {
              Bucket: this.awsBucketName
          }
      })
    },
    getImage(imageName) {
      this.awsS3Config()
      return `https://${this.awsBucketName}.s3.${this.awsBucketRegion}.amazonaws.com/${imageName}`
    },
    createUniqueName() {
      const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomUUID = '';
        for (let i = 0; i < 8; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomUUID += characters[randomIndex];
        }
        return randomUUID
    },
  },
}


</script>

<style>
.manage_board{
  width: 85%;
  background-color: white;
  margin-left: 7rem;
  margin-right: 7rem;
  height: auto;
  overflow: hidden;
  padding-bottom: 50px;
}  
.manage_button{
  background-color: white;
  width: 170px;
  height: auto;
  padding-top: 6px;
  padding-bottom: 6px;
  border: black solid 1px;
  margin-top: 18px
}

.clicked_manage_button{
  background-color: #CCC;
  width: 170px;
  height: auto;
  padding-top: 6px;
  padding-bottom: 6px;
  border: black solid 1px;
  margin-top: 18px
}
.edit_title{
  padding: 20px;
  
}
.edit_title input {
  color: white !important;
  font-size: 36px;
}
.edit_title label {
  color: white !important;
}

.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 300px;
}

.popup button {
  padding: 10px 15px;
  margin: 5px;
}

.remove_icon {
  color: white !important;
  -webkit-text-stroke: 0.1px black;
  text-shadow: 0.5px 0.5px 2px black;
}
</style>