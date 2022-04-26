import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    email: '',
    rol: ''
  },
  getters: {
    user_logued: state => state.user
  },
  mutations: {
    set_user (state, user) {
      state.user = user
      localStorage.user = JSON.stringify(user)
    },
    del_user (state) {
      state.user = null
      localStorage.removeItem('user')
    }
  },
  actions: {
  },
  modules: {
  }
})
