<template>
  <div class="container-fluid m-0 p-0">
    <div class="p-4 d-flex align-items-center">
      <div class="container registro content">
        <b-overlay :show="loading" rounded="sm">
          <b-card :aria-hidden="loading ? 'true' : null" class="p-4 d-flex align-items-center card" no-body>
            <b-card-header>
              <h3>Registro</h3>
            </b-card-header>
            <b-card-body class="d-flex col-12">
              <b-col cols="12" class="align-items-center mt-2">
                <img src="../assets/header_t.png" class="mb-4" height="120">
                <b-form-input
                  v-model="user.email"
                  type="email"
                  placeholder="Email" />
                <b-form-input
                  v-model="user.name"
                  class="mt-2"
                  type="text"
                  placeholder="Nombre" />
                <b-form-input
                  v-model="user.password"
                  class="mt-2"
                  type="password"
                  placeholder="Contraseña" />
                <b-form-input
                  v-model="user.password"
                  class="mt-2"
                  type="password"
                  placeholder="Confirmar contraseña" />
                <b-button :disabled="loading" @click="loading = true" class="mt-2 primary-button">
                  Registrarme
                </b-button>
              </b-col>
            </b-card-body>
          </b-card>
        </b-overlay>
      </div>
    </div>
  </div>
</template>

<script>
import dataServices from '@/services/dataServices.js'

export default {
  name: 'RegisterUser',
  components: {

  },
  data () {
    return {
      mensaje: 'Sin mensaje!',
      user: {
        email: '',
        name: '',
        password: ''
      },
      loading: false
    }
  },
  created () {
    this.getMensaje()
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
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style scoped>

  .registro {
    max-width: 50em;
  }

</style>
