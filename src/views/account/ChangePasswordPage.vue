<template>
    <div class="changePasswordPageDiv">
      <ChangePasswordForm/>      
    </div>
  </template>
  
  <script>
  import ChangePasswordForm from '@/components/account/ChangePasswordForm.vue';
  
  export default {
    components: {
        ChangePasswordForm
    },
    data() {
      return {
        userToken: localStorage.getItem("userToken")
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
   .changePasswordPageDiv{
    position: absolute;
    margin:0;
    background-image: url("@/assets/images/my_page_background.jpg");
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 1000px;
    margin-left: auto;
  }     
  </style>