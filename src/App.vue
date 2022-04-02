<template>
  <div id="app">
    <router-view name="landing" />
    <div
      id="app"
      class="container p-0"
      style="max-width:100%">
      <router-view name="header" />
      <router-view
        :size="size"
        class="pb-5" />
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
  font-family: 'Quicksand', sans-serif, sans-serif, Avenir, Helvetica;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
