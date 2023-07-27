<template>
    <div class="my-page">
      <v-row justify="center">
        <v-col cols="auto">
          <v-card width="560" height="450" class="signout-card" v-if="isPasswordPass">
            <v-card-text class="text-center px-12 py-16" style="margin-top: 75px;">
              <div class="text-h4" style="margin-bottom: 55px; margin-top: -25px;">회원 탈퇴
                <v-divider style="margin-top: 8px;"></v-divider>
              </div>
              <v-btn block x-large rounded color="grey lighten-1" class="mt-6"
                  :disabled="false" @click="getEmailForAuthentication">
                이메일 인증 요청하기
              </v-btn>
              <div class="d-flex" style="margin-top: 25px">
                <v-text-field
                  v-model="authenticationNumber"
                  label="인증번호"
                  :disabled="false"
                  required>
                </v-text-field>
                <v-btn text large outlined style="font-size: 13px"
                  class="mt-3 ml-5" color="brown"
                  @click="checkAuthentication"
                  :disabled="false">
                  인증 번호 <br/> 확인
                </v-btn>
              </div>
              <v-divider style="margin-top: 50px;"></v-divider>
              <div style="margin-top: 30px;">
                <v-btn block x-large rounded color="grey lighten-1" class="mt-6"
                  @click="signout" :disabled="!isAuthentified()">
                  회원 탈퇴
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
          <v-card width="560" height="450" class="nick-change-card" v-if="!isPasswordPass">
            <v-card-text class="text-center px-12 py-14" style="margin-top: 75px;">
              <div class="nick-check-pass">
                <div style="font-size: 50px;">회원 탈퇴</div>
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
    data() {
      return {
        userToken: localStorage.getItem('userToken'),
        isPasswordPass: false,
        password: '',
        authenticationNumber: '',
        authenticationCode: '305186400354083',
        authentifyPass: true,
      }
    },
    props: {
      email: {
        type: String,
        required: true
      }
    },
    methods: {
      ...mapActions(accountModule, ['requestCheckPasswordToSpring',
                                    'requestAuthentifyEmailToFastApi',
                                    'requestSignoutToSpring',
                                    'requestEmailToSpring']),

      async checkPassword() {
        const { userToken, password } = this
        this.isPasswordPass = await this.requestCheckPasswordToSpring({ userToken, password })
      },
      async getEmailForAuthentication() {
        const email = await this.requestEmailToSpring(this.userToken)
        await this.getAuthenticationNumber(email)
      },
      async getAuthenticationNumber(email) {
        this.authenticationCode = await this.requestAuthentifyEmailToFastApi({email})
        alert("인증번호가 전송 됐습니다")
      },
      checkAuthentication () {
        if (this.authenticationNumber == this.authenticationCode) {
          this.authentifyPass = true,
          alert('인증 완료')
        } else {
          alert('인증 번호를 확인하세요')
        }
      },
      isAuthentified() {
        return this.authentifyPass
      },
      async signout() {
        if (confirm("회원의 정보는 탈퇴 시 모두 없어집니다 \n 탈퇴 하시겠습니까?")){
          if (confirm("작성한 게시글 댓글 정보가 모두 없어집니다 \n 정말로 탈퇴 하시겠습니까?")) {
            await this.requestSignoutToSpring(this.userToken)
            alert("탈퇴가 완료 됐습니다")
            await this.$router.push({name: 'home'})
            location.reload()
          }
        }
      }
    }
  }
  
  </script>
  
  <style>
  .my-page{
    font-family: 'Caudex-Regular'; 
    margin-top: 220px;
  }
  .signout-card{
    background-color: rgba(255, 255, 255, 0.8) !important;
  }
      
  </style>