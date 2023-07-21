import {
    REQUEST_FLIGHT_PRODUCT_LIST_TO_FAST_API,
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
        console.log("답: " + res.data[0].price)
        commit(REQUEST_FLIGHT_PRODUCT_LIST_TO_FAST_API, res.data)
      })
  }
}