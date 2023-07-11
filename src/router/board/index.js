import Vue from "vue";
import VueRouter from "vue-router";

import BoardReadPage from "@/views/board/BoardReadPage.vue"
import BoardRegisterPage from "@/views/board/BoardRegisterPage.vue"

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
    },
    {
      path: "/board-register-page",
      name: "BoardRegisterPage",
      component: BoardRegisterPage,
    },
]

export default boardRoutes