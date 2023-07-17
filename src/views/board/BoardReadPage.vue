<template>
  <div>
    <div>
      <BoardReadForm :board="board" 
                     :relatedBoardList="relatedBoardList" 
                     :boardId="boardId"
                     :comments="comments"/>
    </div>
  </div>
</template>

<script>
import BoardReadForm from "@/components/board/BoardReadForm.vue"
import { mapActions, mapState } from "vuex";

const boardModule = 'boardModule'
const commentModule = 'commentModule'

export default {
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
  mounted() {
    this.requestReadBoardToSpring(this.boardId)
    this.requestRelatedBoardListToSpring(this.boardId)
    this.requestCommentListToSpring(this.boardId)
  }
}

</script>

<style>
    
</style>