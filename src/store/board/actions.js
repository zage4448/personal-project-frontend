import {
    REQUEST_BOARD_LIST_TO_SPRING,
    REQUEST_CATEGORY_LIST_TO_SPRING,
    CLEAR_BOARDS
  } from './mutation-types'

import axiosInst from '@/utility/axiosInst'

export default {
  requestCategoriesToSpring({ commit }) {
    return axiosInst.springAxiosInst.get("board/category-list")
      .then((res) => {
        commit(REQUEST_CATEGORY_LIST_TO_SPRING, res.data)
      })
  },
  requestBoardListByCategoryToSpring({ commit }, category) {
    return axiosInst.springAxiosInst.get(`/board/list/${category}`)
      .then((res) => {
        commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
      })
  },
  clearBoards({ commit }) {
    return commit(CLEAR_BOARDS)
  }
}