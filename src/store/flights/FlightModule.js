import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/flights/actions"
import state from "@/store/flights/states"
import mutations from "@/store/flights/mutations"

Vue.use(Vuex)

const FlightModule = {
    namespaced: true,
    actions,
    state,
    mutations,
}

export default FlightModule