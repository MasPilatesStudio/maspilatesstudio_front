import Vue from 'vue'
import VueRouter from 'vue-router'

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
  },
  {
    path: '/calendar',
    name: 'calendar',
    components: {
      header: () => import('@/views/Header.vue'),
      default: () => import('@/views/Calendar')
    },
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
