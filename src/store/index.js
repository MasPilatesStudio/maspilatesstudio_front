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
      product.quantity = 1
      let sigue = true
      let products = []
      if (localStorage.products !== undefined) {
        products = JSON.parse(localStorage.products)
        for (let i = 0; i < products.length; i++) {
          if (products[i].id === product.id) {
            sigue = false
            products[i].quantity += 1
          }
        }
      }
      if (sigue) products.push(product)
      state.products = products
      localStorage.products = JSON.stringify(products)
    },
    set_products (state, products) {
      state.products = products
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
