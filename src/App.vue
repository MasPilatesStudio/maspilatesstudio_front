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
export default {
  data () {
    return {
      size: 'sm'
    }
  },
  components () {

  },
  created () {
  },
  methods: {

  }
}
</script>

<style lang="scss">
@import 'src/assets/varibles';
#app {
  // width: 100%;
  // height: 100%;
  font-family: 'Quicksand', sans-serif, sans-serif, Avenir, Helvetica;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $secondary-color;
}

.full-height {
  min-height: 100vh;
}

</style>
