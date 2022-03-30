<template>
  <div class="prueba">
    <h1>Llega</h1>
    <p>{{ mensaje }}</p>
  </div>
</template>

<script>
import dataServices from '@/services/dataServices.js'

export default {
  name: 'HomeMessage',
  data () {
    return {
      mensaje: 'Sin mensaje!'
    }
  },
  methods: {
    getMensaje () {
      dataServices.getMessage()
        .then(response => {
          this.mensaje = response.message
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  created () {
    this.getMensaje()
  }
}
</script>
