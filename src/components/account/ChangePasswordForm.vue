<template>
    <div class="my-page">
      <v-row justify="center">
        <v-col cols="auto">
          <v-card width="560" height="540" class="pass-change-card">
            <v-card-text class="text-center px-12 py-16" style="margin-top: 75px;">
              <div class="text-h4" style="margin-bottom: 55px; margin-top: -25px;">Password 변경
                <v-divider style="margin-top: 8px;"></v-divider>
              </div>
              <v-text-field
                v-model="password"
                label="기존 비밀번호: "
                :disabled="false"
                type="password"
                required>
              </v-text-field>
              <v-text-field
                  v-model="newPassword"
                  label="새 비밀번호: "
                  :disabled="false"
                  type="password"
                  :rules="password_rule">
                </v-text-field>
                <v-text-field
                  v-model="confirmPassword"
                  label="비밀번호 확인: "
                  :disabled="false"
                  type="password"
                  :rules="password_confirm_rule">
                </v-text-field>
              <v-divider style="margin-top: 50px;"></v-divider>
              <div style="margin-top: 30px;">
                <v-btn class="modify-btn" @click="changePassword" :disabled="!isPasswordValid()">비밀번호 변경</v-btn>
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
        password: '',
        newPassword: '',
        confirmPassword: '',
        password_rule: [
        v => !!v || "새로운 비밀번호를 입력하세요.",
        v => {
          const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
          return pattern.test(v) || "최소 8자, 숫자, 특수문자 최소 하나씩 필요합니다!"
          
        }
        ],
        password_confirm_rule: [
          v => !!v || "비밀번호를 확인하세요",
          v => v === this.newPassword || "비밀번호가 일치하지 않습니다"
        ],
      }
    },
    methods: {
      ...mapActions(accountModule, ['requestChangePasswordToSpring']),

      async changePassword() {
        if (confirm("비밀번호를 변경하시겠습니까?")) {
          if (this.password == this.newPassword) {
            alert("기존 비밀번호와 새로운 비밀번호가 일치해 변경되지 않습니다")
          } else {
            const { userToken, password, newPassword } = this
            await this.requestChangePasswordToSpring({ userToken, password, newPassword })
            await this.$router.push({name: 'MyPage'})
          }
        }
      },
      isPasswordValid() {
        return this.password_rule[1](this.newPassword) === true && this.password_confirm_rule[1](this.confirmPassword) === true
      }
    }
  }
  
  </script>
  
  <style>
  .my-page{
    font-family: 'Caudex-Regular'; 
    margin-top: 220px;
  }
  .pass-change-card{
    background-color: rgba(255, 255, 255, 0.8) !important;
  }
      
  </style>