import {
  REQEUST_COMMENT_LIST_TO_SPRING,
} from './mutation-types'

import axiosInst from '@/utility/axiosInst'

export default {
  requestCommentListToSpring({ commit }, boardId) {
    return axiosInst.springAxiosInst.get(`${boardId}/comments/list`)
    .then((res) => {
      commit(REQEUST_COMMENT_LIST_TO_SPRING, res.data)
    })
  },
  requestAddCommentToSpring({}, payload) {
    const { boardId, userToken, comment } = payload
    return axiosInst.springAxiosInst.post(`${boardId}/comments/add-comment`, {userToken, comment})
    .then((res) => {})
  }
}