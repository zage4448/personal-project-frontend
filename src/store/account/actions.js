import axiosInst from '@/utility/axiosInst'

export default {
  requestLoginToSpring({}, payload) {
    const { email, password } = payload;
    return axiosInst.springAxiosInst
      .post("/account/login", { email, password })
      .then((res) => {
        if (res.data != null) {
          alert("로그인 성공!");
          let userToken = res.data;
          localStorage.setItem("userToken", userToken);
        } else {
          alert("로그인 실패!");
        }
    });
  },
}