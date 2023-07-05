<template>
  <div style="font-family: 'Caudex-Regular'; margin-top: 220px;">
    <v-row justify="center">
      <v-col cols="auto">
        <v-card width="460" style="background-color: rgba(255, 255, 255, 0.8);">
          <v-card-text class="text-center px-12 py-16" style="margin-top: 75px;">
            <v-form @submit.prevent="login" ref="form">
              <div class="text-h4" style="margin-bottom: 55px; margin-top: -25px;">Login
                <v-divider style="margin-top: 8px;"></v-divider>
              </div>
              <v-text-field
                v-model="email"
                label="이메일: "
                :disabled="false"
                required>
              </v-text-field>
              <v-text-field
                v-model="password"
                label="비밀번호: "
                :disabled="false"
                type="password"
                required>
              </v-text-field>
                <v-btn type="submit" block x-large rounded
                        color="gray lighten-1" class="mt-6"
                        :disabled="false">
                    로그인
                </v-btn>
              <div style="margin-top: 30px; font-size: 24px; font-style: bold;">
                Not a Member?
                <v-btn rounded style="margin-left: 10px;" @click="toSignupPage">회원가입</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    login() {
      const { email, password } = this;
      this.$emit("submit", {email, password})
    },
    toSignupPage() {
      this.$router.push({name:'SignupPage'})
    }
  }
}

</script>

<style lang="">
    
</style>