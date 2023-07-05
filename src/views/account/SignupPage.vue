<template>
    <div class="loginDiv">
      <SignupForm @submit="createAccount"/>
    </div>
  </template>
  
  <script>
  import SignupForm from '@/components/account/SignupForm.vue';
  import { mapActions } from 'vuex';
  
  const accountModule = "accountModule";
  
  export default {
    components: {
      SignupForm
    },
    methods: {
      ...mapActions(accountModule, ["requestCreateAccountToSpring"]),
  
      async createAccount(payload) {
        await this.requestCreateAccountToSpring(payload);
        await this.$router.push({name: 'LoginPage'})
      }
    },
  }
  
  </script>
  
  <style>
   .loginDiv{
    position: absolute;
    margin:0;
    background-image: url("@/assets/images/city_square_for_login_page.jpg");
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 1000px;
    margin-left: auto;
  }   
  </style>