import {
    REQUEST_FLIGHT_PRODUCT_LIST_TO_FAST_API,
    SAVE_FLIGHT_SEARCH_ELEMENT,
    CLEAR_FLIGHT_PRODUCTS
} from './mutation-types'

import axiosInst from '@/utility/axiosInst'

export default {
  requestFlightProductsToFastAPI({ commit }, payload) {
    const { originLocationCode, destinationLocationCode, 
            departureDate, returnDate, nonStop, adults, 
            children, infants } = payload

    return axiosInst.fastApiAxiosInst.post("flights/flight-list", { originLocationCode, destinationLocationCode, 
                                                                   departureDate, returnDate, nonStop, adults, 
                                                                   children, infants })
      .then((res) => {
        commit(REQUEST_FLIGHT_PRODUCT_LIST_TO_FAST_API, res.data)
      })
  },
  saveFlightSearchElement({ commit }, payload) {
    return commit(SAVE_FLIGHT_SEARCH_ELEMENT, payload)
  },
  clearFlightProducts({ commit }) {
    return commit(CLEAR_FLIGHT_PRODUCTS)
  }
}