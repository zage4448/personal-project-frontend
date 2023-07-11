<template>
  <div>
    <div class="register_background">
      <div class="register_title">
        <div class="register_title_main_text">Share Your Knowledge</div>
        <div class="register_title_sub_text">
          <p>Show Us and</p>
          <p>Lead Us</p>
        </div>
      </div>    
    </div>
    <div class="register_form_divider">
      <div class="register_form">
        <BoardRegisterForm @submit="register"/> 
      </div>
    </div>
  </div>
</template>

<script>
import BoardRegisterForm from "@/components/board/BoardRegisterForm.vue"
import { mapActions } from "vuex";

const boardModule = 'boardModule'

export default {
  components: {
    BoardRegisterForm
  },
  methods: {
    ...mapActions(boardModule, ['requestRegisterBoardToSpring']),

    async register(payload) {
      const boardId = await this.requestRegisterBoardToSpring(payload)
      await this.$router.push({
        name: 'BoardReadPage',
        params: { boardId: boardId.toString() }
      })
    }
  }
}

</script>

<style>
.register_background {
  position: absolute;
  margin:0;
  background-image: url("@/assets/images/register_background.jpg");
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 1000px;
}
.register_title{
  background-color: #f5f5f5;
  height: 500px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
}
.register_title_main_text{
  text-align: center;
  padding-top: 5rem;
  font-size: 80px;
  font-style: bold;
}
.register_title_sub_text {
  text-align: center;
  padding-top: 8rem;
  font-size: 36px;
  font-style: bold;
  line-height: 0.7;
}
.register_form_divider{
  margin-top: 960px; 
  position: absolute;
  width: 100%;
  padding-bottom: 50px;
}
.register_form {
  padding-left: 60px;
  padding-right: 60px;
}
    
</style>