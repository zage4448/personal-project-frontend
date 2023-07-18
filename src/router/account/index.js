import Vue from "vue";
import VueRouter from "vue-router";

import LoginPage from "@/views/account/LoginPage.vue"
import SignupPage from "@/views/account/SignupPage.vue"
import MyPage from "@/views/account/MyPage.vue"

Vue.use(VueRouter);

const accountRoutes = [
    {
      path: "/login-page",
      name: "LoginPage",
      component: LoginPage,
    },
    {
      path: "/signup-page",
      name: "SignupPage",
      component: SignupPage,
    },
    {
      path: "/my-page",
      name: "MyPage",
      component: MyPage,
    },
]

export default accountRoutes