import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    email: '',
    rol: '',
    products: []
  },
  getters: {
    user_logued: state => state.user,
    products: state => state.products
  },
  mutations: {
    set_user (state, user) {
      state.user = user
      localStorage.user = JSON.stringify(user)
    },
    del_user (state) {
      state.user = null
      localStorage.removeItem('user')
    },
    set_product (state, product) {
      state.products.push(product)
      localStorage.products = JSON.stringify(state.products)
    },
    del_product (state, product) {
      const products = state.products
      const index = products.indexOf(product)
      if (index > -1) {
        products.splice(index, 1) // 2nd parameter means remove one item only
      }
      localStorage.removeItem('products')
      localStorage.products = JSON.stringify(products)
    }
  },
  actions: {
  },
  modules: {
  }
})
