import Vue from "vue";
import VueRouter from "vue-router";

import LoginPage from "@/views/account/LoginPage.vue"
import SignupPage from "@/views/account/SignupPage.vue"

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
]

export default accountRoutes