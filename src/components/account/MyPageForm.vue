<template>
  <div class="my-page">
    <v-row justify="center">
      <v-col cols="auto">
        <v-card width="560" height="450" class="my-page-card">
          <v-card-text class="text-center px-12 py-16" style="margin-top: 75px;">
            <div class="text-h4" style="margin-bottom: 55px; margin-top: -25px;">My Page
              <v-divider style="margin-top: 8px;"></v-divider>
            </div>
            <div class="my-page-item">
              <span>이메일: </span>
              <div class="my-page-item-wrap">
                <span class="my-page-text">{{ accountInfo.email }}</span>
              </div>
            </div>
            <div class="my-page-item">
              <span>닉네임: </span>
              <div class="my-page-email-wrap">
                <span class="my-page-text">{{ accountInfo.nickname }}</span>
              </div> 
            </div>
            <div class="my-page-item">
              <span>게시글 수: </span>
              <div class="my-page-item-wrap">
                <span class="my-page-text">{{ accountInfo.postCount }}</span>
              </div>
            </div>
            <v-divider style="margin-top: 50px;"></v-divider>
            <div align="end" style="margin-top: 80px; font-size: 24px;">
              <v-btn class="modify-btn">닉네임 변경</v-btn>
              <v-btn class="modify-btn">비밀번호 변경</v-btn>
              <v-btn class="modify-btn">회원 탈퇴</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  props: {
    accountInfo: {
      type: Object,
      required: true
    },
  },
}

</script>

<style>
.my-page{
  font-family: 'Caudex-Regular'; 
  margin-top: 220px;
}
.my-page-card{
  background-color: rgba(255, 255, 255, 0.8) !important;
}
.my-page-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}

.my-page-text {
  font-size: medium;
  font-weight: bold;
}

.my-page-item-wrap {
  display: flex;
  align-items: center;
}

.modify-btn {
  margin-left: 10px;
}
    
</style>