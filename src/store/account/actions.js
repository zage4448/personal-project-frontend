import axiosInst from '@/utility/axiosInst'

export default {
  requestLoginToSpring({}, payload) {
    const { email, password } = payload;
    return axiosInst.springAxiosInst
      .post("/account/login", { email, password })
      .then((res) => {
        if (res.data.userToken != null) {
          alert("로그인 성공!");
          let userToken = res.data.userToken;
          localStorage.setItem("userToken", userToken);
          return true
        } else {
          alert("로그인 실패!");
          return false
        }
    });
  },
  requestCreateAccountToSpring({}, payload) {
    const { email, nickname, password } = payload;
    return axiosInst.springAxiosInst
      .post("/account/create-account", { email, nickname, password })
      .then((res) => {
        if (res.data) {
          alert("가입 성공!");
        } else {
          alert("동일한 계정이 이미 존재합니다");
        }
      });
  },
  requestSpringToCheckEmailDuplication ({}, payload) {
    const { email } = payload

    return axiosInst.springAxiosInst.get(`/account/check-email-duplicate/${email}`)
      .then((res) => {
          if (res.data) {
              alert('사용 가능한 이메일입니다!')
                return true
          } else {
              alert('중복된 이메일입니다!')
              return false
          }
      })
      .catch((res) => {
          alert("문제 발생!")
      })
  },
  requestAuthentifyEmailToFastApi ({}, email) {
    return axiosInst.fastApiAxiosInst.post('/send-email-auth-code', email)
      .then((res) => {
        return res.data
      })
  },
  requestSpringToCheckNicknameDuplication ({}, payload) {
    const { nickname } = payload
    return axiosInst.springAxiosInst.get(`/account/check-nickname-duplicate/${nickname}`)
      .then((res) => {
        if (res.data) {
            alert("사용 가능한 닉네임입니다!")
            return res.data
        } else {
            alert("중복된 닉네임입니다!")
            return res.data
        }
      })
      .catch((res) => {
        alert("문제 발생!")
      })
  },
  requestLogoutToSpring ({}, userToken) {
    return axiosInst.springAxiosInst.post('/account/logout', {userToken})
      .then((res) => {
        alert("로그아웃 하셨습니다")
      })
      .catch((res) => {
        alert('로그아웃 실패')
      })    
  },
  requestAccountInfoToSpring({}, userToken) {
    return axiosInst.springAxiosInst.get(`/account/${userToken}/account-info`)
      .then((res) => {
        return res.data
      })
  },
  requestCheckPasswordToSpring({}, payload) {
    const { userToken, password } = payload
    return axiosInst.springAxiosInst.get(`account/${userToken}/check-password`, { params: {password: password} })
      .then((res) => {
        console.log(res.data)
        return res.data
      })
  },
  requestChangeNicknameToSpring({}, payload) {
    const { userToken, newNickname } = payload
    return axiosInst.springAxiosInst.put(`account/${userToken}/change-nickname`, {newNickname})
      .then((res) => {})
  },
  requestChangePasswordToSpring({}, payload) {
    const { userToken, password, newPassword } = payload
    return axiosInst.springAxiosInst.put(`account/${userToken}/change-password`, { password, newPassword })
      .then((res) => {
        if (res.data) {
          alert("변경이 완료 됐습니다")
        } else {
          alert("비밀번호 변경에 실패했습니다")
        }
      })
  },
  requestSignoutToSpring({}, userToken) {
    return axiosInst.springAxiosInst.delete(`account/${userToken}/delete-account`)
      .then((res) => {
        localStorage.removeItem("userToken")
      })
  }
}