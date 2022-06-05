<template>
  <b-modal id="realizar-pedido"
    centered
    hide-footer>
    <template #modal-header="{ }">
      <h3 class="m-2" v-if="first">
        <b-icon
          class="pointer"
          icon="house-door-fill"/>
          Dirección de envío
      </h3>
      <h3 class="m-2" v-else>
        <b-icon
          class="pointer"
          icon="credit-card"/>
          Pago con tarjeta
      </h3>
    </template>
    <div class="m-3">
      <b-row class="mt-3" v-if="first">
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

      <b-row class="mt-3" v-else>
        <b-form-input
            v-model="user.province"
            type="text"
            placeholder="Número de la tarjeta*">
        </b-form-input>
        <b-form-input
            v-model="user.cp"
            type="number"
            placeholder="Fecha de expiración*"
            class="mt-2">
        </b-form-input>
        <b-form-input
            v-model="user.direction"
            type="text"
            placeholder="CVC / CVV*"
            class="mt-2">
        </b-form-input>
        <b-form-input
            v-model="user.phone"
            type="number"
            placeholder="Teléfono*"
            class="mt-2">
        </b-form-input>
      </b-row>
      <b-row class="d-flex justify-content-between">
        <b-button class="mt-4" variant="outline-danger">Cancelar</b-button>
        <b-button class="mt-4" variant="info" @click="first ? updateSendDirection() : finalizeOrder()">{{ first ? 'Guardar y continuar' : 'Confirmar' }}</b-button>
      </b-row>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import userServices from '@/services/userServices.js'

export default {
  name: 'PedidoModal',
  props: ['products'],
  data: () => ({
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
    first: true
  }),
  computed: {
    ...mapGetters({ user_logued: 'user_logued' })
  },
  mounted () {
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
              this.first = false
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
      console.log('finalizar')
    }
  }
}
</script>
