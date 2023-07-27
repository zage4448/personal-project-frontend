<template>
  <v-container class="my-posts-container">
    <div class="my-posts-black-bar"></div>
    <div>
      <v-data-table
        class="list-table"
        :headers="boardHeaders"
        hide-default-footer
        :items="boards"
        item-key="boardId"
        item-value="boardId"
        @click:row="toManageBoard">
        <template v-slot:item.title="{ item }">
          <div class="my_board_title_template">
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

      <v-pagination v-model="currentPage" :length="totalPages" @input="getPaginatedBoards" style="margin-top: 40px;"></v-pagination>
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
        { text: 'likes', align: 'left', value: 'likeCount' },
        { text: 'views', align: 'left', value: 'viewCount' },
        { text: '작성일자', align: 'end', value: 'createDate' }
      ],
      pageSize: 8,
      currentPage: 1,
    }
  },
  methods: {
    ...mapActions(boardModule, ['requestMyPostListToSpring']),
    toManageBoard(event, { item }) {
      const boardId = item.boardId
      this.$router.push({
        name: 'MyBoardManagePage',
        params: {boardId: boardId.toString()}
      })
    },
    async getPaginatedBoards() {
      const { userToken, pageSize } = this
      const currentPage = this.currentPage - 1
      await this.requestMyPostListToSpring({ userToken, pageSize, currentPage })
    }
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
  }
}

</script>

<style>
.my-posts-black-bar{
  background-color: black;
  height: 75px;
  width: 100%;
  margin-bottom: -25px;
}
.my_board_title_template {
  padding-left: 15px; 
  text-align: left;
  margin-right: 200px;
}
</style>