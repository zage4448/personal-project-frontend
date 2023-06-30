<template>
  <div>
    <h2>통신 테스트</h2>
    <v-btn @click="getHelloFromFastApi">FastApi에서 인사받기</v-btn>
    {{ fromFastApi }}
    <v-btn @click="getHelloFromSpring">Spring에서 인사받기</v-btn>
    {{ fromSpring }}
  </div>
</template>

<script>
import axiosInst from '@/utility/axiosInst';



export default {
  data() {
    return {
      fromFastApi: '',
      fromSpring: ''
    }
  },
  methods: {
    getHelloFromFastApi() {
      axiosInst.fastApiAxiosInst.get("/")
        .then((res) => {
          this.fromFastApi = res.data
        })
    },
    getHelloFromSpring() {
      axiosInst.springAxiosInst.get("/test/test")
        .then((res) => {
          this.fromSpring = res.data
        })
    }
  }

}

</script>
