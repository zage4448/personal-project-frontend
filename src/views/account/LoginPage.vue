<template>
  <div class="loginDiv">
    <LoginForm @submit="login"/>
  </div>
</template>

<script>
import LoginForm from '@/components/account/LoginForm.vue';
import { mapActions } from 'vuex';

const accountModule = "accountModule";

export default {
  data() {
    return {
      userToken: localStorage.getItem("userToken")  
    }
  },
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(accountModule, ["requestLoginToSpring"]),

    async login(payload) {
      await this.requestLoginToSpring(payload);
      await this.$router.push({name: 'home'})
      location.reload();
    }
  },
  mounted() {
    if (this.userToken !== null) {
      alert("이미 로그인 돼 있습니다")
      this.$router.push({name: "home"})
    }
  }
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