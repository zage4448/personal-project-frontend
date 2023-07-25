<template>
    <div>
      <div class="category_banner" :style="{ backgroundImage: `url(${backgroundImage})`}"></div>
      <div>
        <div class="board">
          <div class="board_title">
            {{ board.title }}
          </div>
          <div class="board_category_title">
            in {{ board.boardCategory }}
          </div>
          <v-row>
            <v-col cols="10">
              <div class="board_left">
                <div class="board_info">
                  {{ board.writer }}<br> 
                  <div>작성일자: {{ new Date(board.createDate).toLocaleDateString('en-US') }}</div>
                  <div v-if="board.updateDate && board.updateDate != board.createDate">
                    수정일자: {{ new Date(board.updateDate).toLocaleDateString('en-US') }}
                  </div>
                </div>
                <v-row no-gutters>
                  <v-col cols="6">
                    <v-card
                    >
                    <v-img :src="board.imageNameList ? getImage(board.imageNameList[0]) : ''"></v-img>
                    </v-card>
                  </v-col>
                  <v-col cols="3">
                    <v-card
                    >
                    <v-img :src="board.imageNameList ? getImage(board.imageNameList[1]) : ''"></v-img>
                    <v-img :src="board.imageNameList ? getImage(board.imageNameList[2]) : ''"></v-img>
                    </v-card>
                  </v-col>
                  <v-col cols="3">
                    <v-card
                    >
                    <v-img :src="board.imageNameList ? getImage(board.imageNameList[3]) : ''"></v-img>
                    <v-img :src="board.imageNameList ? getImage(board.imageNameList[4]) : ''"></v-img>
                    </v-card>
                  </v-col>
                </v-row>
                <div class="board_content" v-html="board.content"></div>
                <div class="board_like" v-if="!isBoardLiked" >
                  <button @click="likeBoard"><v-icon>mdi-thumb-up-outline</v-icon> Like</button>
                </div>
                <div class="board_like" v-if="isBoardLiked" >
                  <button @click="unlikeBoard"><v-icon style="color: blue">mdi-thumb-up</v-icon> Like</button>
                </div>
                <v-divider class="board_divider"></v-divider>
                <div class="board_comments">
                  <h4 style="line-height: 3;">Comments</h4>
                  <v-textarea 
                    label="comment" 
                    clearable
                    outlined
                    auto-grow
                    rows="2"
                    row-height="15"
                    v-model="comment">
                  </v-textarea>
                </div>
                <div class="buttons_for_comment">
                  <v-btn style="text-transform: none;" @click="addComment">댓글 달기</v-btn>
                </div>
                <v-divider class="board_divider"></v-divider>
                <div class="board_current_comments">
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
                          <v-icon v-if="userNickname == item.nickname" class="delete-icon" @click="deleteComment(item.commentId)">mdi-trash-can</v-icon>
                          <span v-html="item.content"></span>
                        </div>
                      </td>
                    </template>
                  </v-data-table>
                </div>
              </div>
            </v-col>
              <v-col cols="2">
              <div class="board_right">
                <div class="board_buttons">
                  <button class="save_button">Save</button>
                </div>
                <div class="views_and_comments">
                  <v-icon>mdi-eye</v-icon>
                  {{ board.views }} views <br>
                  <v-icon>mdi-message</v-icon>
                  {{ board.commentCount }} comments <br>
                  <v-icon>mdi-thumb-up-outline</v-icon> 
                  {{ board.likeCount }} likes
                </div>
                <div class="similar_posts">
                  <h4 style="line-height: 3;">Similar Posts</h4>
                  <button class="similar_posts_button" v-for="board in relatedBoardList" :key="board.boardId" @click="toRelatedBoard(board.boardId)">
                    {{ board.title }}
                  </button>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
</template>
<script>
import env from '@/env'
import { mapActions } from 'vuex'

const boardModule = 'boardModule'
const commentModule = 'commentModule'


export default {
  data() {
    return {
      backgroundImage: '',
      comment: '',
      userToken: localStorage.getItem('userToken'),
      userNickname: localStorage.getItem('nickname'),
      isBoardLiked: false,
      commentHeaders: [
        {
          align: 'start',
          value: 'content',
          class: '*'
        },
      ],

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
    relatedBoardList: {
      type: Array,
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
  beforeUpdate() {
    this.checkIsBoardLiked()
  },
  methods: {
    ...mapActions(boardModule, ['requestIsBoardLikedToSpring', 'requestLikeBoardToSpring', 'requestUnlikeBoardToSpring', 'requestReadBoardToSpring']),
    ...mapActions(commentModule, ['requestAddCommentToSpring', 'requestCommentListToSpring', 'requestDeleteCommentToSpring']),
    async checkIsBoardLiked() {
      if (this.userToken) {
        const { boardId, userToken } = this
        this.isBoardLiked = await this.requestIsBoardLikedToSpring({boardId, userToken})
      }
      else return false
    },
    toRelatedBoard(boardId) {
      this.$router.push({
        name: 'BoardReadPage', 
        params: {boardId: boardId.toString()}
      })
      location.reload()
    },
    async likeBoard() {
      if (this.userToken) {
        const { boardId, userToken } = this
        await this.requestLikeBoardToSpring({boardId, userToken})
        this.isBoardLiked = await this.requestIsBoardLikedToSpring({boardId, userToken})
        this.requestReadBoardToSpring(boardId)
      } 
      else alert("로그인 후 이용 가능합니다")
    },
    async unlikeBoard() {
      const { boardId, userToken } = this
      await this.requestUnlikeBoardToSpring({boardId, userToken})
      this.isBoardLiked = await this.requestIsBoardLikedToSpring({boardId, userToken})
      this.requestReadBoardToSpring(boardId)
    },
    async addComment() {
      if (this.userToken) {
        const { boardId, comment, userToken } = this
        await this.requestAddCommentToSpring({ boardId, comment, userToken })
        await this.requestCommentListToSpring(this.boardId)
        await this.requestReadBoardToSpring(boardId)
        this.comment = ''
      }
      else alert("로그인 후 이용 가능합니다")
    },
    async deleteComment(commentId) {
      if (confirm("댓글을 삭제 하시겠습니까?")) {
        const { boardId } = this
        await this.requestDeleteCommentToSpring({boardId, commentId})
        await this.requestCommentListToSpring(this.boardId)
        await this.requestReadBoardToSpring(boardId)
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
.category_title{
  color: white;
  font-size: 42px;
  text-align: center;
  text-shadow: 2px 2px 4px #000;
  padding-top: 20px;
}
.board{
  width: 85%;
  background-color: white;
  margin-left: 7rem;
  margin-right: 7rem;
  height: auto;
  overflow: hidden;
  padding-bottom: 50px
}
.board_title{
  background-color: black;
  height: auto;
  font-size: 36px;
  color: white;
  padding-left: 10px;
  padding-top: 4px;
}
.board_category_title{
  background-color: #000;
  height: auto;
  font-size: 22px;
  color: white;
  padding-left: 18px;
  padding-bottom: 4px;
}
.board_info{
  height: auto;
  font-size: 18px;
  padding-left: 18px;
  padding-top: 15px;
}
.board_content{
  background-color: white;
  padding-left: 18px;
  padding-top: 30px;
}
.board_buttons{
  padding-top: 15px;
}
.views_and_comments{
  margin-top: 18px;
  border: dotted 1px black;
  width: 170px;
  text-align: left;
  line-height: 3;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 18px
}
.similar_posts{
  margin-top: 18px;
  border: dotted 1px black;
  width: 170px;
  text-align: left;
  line-height: 2;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 18px;
}
.board_like{
  padding-left: 18px;
  padding-top: 25px;
  font-size: 22px;
}
.board_comments{
  padding-top: 18px;
  padding-left: 18px;
}
.buttons_for_comment{
  text-align: end;
  margin-bottom: 20px;
}
.board_current_comments{
  margin-top: 20px;
}

.comment_button{
  background-color: rgba(0, 0, 0, 0.507);
  color: white;
  width: 170px;
  height: auto;
  padding-top: 6px;
  padding-bottom: 6px;
}
.save_button{
  background-color: white;
  width: 170px;
  height: auto;
  padding-top: 6px;
  padding-bottom: 6px;
  border: black solid 1px;
  margin-top: 18px
}
.similar_posts_button {
  font-size: 14px;
  text-align: start;
  margin-bottom: 8px;
  display: block;
}
.board_divider{
  margin-left: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.comment-container {
  display: flex;
  flex-direction: column;
  padding: 9px;
  border-bottom: 1px solid black;
}

.comment-content {
  font-size: 1.5rem;
  position: relative;
}

.comment-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  background-color: #CCC
}

.comment-nickname,
.comment-created {
  color: #888;
}

.delete-icon{
  position: absolute;
  float: right;
  margin-top: 3px;
  cursor: pointer;
}

</style>
