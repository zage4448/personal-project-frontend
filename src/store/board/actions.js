import {
    REQUEST_BOARD_LIST_TO_SPRING,
    REQUEST_CATEGORY_LIST_TO_SPRING,
    CLEAR_BOARDS,
    REQUEST_BOARD_TO_SPRING,
    REQUEST_SEARCH_BOARD_TO_SPRING,
    REQUEST_RELATED_BOARD_LIST_TO_SPRING,
    REQUEST_RECENT_BOARD_LIST_TO_SPRING,
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
  },
  requestReadBoardToSpring({ commit }, boardId ) {
    return axiosInst.springAxiosInst.get(`board/${boardId}`)
      .then((res) => {
        commit(REQUEST_BOARD_TO_SPRING, res.data)
      })
  },
  requestRegisterBoardToSpring({}, payload) {
    const { userToken, title, content, category, thumbNailName, imageNameList } = payload
    return axiosInst.springAxiosInst.post('board/register', { userToken, title, content, category, thumbNailName, imageNameList })
    .then((res) => {
      alert('게시글 등록 성공')
      return res.data
    })
  },
  requestSearchBoardsToSpring({ commit }, searchKeyword) {
    return axiosInst.springAxiosInst.get(`board/list/search/${searchKeyword}`)
      .then((res) => {
        commit(REQUEST_SEARCH_BOARD_TO_SPRING, res.data)
      })
  },
  requestRelatedBoardListToSpring({ commit }, boardId) {
    return axiosInst.springAxiosInst.get(`board/list/related-board/${boardId}`)
      .then((res) => {
        commit(REQUEST_RELATED_BOARD_LIST_TO_SPRING, res.data)
      })
  },
  requestRecentBoardsToSpring({ commit }) {
    return axiosInst.springAxiosInst.get('board/list/recent')
      .then((res) => {
        commit(REQUEST_RECENT_BOARD_LIST_TO_SPRING, res.data)
      })
  },
  requestIsBoardLikedToSpring({}, payload) {
    const { boardId, userToken } = payload
    return axiosInst.springAxiosInst.get('board/checkBoardLiked', {
      params: {
        boardId: boardId,
        userToken: userToken
      }
    })
      .then((res) => {
        return res.data
      })
  },
  requestLikeBoardToSpring({}, payload) {
    const { boardId, userToken } = payload
    return axiosInst.springAxiosInst.post('board/likeBoard', { boardId, userToken })
      .then((res) => {})
  },
  requestUnlikeBoardToSpring({}, payload) {
    const { boardId, userToken } = payload
    return axiosInst.springAxiosInst.post('board/unLikeBoard', { boardId, userToken })
      .then((res) => {})
  },
  requestMyPostListToSpring({ commit }, userToken) {
    return axiosInst.springAxiosInst.get(`board/${userToken}/my-boards`)
      .then((res) => {
        commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
      })
  },
  requestModifyBoardToSpring({}, payload) {
    const { boardId, title, content, newThumbNailName, newImageNameList } = payload
    return axiosInst.springAxiosInst.put(`board/${boardId}/modify-board`, { title, content, newThumbNailName, newImageNameList })
    .then((res) => {})
  },
  requestDeleteBoardToSpring({}, boardId) {
    return axiosInst.springAxiosInst.delete(`board/${boardId}/delete`)
    .then((res) => {})
  },
  requestMyLikedPostListToSpring({ commit }, userToken) {
    return axiosInst.springAxiosInst.get(`board/${userToken}/my-liked-boards`)
      .then((res) => {
        commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
      })
  },
  requestBoardForModifyToSpring({ commit }, boardId ) {
    return axiosInst.springAxiosInst.get(`board/${boardId}/for-modify`)
      .then((res) => {
        commit(REQUEST_BOARD_TO_SPRING, res.data)
      })
  },
}