<template>
  <div>
    <div class="board_banner" :style="{ backgroundImage: `url(${backgroundImage})`}"></div>
    <div class="board_read_divider">
      <div>
        <BoardReadForm :board="board" 
                      :relatedBoardList="relatedBoardList" 
                      :boardId="boardId"
                      :comments="comments"/>
      </div>
    </div>
  </div>
</template>

<script>
import BoardReadForm from "@/components/board/BoardReadForm.vue"
import { mapActions, mapState } from "vuex";

const boardModule = 'boardModule'
const commentModule = 'commentModule'

export default {
  data() {
    return {
      backgroundImage: ''
    }
  },
  components: {
    BoardReadForm
  },
  props: {
    boardId: {
      type: String,
      required: true,
    }
  },
  computed: {
    ...mapState(boardModule, ['board', 'relatedBoardList']),
    ...mapState(commentModule, ['comments'])
  },
  methods: {
    ...mapActions(boardModule, ['requestReadBoardToSpring', 'requestRelatedBoardListToSpring']),
    ...mapActions(commentModule, ['requestCommentListToSpring'])
  },
  async mounted() {
    await this.requestReadBoardToSpring(this.boardId)
    await this.requestRelatedBoardListToSpring(this.boardId)
    await this.requestCommentListToSpring(this.boardId)

    if (this.board.boardCategory == "Asia") {
      this.backgroundImage = require("@/assets/images/asia_banner.jpg")
    }
    else if (this.board.boardCategory == "Europe") {
      this.backgroundImage = require("@/assets/images/europe_banner.jpg")
    }
    else if (this.board.boardCategory == "North_America") {
      this.backgroundImage = require("@/assets/images/north_america_banner.jpg")
    }
    else if (this.board.boardCategory == "South_America") {
      this.backgroundImage = require("@/assets/images/south_america_banner.jpg")
    }
    else if (this.board.boardCategory == "Africa") {
      this.backgroundImage = require("@/assets/images/africa_banner.jpg")
    }
    else if (this.board.boardCategory == "Australia") {
      this.backgroundImage = require("@/assets/images/australia_banner.jpg")
    }
  }
}

</script>

<style>
.board_banner {
  height: 500px;
  width: 100%; 
  background-position: center;
  background-size: cover;
  position: absolute;
}
.board_read_divider{
  margin-top: 450px; 
  position: absolute;
  width: 100%;
  padding-bottom: 80px;
}       
</style>