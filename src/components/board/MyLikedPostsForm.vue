<template>
    <v-container>
      <div class="my-liked-posts-black-bar"></div>
      <div>
        <v-data-table
          class="list-table"
          :headers="boardHeaders"
          :items="pagedItems"
          :pagination.sync="pagination"
          item-key="boardId"
          item-value="boardId"
          @click:row="toManageBoard">
          <template v-slot:item.title="{ item }">
            <div class="my_liked_board_title_template">
              <div style="font-size: 18px">{{ item.title }}</div>
              <div style="font-size: 12px">in {{ item.category }}</div>
            </div>
          </template>
          <template v-slot:item.likeCount="{ item }">
            <div>
              <div><v-icon style="margin-right: 5px; top: -3px">mdi-thumb-up</v-icon>{{ item.likeCount }}</div>
            </div>
          </template>
          <template v-slot:item.viewCount="{ item }">
            <div>
              <div><v-icon style="margin-right: 5px; top: -3px">mdi-eye</v-icon>{{ item.viewCount }}</div>
            </div>
          </template>
          <template v-slot:item.createDate="{ item }">
            <div>
              <div>{{ new Date(item.createDate).toLocaleDateString('en-US') }}</div>
            </div>
          </template>
        </v-data-table>
  
        <v-pagination
          v-model="pagination.page"
          :length="Math.ceil(boards.length / perPage)"/>
      </div>
    </v-container>
  </template>
  
  <script>
  import { mapActions, mapState } from 'vuex';
  
  const boardModule = 'boardModule'
  
  export default {
    data() {
      return {
        userToken: localStorage.getItem('userToken'),
        boardHeaders: [
          {
            align: 'center',
            text: '제목',
            value: 'title',
          },
          { text: '작성자', align: 'end', value: 'writer' },
          { text: 'likes', align: 'left', value: 'likeCount' },
          { text: 'views', align: 'left', value: 'viewCount' },
          { text: '작성일자', align: 'end', value: 'createDate' }
        ],
        perPage: 5,
        pagination: {
            page: 1
        },
      }
    },
    methods: {
      ...mapActions(boardModule, ['requestMyLikedPostListToSpring']),
      toManageBoard(event, { item }) {
        const boardId = item.boardId
        this.$router.push({
          name: 'BoardReadPage',
          params: {boardId: boardId.toString()}
        })
      },
    },
    async mounted() {
      await this.requestMyLikedPostListToSpring(this.userToken)
    },
    computed: {
      ...mapState(boardModule, ['boards']),
      pagedItems () {
        const startIdx = (this.pagination.page - 1) * this.perPage
        const endIdx = startIdx + this.perPage
        return this.boards.slice(startIdx, endIdx)
      },
    }
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