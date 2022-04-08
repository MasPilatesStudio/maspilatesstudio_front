import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing',
    components: {
      header: () => import('@/views/Header.vue'),
      default: () => import('@/views/Landing')
    }
  },
  {
    path: '/register',
    name: 'register',
    components: {
      header: () => import('@/views/Header.vue'),
      default: () => import('@/views/Register')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
