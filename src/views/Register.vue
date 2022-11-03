<template>
  <div class="container-fluid m-0 p-0">
    <div class="p-4 d-flex align-items-center">
      <div class="container registro content">
        <b-overlay :show="loading" rounded="sm">
          <b-card :aria-hidden="loading ? 'true' : null" class="p-4 d-flex align-items-center card" no-body>
            <h3>Registro</h3>
            <b-card-body class="d-flex col-12">
              <b-col cols="12" class="align-items-center mt-2">
                <img src="../assets/header_t.png" class="mb-4" height="120" style="object-fit: contain;">
                <b-form-input
                  v-model="user.email"
                  type="email"
                  placeholder="Email"
                  :state="emailState"
                  @change="emailState = null" />
                <b-form-input
                  v-model="user.name"
                  class="mt-2"
                  type="text"
                  placeholder="Nombre"
                  :state="nameState"
                  @change="nameState = null" />
                <b-form-input
                  v-model="user.password"
                  class="mt-2"
                  type="password"
                  placeholder="Contraseña"
                  :state="passwordState"
                  @change="passwordState = null" />
                <b-form-input
                  v-model="user.passwordCheck"
                  class="mt-2"
                  type="password"
                  placeholder="Confirmar contraseña"
                  :state="passwordCheckState"
                  @change="passwordCheckState = null" />
                 <b-alert
                    class="m-2"
                    variant="danger"
                    fade
                    dismissible
                    :show="showError">
                    {{ error }}
                 </b-alert>
                <b-button :disabled="loading" @click="checkValues()" class="mt-3 primary-button">
                  Registrarme
                </b-button>
                <div class="mt-4">
                  ¿Ya tienes una cuenta? <router-link class="link-black font-weight-bold" to="/"> Iniciar sesión</router-link>
                </div>
              </b-col>
            </b-card-body>
          </b-card>
        </b-overlay>
      </div>
    </div>
  </div>
</template>

<script>
import userServices from '@/services/userServices.js'

export default {
  name: 'RegisterUser',
  data () {
    return {
      user: {
        email: '',
        name: '',
        password: '',
        passwordCheck: ''
      },
      emailState: null,
      nameState: null,
      passwordState: null,
      passwordCheckState: null,
      loading: false,
      error: '',
      showError: false
    }
  },
  created () {
  },
  methods: {
    checkValues () {
      this.showError = false
      const expr = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/

      if (this.user.email == null || this.user.email === '' ||
          this.user.name == null || this.user.name === '' ||
          this.user.password == null || this.user.password === '' ||
          this.user.passwordCheck == null || this.user.passwordCheck === '' ||
          this.user.password !== this.user.passwordCheck ||
          !expr.test(this.user.email)) {
        if (this.user.email == null || this.user.email === '' || !expr.test(this.user.email)) {
          this.emailState = false
        }
        if (this.user.name == null || this.user.name === '') {
          this.nameState = false
        }
        if (this.user.password == null || this.user.password === '') {
          this.passwordState = false
        }
        if (this.user.passwordCheck == null || this.user.passwordCheck === '') {
          this.passwordCheckState = false
        }
        if (this.user.passwordCheck !== this.user.password) {
          this.passwordCheckState = false
          this.passwordState = false
          this.error = 'Las contraseñas no coinciden'
          this.showError = true
        } else if (!expr.test(this.user.email)) {
          this.error = 'El email no tiene el formato correcto'
          this.showError = true
        } else {
          this.error = 'Todos los campos son obligatorios'
          this.showError = true
        }
      } else {
        this.register()
      }
    },

    register () {
      userServices.register(this.user)
        .then(response => {
          if (response.message !== 'OK') {
            this.showError = true
            this.error = response.message
          } else {
            // Redirect to inicio
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
<style scoped>
  .registro {
    max-width: 50em;
  }

</style>
