import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/comment/actions"
import state from "@/store/comment/states"
import mutations from "@/store/comment/mutations"

Vue.use(Vuex)

const CommentModule = {
    namespaced: true,
    actions,
    state,
    mutations,
}

export default CommentModule