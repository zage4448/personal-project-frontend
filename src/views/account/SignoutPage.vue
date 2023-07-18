<template>
    <div class="SignoutPageDiv" :email="email">
      <SignoutForm/>      
    </div>
  </template>
  
  <script>
  import SignoutForm from '@/components/account/SignoutForm.vue';
  
  export default {
    components: {
        SignoutForm
    },
    data() {
      return {
        userToken: localStorage.getItem("userToken")
      }
    },
    props: {
      email: {
        type: String,
        required: true
      }
    },
    created() {
      if (this.userToken == null) {
        alert("로그인 후 이용할 수 있습니다")
        this.$router.push({name: 'home'})
      }
    } 
  }
  
  </script>
  
  <style>
   .SignoutPageDiv{
    position: absolute;
    margin:0;
    background-image: url("@/assets/images/sign_out_page_background.jpg");
    background-position: left;
    background-size: cover;
    width: 100%;
    height: 1000px;
    margin-left: auto;
  }     
  </style>