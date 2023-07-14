<template>
  <div>
    <div>
      <BoardReadForm :board="board" :relatedBoardList="relatedBoardList"/>
    </div>
  </div>
</template>

<script>
import BoardReadForm from "@/components/board/BoardReadForm.vue"
import { mapActions, mapState } from "vuex";

const boardModule = 'boardModule'

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
  },
  methods: {
    ...mapActions(boardModule, ['requestReadBoardToSpring', 'requestRelatedBoardListToSpring'])
  },
  mounted() {
    this.requestReadBoardToSpring(this.boardId)
    this.requestRelatedBoardListToSpring(this.boardId)
  }
}

</script>

<style>
    
</style>