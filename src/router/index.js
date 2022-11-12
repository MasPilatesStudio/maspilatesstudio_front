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
    path: '/profile',
    name: 'Profile',
    components: {
      header: () => import('@/views/Header.vue'),
      default: () => import('@/views/Profile')
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/configuration',
    name: 'Configuration',
    components: {
      header: () => import('@/views/Header.vue'),
      default: () => import('@/views/Profile')
    },
    meta: {
      requireAuth: true
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
  },
  {
    path: '/shop',
    name: 'shop',
    components: {
      header: () => import('@/views/Header.vue'),
      default: () => import('@/views/Shop')
    }
  },
  {
    path: '/shoppingCart',
    name: 'shoppingCart',
    components: {
      header: () => import('@/views/Header.vue'),
      default: () => import('@/views/ShoppingCart')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
