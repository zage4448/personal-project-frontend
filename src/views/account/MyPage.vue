<template>
  <div class="myPageDiv">
    <MyPageForm :accountInfo="accountInfo"/>      
  </div>
</template>

<script>
import MyPageForm from '@/components/account/MyPageForm.vue';
import { mapActions } from "vuex";

const accountModule = 'accountModule'

export default {
  components: {
    MyPageForm
  },
  data() {
    return {
      userToken: localStorage.getItem("userToken"),
      accountInfo: {}
    }
  },
  methods: {
    ...mapActions(accountModule, ['requestAccountInfoToSpring'])
  },
  async created() {
    if (this.userToken == null) {
      alert("로그인 후 이용할 수 있습니다")
      this.$router.push({name: 'home'})
    }
    else 
      this.accountInfo = await this.requestAccountInfoToSpring(this.userToken)
  } 
}

</script>

<style>
 .myPageDiv{
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