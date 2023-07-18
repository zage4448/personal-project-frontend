<template>
  <div>
    <div class="my-posts-background">
      <div class="my-posts-title-card">
        <div class="my-posts-title-main-text">My Posts</div>
        <div class="my-posts-title-sub-text">
          <p>Tips From Myself</p>
          <p>For Others to Learn</p>
        </div>
      </div>
    </div>
    <div class="my-posts-list-divider">
      <div class="my-posts-list-form">
        <MyPostsForm/>
      </div>
    </div> 
  </div>
</template>

<script>
import MyPostsForm from "@/components/board/MyPostsForm.vue"

export default {
  data() {
    return {
      userToken: localStorage.getItem("userToken")
    }
  },
  components: {
    MyPostsForm
  },
  created() {
    if (this.userToken == null) {
      alert("로그인 후 이용할 수 있습니다")
      this.$router.push({name: 'home'})
    }
  },  
}

</script>

<style>
.my-posts-background{
  position: absolute;
  margin:0;
  background-image: url("@/assets/images/my_posts_page_background.jpg");
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 1000px;
}
.my-posts-title-card{
  background-color: #f5f5f5;
  height: 500px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
}  
.my-posts-title-main-text{
  text-align: center;
  padding-top: 5rem;
  font-size: 80px;
  font-style: bold;
}
.my-posts-title-sub-text{
  text-align: center;
  padding-top: 8rem;
  font-size: 36px;
  font-style: bold;
  line-height: 0.7;
}
.my-posts-list-divider {
  margin-top: 960px; 
  position: absolute;
  width: 100%;
  padding-bottom: 50px;
}
.my-posts-list-form {
  padding-left: 60px;
  padding-right: 60px;
}
</style>