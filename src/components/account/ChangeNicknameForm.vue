<template>
    <div class="my-page">
      <v-row justify="center">
        <v-col cols="auto">
          <v-card width="560" height="450" class="nick-change-card" v-if="isPasswordPass">
            <v-card-text class="text-center px-12 py-16" style="margin-top: 75px;">
              <div class="text-h4" style="margin-bottom: 55px; margin-top: -25px;">Nickname 변경
                <v-divider style="margin-top: 8px;"></v-divider>
              </div>
              <div class="nick-change-item">
                <span>현재 닉네임: </span>
                <div style="font-weight: bold;">
                    <span>{{ nickname }}</span>
                </div>
              </div>
              <div class="nick-change-item">
                <span>새로운 닉네임: </span>
                <v-text-field
                  v-model="newNickname"
                  required
                  type="text"
                  style="margin-left: 8px;">
                </v-text-field>
                <v-btn text large outlined style="font-size: 13px"
                  class="mt-3 ml-5" color="black"
                  @click="checkDuplicateNickName"
                  :disabled="false">
                  닉네임 <br/> 중복 확인
                </v-btn>
              </div>
              <v-divider style="margin-top: 50px;"></v-divider>
              <div style="margin-top: 30px;">
                <v-btn class="modify-btn" @click="changeNickname" :disabled="!isNicknameValid()">닉네임 변경</v-btn>
              </div>
            </v-card-text>
          </v-card>
          <v-card width="560" height="450" class="nick-change-card" v-if="!isPasswordPass">
            <v-card-text class="text-center px-12 py-14" style="margin-top: 75px;">
              <div class="nick-check-pass">
                <div style="font-size: 50px;">Nickname 변경</div>
                <div style="font-size: 24px; margin-top: 10px;">비밀번호를 입력 하세요</div>
                <v-divider style="margin-top: 8px;"></v-divider>
              </div>
              <v-text-field
                v-model="password"
                label="비밀번호 확인: "
                :disabled="false"
                type="password"
                required>
              </v-text-field>
              <div style="margin-top: 30px">
                <v-btn @click="checkPassword">확인</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script>
import { mapActions } from 'vuex';

const accountModule = 'accountModule'
  
  export default {
    props: {
      nickname: {
        type: String,
        required: true
      },
    },
    data() {
      return {
        userToken: localStorage.getItem('userToken'),
        isPasswordPass: false,
        nicknamePass: false,
        password: '',
        newNickname: '',
      }
    },
    methods: {
      ...mapActions(accountModule, ['requestCheckPasswordToSpring',
                                    'requestSpringToCheckNicknameDuplication',
                                    'requestChangeNicknameToSpring']),

      async checkPassword() {
        const { userToken, password } = this
        this.isPasswordPass = await this.requestCheckPasswordToSpring({ userToken, password })
      },
      async checkDuplicateNickName() {
        if (this.nickname != this.newNickname) {
          this.nicknamePass = await this.requestSpringToCheckNicknameDuplication(this.newNickname)
        } else alert("입력하신 닉네임이 기존 닉네임과 동일합니다")
      },
      async changeNickname() {
        if (confirm("닉네임을 " + this.newNickname +"(으)로 변경하시겠습니까?")) {
          const { userToken, newNickname } = this
          await this.requestChangeNicknameToSpring({ userToken, newNickname })
          alert("변경이 완료 됐습니다")
          await this.$router.push({name: 'MyPage'})
        }
      },
      isNicknameValid() {
        return this.nicknamePass
      }
    }
  }
  
  </script>
  
  <style>
  .my-page{
    font-family: 'Caudex-Regular'; 
    margin-top: 220px;
  }
  .nick-change-card{
    background-color: rgba(255, 255, 255, 0.8) !important;
  }
  .nick-change-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    font-size: 18px;
  }

  .nick-check-pass{
    margin-bottom: 55px; 
    margin-top: 25px; 
    line-height: normal;
  }
      
  </style>