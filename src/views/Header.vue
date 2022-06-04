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
        <b-nav-item to="/calendar">CALENDARIO</b-nav-item>
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            USUARIO
          </template>
          <b-dropdown-item href="#">PERFIL</b-dropdown-item>
          <b-dropdown-item-button @click="logout()">CERRAR SESIÓN</b-dropdown-item-button>
        </b-nav-item-dropdown>
        <b-button variant="outline-secondary" class="cart" to="/shoppingCart">
          <b-icon icon="cart-fill" aria-hidden="true"></b-icon>
          <b-badge variant="danger" id="cart_menu_num">4</b-badge>
        </b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
import userServices from '@/services/userServices.js'

export default {
  name: 'HeaderComponent',
  data () {
    return {
    }
  },
  created () {
    this.cerrar = document.querySelector('#cerrar')
  },
  methods: {
    logout () {
      userServices.logout()
        .then(response => {
          if (response.response === 'OK') {
            this.$store.commit('del_user')
            this.$router.push('/')
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
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
