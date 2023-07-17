import Vue from 'vue'
import Vuex from 'vuex'

import AccountModule from './account/AccountModule'
import BoardModule from './board/BoardModule'
import CommentModule from './comment/CommentModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    accountModule: AccountModule,
    boardModule: BoardModule,
    commentModule: CommentModule,
  },
})

export default store
