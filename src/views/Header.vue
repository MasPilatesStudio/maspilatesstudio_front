<template>
  <div class="header">
  <b-navbar toggleable="lg" type="dark" variant="dark" class="d-flex">
    <b-navbar-brand href="#">
      <img src="../assets/header_t.png" alt="logo" class="icon-logo" />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav class="justify-content-end">
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/">INICIO</b-nav-item>
        <b-nav-item to="/shop">TIENDA</b-nav-item>
        <b-nav-item to="/calendar" v-show="user_logued">CALENDARIO</b-nav-item>
        <b-nav-item-dropdown right v-show="user_logued">
          <!-- Using 'button-content' slot -->
          <template #button-content>
            USUARIO
          </template>
          <b-dropdown-item @click="go_to_profile()">PERFIL</b-dropdown-item>
          <b-dropdown-item-button @click="logout()">CERRAR SESIÓN</b-dropdown-item-button>
        </b-nav-item-dropdown>
        <b-nav-item class="carrito-item">
          <b-button variant="outline-secondary" class="cart" to="/shoppingCart">
            <b-icon icon="cart-fill" aria-hidden="true"></b-icon>
            <b-badge variant="danger" id="cart_menu_num">{{ count }}</b-badge>
          </b-button>
        </b-nav-item>
        <b-nav-item>
          <b-button variant="outline-secondary" class="cart" @click="go_to_profile()">
            <b-icon icon="gear-fill" aria-hidden="true"></b-icon>
          </b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
import userServices from '@/services/userServices.js'
import shopServices from '@/services/shopServices.js'
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderComponent',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({ user_logued: 'user_logued', store_products: 'products', count: 'countProducts' })
  },
  created () {
    this.cerrar = document.querySelector('#cerrar')
    this.get_count_products()
  },
  methods: {
    go_to_profile () {
      if (this.$route.path !== '/profile') this.$router.replace('/profile')
    },
    go_to_confiration () {
      if (this.$route.path !== '/configuration') this.$router.replace('/configuration')
    },
    logout () {
      userServices.logout()
        .then(response => {
          if (response.response === 'OK') {
            this.$store.commit('del_user')
            this.$store.commit('del_count_products')
            this.$store.commit('set_products', [])
            this.$router.push('/')
            this.$router.go(0)
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    get_count_products () {
      if (this.user_logued !== undefined) {
        shopServices.get_count_shopping_cart(this.user_logued.email)
          .then(response => {
            this.$store.commit('set_count_products', response.quantity)
          })
          .catch((error) => {
            console.error(error)
          })
          .finally(() => {
          })
      } else {
        let total = 0
        this.store_products.forEach(product => {
          total += product.quantity
        })
        this.$store.commit('set_count_products', total)
      }
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/varibles';
.header {
  position: fixed;
  width: 100%;
  z-index: 100;
  left: 0;
  top: 0;
}

.icon-logo {
  width: 6em;
  height: 3em;
  object-fit: contain;
}

.navbar {
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 500;
}

@media(min-width: 850px) {
  .navbar {
    padding-left: $margin;
    padding-right: $margin;
  }
  #cart_menu_num {
    position: absolute;
    font-size: small;
    top: 4px;
    left: 62%;
    background: red;
    width: 15px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 2px;
  }
}

.cart {
  position: relative;
  border: none;
  top: -5px;
}

.carrito-item {
  position: relative;
}
#cart_menu_num {
  position: absolute;
  font-size: small;
  top: 4px;
  left: 51%;
  background: red;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 2px;
}
</style>
