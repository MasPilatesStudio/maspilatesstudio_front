<template>
  <b-modal id="realizar-pedido"
    centered
    hide-footer>
    <template #modal-header="{ }">
      <h2 class="m-2">
        <b-icon
          class="pointer"
          icon="house-door-fill"/>
          Dirección de envío
      </h2>
    </template>
    <div class="m-3">
      <b-row class="mt-3">
        <b-form-input
            v-model="user.province"
            :state="stateProvince"
            @change="stateProvince = null"
            type="text"
            placeholder="Provincia*">
        </b-form-input>
        <b-form-input
            v-model="user.cp"
            :state="stateCp"
            @change="stateCp = null"
            type="number"
            placeholder="Código Postal*"
            class="mt-2">
        </b-form-input>
        <b-form-input
            v-model="user.direction"
            :state="stateDirection"
            @change="stateDirection = null"
            type="text"
            placeholder="Dirección*"
            class="mt-2">
        </b-form-input>
        <b-form-input
            v-model="user.phone"
            :state="statePhone"
            @change="statePhone = null"
            type="number"
            placeholder="Teléfono*"
            class="mt-2">
        </b-form-input>
      </b-row>
      <b-row class="d-flex justify-content-between">
        <b-button class="mt-4" variant="outline-danger" @click="$bvModal.hide('realizar-pedido')">Cancelar</b-button>
        <b-button class="mt-4" variant="info" @click="updateSendDirection()">Guardar y continuar</b-button>
      </b-row>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import userServices from '@/services/userServices.js'
import shopServices from '@/services/shopServices.js'

export default {
  name: 'PedidoModal',
  props: ['products'],
  data () {
    this.publishableKey = 'pk_test_51L8UuqJgo7zTVCqcqI8rpZ1yPQGcu730JWCJluVCObto2cd3XV14xvBBiZfeJkiIMtlpE0dIK0n6BOrhpwK7iRua00QFyrm8ko'
    return {
      user: {
        province: '',
        cp: '',
        direction: '',
        phone: ''
      },
      stateProvince: null,
      stateCp: null,
      stateDirection: null,
      statePhone: null,
      loadingPublicKey: true,
      stripe: null,
      loading: false
    }
  },
  computed: {
    ...mapGetters({ user_logued: 'user_logued' })
  },
  mounted () {
  },
  created () {
    this.getUser()
  },
  methods: {
    updateSendDirection () {
      if (this.user.province === '' || this.user.cp === '' ||
      this.user.direction === '' || this.user.phone === '') {
        if (this.user.province === '') this.stateProvince = false
        if (this.user.cp === '') this.stateCp = false
        if (this.user.direction === '') this.stateDirection = false
        if (this.user.phone === '') this.statePhone = false
      } else {
        this.user.email = this.user_logued.email
        userServices.update_send_direction(this.user)
          .then(response => {
            if (response.response === 'OK') {
              this.finalizeOrder()
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
    },
    finalizeOrder () {
      this.user.email = this.user_logued.email
      shopServices.saveOrder(this.user.email, this.products)
        .then(response => {
          console.log(response)
          window.location.href = response.sessionId
        })
        .catch((error) => {
          console.error(error)
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    },
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
    }
  }
}
</script>
