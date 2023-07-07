import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/board/actions"
import state from "@/store/board/states"
import mutations from "@/store/board/mutations"

Vue.use(Vuex)

const BoardModule = {
    namespaced: true,
    actions,
    state,
    mutations,
}

export default BoardModule