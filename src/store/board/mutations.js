import {
  REQUEST_BOARD_LIST_TO_SPRING,
  REQUEST_CATEGORY_LIST_TO_SPRING,
  CLEAR_BOARDS,
  REQUEST_BOARD_TO_SPRING,
  REQUEST_SEARCH_BOARD_TO_SPRING,
  REQUEST_RELATED_BOARD_LIST_TO_SPRING,
  REQUEST_RECENT_BOARD_LIST_TO_SPRING
} from './mutation-types'

export default {
  [REQUEST_BOARD_LIST_TO_SPRING] (state, receivedData) {
    state.boards = receivedData.content
    state.totalElements = receivedData.totalElements
  },
  [REQUEST_CATEGORY_LIST_TO_SPRING] (state, receivedData) {
    state.categories = receivedData
  },
  [CLEAR_BOARDS] (state) {
    state.boards = []
  },
  [REQUEST_BOARD_TO_SPRING] (state, receivedData) {
    state.board = receivedData
  },
  [REQUEST_SEARCH_BOARD_TO_SPRING] (state, receivedData) {
    state.boards = receivedData
  },
  [REQUEST_RELATED_BOARD_LIST_TO_SPRING] (state, receivedData) {
    state.relatedBoardList = receivedData
  },
  [REQUEST_RECENT_BOARD_LIST_TO_SPRING] (state, receivedData) {
    state.boards = receivedData
  }
}