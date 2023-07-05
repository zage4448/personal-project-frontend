import Vue from "vue";
import VueRouter from "vue-router";

import LoginPage from "@/views/account/LoginPage.vue"

Vue.use(VueRouter);

const accountRoutes = [
    {
      path: "/login-page",
      name: "LoginPage",
      component: LoginPage,
    },
]

export default accountRoutes