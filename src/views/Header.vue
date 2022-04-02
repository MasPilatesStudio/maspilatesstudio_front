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
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#">Link 2</b-nav-item>
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
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
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/varibles';
.header {
  position: sticky;
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
  font-weight: 600;

}

@media(min-width: 850px) {
  .navbar {
    padding-left: 150px;
    padding-right: 150px;
  }
}

</style>
