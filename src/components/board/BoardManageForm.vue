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
    <div>
      <div style="text-align: center; margin-bottom: -25px">
        <span><h2>게시글 표시 형식 보기: </h2></span>
      </div>
      <v-card
            class="mx-auto my-12"
            max-width="374"
          >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img
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
    <v-row style="padding-left: 9px">
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
        <button v-if="!isEdit" class="manage_button" @click="isEdit=!isEdit">Edit</button>
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
        if (!this.title) {
         this.title = this.board.title
        }
        if (!this.content) {
          this.content = this.board.content
        }
        const { boardId, title, content } = this
        await this.requestModifyBoardToSpring({ boardId, title, content })
        location.reload()
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
    }
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
</style>