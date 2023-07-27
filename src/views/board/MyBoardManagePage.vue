<template>
  <div>
    <div class="manage_background" :style="{ backgroundImage: `url(${backgroundImage})`}"></div>
    <div class="manage_board_divider">
      <div class="manage_board_form">
        <BoardManageForm :board="board" 
                         :boardId="boardId"
                         :comments="comments"/>
      </div>
    </div>
  </div>
</template>
  
<script>
import BoardManageForm from "@/components/board/BoardManageForm.vue"
import { mapActions, mapState } from "vuex";

const boardModule = 'boardModule'
const commentModule = 'commentModule'
  
export default {
  data() {
    return {
      backgroundImage: '',
      nickname: localStorage.getItem("nickname")
    }
  },
  components: {
    BoardManageForm
},
props: {
  boardId: {
    type: String,
    required: true,
  }
},
computed: {
  ...mapState(boardModule, ['board']),
  ...mapState(commentModule, ['comments'])
},
methods: {
  ...mapActions(boardModule, ['requestBoardForModifyToSpring']),
  ...mapActions(commentModule, ['requestCommentListToSpring'])
},
async mounted() {
  await this.requestBoardForModifyToSpring(this.boardId)
  await this.requestCommentListToSpring(this.boardId)
  if(this.board.writer != this.nickname) {
    alert("해당 게시글의 작성자가 아닙니다")
    this.$router.push({ name: 'home' })
  }
  if (this.board.boardCategory == "Asia") {
    this.backgroundImage = require("@/assets/images/asia_banner.jpg")
  } else if (this.board.boardCategory == "Europe") {
    this.backgroundImage = require("@/assets/images/europe_banner.jpg")
  } else if (this.board.boardCategory == "North_America") {
    this.backgroundImage = require("@/assets/images/north_america_banner.jpg")
  } else if (this.board.boardCategory == "South_America") {
    this.backgroundImage = require("@/assets/images/south_america_banner.jpg")
  } else if (this.board.boardCategory == "Africa") {
    this.backgroundImage = require("@/assets/images/africa_banner.jpg")
  } else if (this.board.boardCategory == "Australia") {
    this.backgroundImage = require("@/assets/images/australia_banner.jpg")
  }
}
}

</script>

<style>
.manage_background {
  height: 500px;
  width: 100%; 
  background-position: center;
  background-size: cover;
  position: absolute;
}  
.manage_board_divider{
  margin-top: 450px; 
  position: absolute;
  width: 100%;
  padding-bottom: 80px;
}

</style>