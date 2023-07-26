<template lang="">
  <v-container class="table-container">
    <div>
      <div style="text-align: right;">
        <v-btn class="register-button" @click="registerBoard">Create New Post</v-btn>
      </div>
    </div>
    <div v-if="!boards || (Array.isArray(boards) && boards.length === 0)">
      <v-data-table
        class="category-table"
        :headers="headers"
        :items="categories"
        hide-default-header
        hide-default-footer
        item-key="boardCategory"
        item-value="boardCategory"
        @click:row="readCategory"
        >
        <template v-slot:item.boardCategory="{ item }">
          <div>
            <div>{{ item.boardCategory }}</div>
            <div class="small-text">{{ getDescription(item.boardCategory) }}</div>
          </div>
        </template>
        <template v-slot:item.posts="{ item }">
          <div>
            <div><v-icon>mdi-message</v-icon> {{ item.posts }}</div>
          </div>
        </template>
      </v-data-table>
    </div>
    <div v-else>
      <v-row>
        <v-col v-for="board in boards" :key="board.boardId" cols="3">
          <v-card
            class="mx-auto my-12"
            max-width="374"
            @click=readBoard(board.boardId)
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
              <div v-if="board.category" class="text-subtitle-1" style="margin-top: -10px">
                in {{ board.category }}
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
        </v-col>
      </v-row>
      <v-pagination v-model="currentPage" :length="totalPages" @input="getPaginatedBoards"></v-pagination>
    </div>
  </v-container>
</template>

<script>
import env from '@/env'
import { mapActions, mapState } from 'vuex'

const boardModule = 'boardModule'

export default {
  data() {
    return {
      headers: [
        {
          text: 'Continents',
          align: 'start',
          value: 'boardCategory',
          class: "*"
        },
        { 
          text: 'Num of Posts', 
          value: 'posts',
          sortable: true,
          align: 'center',
          class: 'text-center',
          width: '100px',
        }
      ], 
      pageSize: 8,
      currentPage: 1,
      currentCategory: '',

      awsBucketName: env.api.MAIN_AWS_BUCKET_NAME,
      awsBucketRegion: env.api.MAIN_AWS_BUCKET_REGION,
      awsIdentityPoolId: env.api.MAIN_AWS_BUCKET_IDENTITY_POOL_ID,
    }
  },
  computed: {
    ...mapState(boardModule, ['categories', 'boards', 'totalElements']),
    totalBoards() {
      return this.totalElements;
    },
    totalPages() {
      return Math.ceil(this.totalBoards / this.pageSize);
    },
  },
  mounted() {
    this.requestCategoriesToSpring()
  },
  methods: {
    ...mapActions(boardModule, ['requestCategoriesToSpring', 'requestBoardListByCategoryToSpring']),
    getDescription(boardCategory) {
      if (boardCategory === 'Europe') {
        return 'Tips on Traveling Europian Countries'
      }
      return 'Tips on Traveling ' + boardCategory + 'n Countries'
    },
    async readCategory(event, { item }) {
      this.currentPage = 1
      const category = item.boardCategory
      const currentPage = this.currentPage - 1
      const pageSize = this.pageSize
      await this.requestBoardListByCategoryToSpring({category, currentPage, pageSize})
      this.currentCategory = category
    },
    async getPaginatedBoards() {
      const category = this.currentCategory
      const currentPage = this.currentPage - 1
      const pageSize = this.pageSize
      await this.requestBoardListByCategoryToSpring({category, currentPage, pageSize})
      console.log(currentPage)
      console.log(pageSize)
      console.log("리스트 페이지: " + this.boards)
    },

    readBoard(boardId) {
      this.$router.push({
        name: 'BoardReadPage',
        params: {boardId: boardId.toString()}
      })
    },
    async registerBoard() {
      if (localStorage.getItem("userToken") == null) {
        alert("로그인 후 이용할 수 있습니다")
      } else {
        await this.$router.push({ name: 'BoardRegisterPage'})
        const targetElement = document.getElementById('register-section');
        if (targetElement) {
          targetElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
        
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
  }
    
}
</script>
<style>
.table-container{
  width: 100%;
  padding-bottom: 30px;
}

.category-table {
  margin-top: 24px;
}
.category-table td{
  font-size: 21px !important;
  height: 92px !important;
}
.small-text {
  font-size: 12px;
}

.list-table {
  margin-top: 24px;
}
.list-table td{
  font-size: 17px !important;
  height: 86px !important;
}

.board_title_template {
  padding-left: 15px; 
  text-align: left;
}

.register-button {
  background-color: rgb(75, 8, 8) !important;
  color: white !important;
  border-radius: 0;
  height: 50px !important;
  width: 200px !important;
  font-size: 13px;
  font-family: Arial, Helvetica, sans-serif;
}   

.chip_icon{
  margin-right: 5px;
  font-size: 8px;
}

.title_container {
  position: absolute;
  bottom: 2px;
  left: 2px;
  background-color: rgba(0, 0, 0, 0);
  color: white;
}
.title_text {
  font-size: 28px;
  -webkit-text-stroke: 0.3px black;
  text-shadow: 2px 2px 4px black;
}




</style>
