import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import store from './store'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/app.scss'
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)

new Vue({
  router,
  store,
  axios,
  vuetify,
  render: h => h(App)
}).$mount('#app')

axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        this.store.commit('del_user')
        this.router.push('/login')
    }
  }
  return Promise.reject(error.response.data)
})

// Route jump
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
  // Check localstorage
    if (localStorage.user) {
      store.commit('set_user', JSON.parse(localStorage.user))
      // Add Axios header authorized
      axios.defaults.auth = {
        username: store.state.user.token,
        password: store.state.user.token
      }
      next()
    } else {
      next(false)
    }
  } else {
    next()
  }
})
