<template lang="">
  <v-container class="table-container">
    <div style="text-align: right;">
      <v-btn class="register-button" @click="registerBoard">Create New Post</v-btn>
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
      <v-data-table
        :headers="boardHeaders"
        :items="pagedItems"
        :pagination.sync="pagination"
        item-key="boardId"
        item-value="boardId"
        @click:row="readBoard">
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
      // categories: [
      //   {continent: 'Asia', posts: 56}, 
      //   {continent: 'Europe', posts: 41}, 
      //   {continent: 'North America', posts: 25}, 
      //   {continent: 'South America', posts: 14}, 
      //   {continent: 'Africa', posts: 18}, 
      //   {continent: 'Australia', posts: 14}
      // ],
      boardHeaders: [
        {
          align: 'start',
          sortable: true,
          value: 'boardId'
        },
        { text: '제목', align: 'center', value: 'title' },
        { text: '작성자', align: 'end', value: 'writer' },
        { text: '작성일자', align: 'end', value: 'createDate' }
      ],
      perPage: 5,
      pagination: {
          page: 1
      },
    }
  },
  computed: {
    ...mapState(boardModule, ['categories', 'boards']),
    pagedItems () {
      const startIdx = (this.pagination.page - 1) * this.perPage
      const endIdx = startIdx + this.perPage
      return this.boards.slice(startIdx, endIdx)
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
      const selectedRowCategory = item.boardCategory
      await this.requestBoardListByCategoryToSpring(selectedRowCategory)
    },
    readBoard(event, { item }) {
      const boardId = item.boardId
      this.$router.push({
        name: 'BoardReadPage',
        params: {boardId: boardId.toString()}
      })
    },
    registerBoard() {
      if (localStorage.getItem("userToken") == null) {
        alert("로그인 후 이용할 수 있습니다")
      } else {
        this.$router.push({name: 'BoardRegisterPage'})
      }
    }

  }
    
}
</script>
<style>
.register-button {
  background-color: rgb(75, 8, 8) !important;
  color: white !important;
  border-radius: 0;
  height: 50px !important;
  width: 200px !important;
  font-size: 13px;
  font-family: Arial, Helvetica, sans-serif;
}    
.category-table td{
  font-size: 21px !important;
  height: 92px !important;
}
.table-container{
  width: 100%;
  padding-bottom: 30px;
}
.category-table {
  margin-top: 24px;
}
.small-text {
  font-size: 12px;
}


</style>
