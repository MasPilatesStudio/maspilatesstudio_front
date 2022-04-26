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
          <b-dropdown-item @click="logout()">CERRAR SESIÓN</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
export default {
  name: 'HomeMessage',
  data () {
    return {
      nav: null
    }
  },
  created () {
    this.nav = document.querySelector('.nav-link')
  },
  methods: {
    click () {
      this.nav.classList.toggle('open')
    },
    logout () {
      this.$store.commit('del_user')
      this.$router.push('/')
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
}

</style>
