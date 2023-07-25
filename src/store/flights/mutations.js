import {
  REQUEST_FLIGHT_PRODUCT_LIST_TO_FAST_API,
  SAVE_FLIGHT_SEARCH_ELEMENT,
  CLEAR_FLIGHT_PRODUCTS
} from './mutation-types'

export default {
  [REQUEST_FLIGHT_PRODUCT_LIST_TO_FAST_API] (state, receivedData) {
    state.flightProducts = receivedData
  },
  [SAVE_FLIGHT_SEARCH_ELEMENT] (state, receivedData) {
    state.flightSearch = receivedData
  },
  [CLEAR_FLIGHT_PRODUCTS] (state) {
    state.flightProducts = []
  }
}