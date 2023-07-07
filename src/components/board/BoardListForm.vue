<template lang="">
  <v-container class="table-container">
    <div style="text-align: right;">
      <v-btn class="register-button">Create New Post</v-btn>
    </div>
    <div v-if="!boards">
      <v-data-table
        class="category-table"
        :headers="headers"
        :items="categories"
        hide-default-header
        hide-default-footer
        item-key="continent"
        item-value="continent"
        @click:row="readCategory"
        >
        <template v-slot:item.continent="{ item }">
          <div>
            <div>{{ item.continent }}</div>
            <div class="small-text">{{ getDescription(item.continent) }}</div>
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
        item-key="boardId">
      </v-data-table>
      <v-pagination
        v-model="pagination.page"
        :length="Math.ceil(boards.length / perPage)"
        @input="updateItems"/>
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
          value: 'continent',
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
          title: 'No',
          align: 'start',
          sortable: true,
          key: 'boardId'
        },
        { title: '제목', align: 'end', key: 'title' },
        { title: '작성자', align: 'end', key: 'writer' },
        { title: '작성일자', align: 'end', key: 'createDate' }
      ],
      perPage: 5,
      pagination: {
          page: 1
      },
    }
  },
  computed: {
    // ...mapState(boardModule, ['boards', 'categories']),
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
    getDescription(continent) {
      if (continent === 'Europe') {
        return 'Tips on Traveling Europian Countries'
      }
      return 'Tips on Traveling ' + continent + 'n Countries'
    },
    async readCategory(event, { item }) {
      const selectedRowCategory = item.continent
      localStorage.removeItem('boardListNav')
      await this.requestBoardListByCategoryToSpring(selectedRowCategory)
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
