import Vue from 'vue'
import Vuex from 'vuex'

import AccountModule from './account/AccountModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    accountModule: AccountModule,
  },
})

export default store
