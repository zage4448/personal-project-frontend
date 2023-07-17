import {
    REQEUST_COMMENT_LIST_TO_SPRING,
} from './mutation-types'

export default {
  [REQEUST_COMMENT_LIST_TO_SPRING] (state, receivedData) {
    state.comments = receivedData
  }
}