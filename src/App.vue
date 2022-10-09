<template>
  <div id="app">
    <router-view name="landing" />
    <div
      id="app"
      class="container p-0"
      style="max-width:100%">
      <router-view name="header" />
      <router-view
        :size="size" />
    </div>
  </div>
</template>
<script>
import store from './store'

export default {
  data () {
    return {
      size: 'sm'
    }
  },
  components () {

  },
  created () {
    if (localStorage.user) store.commit('set_user', JSON.parse(localStorage.user))
    if (localStorage.products) store.commit('set_products', JSON.parse(localStorage.products))
    if (localStorage.countProducts) store.commit('set_count_products', JSON.parse(localStorage.countProducts))
  },
  methods: {

  }
}
</script>

<style lang="scss">
@import 'src/assets/varibles';

#app {
  font-family:  'Oswald', 'Quicksand', sans-serif, sans-serif, Avenir, Helvetica;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $secondary-color;
}

.full-height {
  min-height: 100vh;
}

</style>
