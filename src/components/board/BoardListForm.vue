<template lang="">
  <div>
    <v-app-bar flat color=black >
      <div class="toolbar_buttons">
        <button v-for="button in buttons" :key="button.label" class="board_button"
          :disabled="button.isDisabled" :style="{ color: button.textColor}" 
          @click="toggleButton(button.label)">
          {{ button.label }}
        </button>
      </div>
      <div class="toolbar_search">
        <input type="text" placeholder="  Search" 
          class="search_input" 
          v-model="searchWord"
          @keyup.enter="search"/>
          <button @click="search">
            <v-icon style="color: white; font-size:40px">mdi-magnify</v-icon>
          </button>
      </div>
    </v-app-bar>
    <div class="board-list-form">
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
    </div>
  </div>
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

      buttons: [
        { label: "Places", isDisabled: true, textColor: "#CCCCCC"},
        { label: "Interests", isDisabled: false, textColor: "white"},
        { label: "New Posts", isDisabled: false, textColor: "white"}
      ],
      searchWord: '',
      recentMarker: false,
      interestMarker: false,
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
    ...mapActions(boardModule, [
      'requestCategoriesToSpring', 
      'requestBoardListByCategoryToSpring', 
      'clearBoards', 
      'requestSearchBoardsToSpring', 
      'requestRecentBoardsToSpring',
      'requestMostLikedBoardsToSpring'
    ]),
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
      this.clearSearch()
      this.recentMarker = false
      this.interestMarker = false
    },
    async getPaginatedBoards() {
      if (this.currentCategory) {
        const category = this.currentCategory
        const currentPage = this.currentPage - 1
        const pageSize = this.pageSize
        await this.requestBoardListByCategoryToSpring({category, currentPage, pageSize})
      }
      if (this.searchWord) {
        const searchKeyword = this.searchWord
        const currentPage = this.currentPage - 1
        const pageSize = this.pageSize
        await this.requestSearchBoardsToSpring({searchKeyword, currentPage, pageSize})
      }
      if(this.recentMarker) {
        const currentPage = this.currentPage - 1
        const pageSize = this.pageSize
        await this.requestRecentBoardsToSpring({ currentPage, pageSize })
      }
      if(this.interestMarker) {
        const currentPage = this.currentPage - 1
        const pageSize = this.pageSize
        await this.requestMostLikedBoardsToSpring({ currentPage, pageSize })
      }
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
    },
    toggleButton(label) {
      if (label === "Places") {
        this.buttons = [
          { label: "Places", isDisabled: true, textColor: "#CCCCCC"},
          { label: "Interests", isDisabled: false, textColor: "white"},
          { label: "New Posts", isDisabled: false, textColor: "white"}
        ]
        this.clearBoards()
        this.clearSearch() 
      }
      if (label === "Interests") {
        this.buttons = [
          { label: "Places", isDisabled: false, textColor: "white"},
          { label: "Interests", isDisabled: true, textColor: "#CCCCCC"},
          { label: "New Posts", isDisabled: false, textColor: "white"}
        ]
        this.interestMarker = true
        this.currentPage = 1
        const currentPage = this.currentPage - 1
        const pageSize = this.pageSize
        this.requestMostLikedBoardsToSpring({ currentPage, pageSize })
        this.clearSearch() 
        this.clearCurrentCategory()
        this.recentMarker = false
      }
      if (label === "New Posts") {
        this.buttons = [
          { label: "Places", isDisabled: false, textColor: "white"},
          { label: "Interests", isDisabled: false, textColor: "white"},
          { label: "New Posts", isDisabled: true, textColor: "#CCCCCC"}
        ],
        this.recentMarker = true
        this.currentPage = 1
        const currentPage = this.currentPage - 1
        const pageSize = this.pageSize
        this.requestRecentBoardsToSpring({ currentPage, pageSize })
        this.clearSearch() 
        this.clearCurrentCategory()
      }
    },
    isThereBoards () {
      const isThereSearch = this.searchWord.length > 1
      if (this.boards.length !== 0) {
        this.buttons = this.buttons.map(button => {
          if (isThereSearch) {
            return { ...button, isDisabled: false, textColor: "white"}
          }
          else {
            if (button.label === 'Places') {
            return { ...button, isDisabled: false, textColor: "white"}
            }
            return button;
          }})
      }
    },
    search() {
      if (this.searchWord.length >= 2 ) {
        this.currentPage = 1
        this.clearCurrentCategory()
        this.recentMarker = false
        this.interestMarker = false
        const searchKeyword = this.searchWord
        const currentPage = this.currentPage - 1
        const pageSize = this.pageSize

        this.requestSearchBoardsToSpring({ searchKeyword, currentPage, pageSize })
      }
      else { alert("두 글자 이상만 검색 가능합니다.")}
    },
    clearSearch() {
      this.searchWord = ''
    },
    clearCurrentCategory(){
      this.currentCategory = ''
    }
  },
  watch: {
    boards: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.isThereBoards()
        }
      }
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
.toolbar_buttons {
  display: flex;
  align-items: center;
}

.board_button {
  margin-left: 45px;
  font-size: 18px;
  background-color: transparent;
  border: none;
}

.toolbar_search {
  margin-left: auto;
  margin-right: 15px;

}

.search_input {
  background-color: transparent;
  border-color: white;
  color: white;
  border-style: solid;
  border-radius: 8px;
  font-size: 18px;
  margin-left: 12px;
}

.board-list-form {
  background-color: white;
  border: 1px solid black;
}



</style>
