<template>
  <div>
    <div>
      <BoardReadForm :board="board"/>
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
    ...mapState(boardModule, ['board']),
  },
  methods: {
    ...mapActions(boardModule, ['requestReadBoardToSpring'])
  },
  mounted() {
    this.requestReadBoardToSpring(this.boardId)
  }
}

</script>

<style>
    
</style>