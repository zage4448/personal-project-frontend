import {
  REQUEST_FLIGHT_PRODUCT_LIST_TO_FAST_API,
} from './mutation-types'

export default {
  [REQUEST_FLIGHT_PRODUCT_LIST_TO_FAST_API] (state, receivedData) {
    state.flightProducts = receivedData
  }
}