import Vue from "vue";
import VueRouter from "vue-router";

import BoardReadPage from "@/views/board/BoardReadPage.vue"
import BoardRegisterPage from "@/views/board/BoardRegisterPage.vue"
import MyPostsPage from "@/views/board/MyPostsPage.vue"
import MyBoardManagePage from "@/views/board/MyBoardManagePage.vue"
import MyLikedPostsPage from "@/views/board/MyLikedPostsPage.vue"

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
    {
      path: "/my-posts-page",
      name: "MyPostsPage",
      component: MyPostsPage,
    },
    {
      path: "/board-manage-page/:boardId",
      name: "MyBoardManagePage",
      components: {
        default: MyBoardManagePage
      },
      props: {
        default: true
      }
    },
    {
      path: "/my-liked-posts-page",
      name: "MyLikedPostsPage",
      component: MyLikedPostsPage,
    },
]

export default boardRoutes