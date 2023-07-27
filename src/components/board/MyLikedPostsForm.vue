<template>
    <v-container>
      <div class="my-liked-posts-black-bar"></div>
      <div>
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
  import env from "@/env"
  import { mapActions, mapState } from 'vuex';
  
  const boardModule = 'boardModule'
  
  export default {
    data() {
      return {
        userToken: localStorage.getItem('userToken'),

        pageSize: 8,
        currentPage: 1,

        awsBucketName: env.api.MAIN_AWS_BUCKET_NAME,
        awsBucketRegion: env.api.MAIN_AWS_BUCKET_REGION,
        awsIdentityPoolId: env.api.MAIN_AWS_BUCKET_IDENTITY_POOL_ID,
      }
    },
    methods: {
      ...mapActions(boardModule, ['requestMyLikedPostListToSpring']),
      readBoard(boardId) {
        this.$router.push({
          name: 'BoardReadPage',
          params: {boardId: boardId.toString()}
        })
      },
      async getPaginatedBoards() {
        const { userToken, pageSize } = this
        const currentPage = this.currentPage - 1
        await this.requestMyLikedPostListToSpring({userToken, pageSize, currentPage})
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
    },
    async mounted() {
      this.getPaginatedBoards()
    },
    computed: {
      ...mapState(boardModule, ['boards', 'totalElements']),
        totalBoards() {
        return this.totalElements;
      },
      totalPages() {
        return Math.ceil(this.totalBoards / this.pageSize);
      },
    },
  }
  
  </script>
  
  <style>
  .my-liked-posts-black-bar{
    background-color: black;
    height: 75px;
    width: 100%;
    margin-bottom: -25px;
  }
  .my_liked_board_title_template {
    padding-left: 15px; 
    text-align: left;
    margin-right: 200px;
  }
  </style>