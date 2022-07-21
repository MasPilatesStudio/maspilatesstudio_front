<template>
  <div class="container-fluid m-0 p-0">
    <div class="p-4 d-flex align-items-center">
      <div class="container registro content">
        <b-overlay :show="loading" rounded="sm">
          <b-card :aria-hidden="loading ? 'true' : null" class="card" no-body>
            <b-tabs card>
              <b-tab title="Perfil" active>
                <b-card-body class="d-flex align-items-center col-12">
                  <b-col cols="12" class="align-items-center mt-2">
                    <img src="../assets/header_t.png" class="mb-4" height="120" style="object-fit: contain;">
                    <b-form-input
                      v-model="user.email"
                      type="email"
                      placeholder="Email"
                      disabled />
                    <b-form-input
                      v-model="user.name"
                      class="mt-2"
                      type="text"
                      placeholder="Nombre*"
                      :state="nameState"
                      @change="nameState = null" />
                    <b-form-input
                      v-model="user.province"
                      class="mt-2"
                      type="text"
                      placeholder="Provincia" />
                    <b-form-input
                      v-model="user.direction"
                      class="mt-2"
                      type="text"
                      placeholder="Dirección" />
                    <b-form-input
                      v-model="user.cp"
                      class="mt-2"
                      type="number"
                      placeholder="Código Postal" />
                    <b-form-input
                      v-model="user.phone"
                      class="mt-2"
                      type="number"
                      placeholder="Teléfono" />
                    <b-button :disabled="loading" @click="checkValues()" class="mt-3 primary-button">
                      Guardar
                    </b-button>
                  </b-col>
                </b-card-body>
              </b-tab>
              <b-tab title="Pedidos">
                <b-card-text>Tab contents 2</b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-overlay>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import userServices from '@/services/userServices.js'

export default {
  name: 'RegisterUser',
  data () {
    return {
      user: {
        email: '',
        name: '',
        province: '',
        direction: '',
        cp: '',
        phone: ''
      },
      nameState: null,
      loading: false
    }
  },
  computed: {
    ...mapGetters({ user_logued: 'user_logued' })
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser () {
      userServices.get_user(this.user_logued.email)
        .then(response => {
          this.user = response.response
        })
        .catch((error) => {
          console.error(error)
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    },

    checkValues () {
      if (this.user.name == null || this.user.name === '') {
        this.nameState = false
      } else {
        this.update()
      }
    },
    update () {
      this.loading = true
      this.user.email = this.user_logued.email
      userServices.update_send_direction(this.user)
        .then(response => {
          if (response.response === 'OK') {
            this.$bvToast.toast('Información actualizada correctamente', {
              title: 'Información',
              variant: 'success',
              solid: true
            })
            this.loading = false
          }
        })
        .catch((error) => {
          console.error(error)
          this.loading = false
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
