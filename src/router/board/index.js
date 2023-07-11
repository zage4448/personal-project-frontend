import Vue from "vue";
import VueRouter from "vue-router";

import BoardReadPage from "@/views/board/BoardReadPage.vue"

Vue.use(VueRouter);

const boardRoutes = [
    {
      path: "/board-read-page/:boardId",
      name: "BoardReadPage",
      components: {
        default: BoardReadPage
      },
      props: {
        default: true
      }
    }
]

export default boardRoutes