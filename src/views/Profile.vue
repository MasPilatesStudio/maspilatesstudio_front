<template>
  <div class="container-fluid m-0 p-0">
    <div class="p-4 d-flex align-items-center">
      <div class="container registro content">
        <b-overlay :show="loading" rounded="sm">
          <b-card :aria-hidden="loading ? 'true' : null" class="card" no-body>
            <b-tabs v-model="tabIndex" card>
              <!-- Perfil -->
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
              <!-- Productos -->
              <b-tab v-if="user_logued.rol == 'Administrator'" title="Productos">
                <b-card-text>
                  <div v-if="loading">
                    <b-spinner style="width: 3rem; height: 3rem;" variant="info"></b-spinner>
                  </div>
                  <div v-else>
                    <b-form-input
                      v-model="product.name"
                      class="mt-2"
                      type="text"
                      placeholder="Nombre" />
                    <b-form-textarea
                      v-model="product.description"
                      placeholder="Descripción"
                      class="mt-2" />
                    <b-form-input
                      v-model="product.price"
                      class="mt-2"
                      type="text"
                      placeholder="Precio" />
                    <b-form-select
                      v-model="product.category"
                      :options="categories"
                      class="mt-2">
                    </b-form-select>
                    <b-form-select
                      v-model="product.brand"
                      :options="brands"
                      class="mt-2">
                    </b-form-select>
                    <b-button :disabled="loading" @click="add_product()" class="mt-3 primary-button">
                      Guardar
                    </b-button>
                  </div>
                </b-card-text>
              </b-tab>
              <!-- Pedidos -->
              <b-tab title="Pedidos">
                <b-card-text>
                  <b-table
                    id="pedidos-table"
                    responsive
                    :items="orders"
                    :per-page="5"
                    :current-page="currentPage"
                    :fields="fieldsOrders" >
                    <template #cell(articles)="data">
                      {{ data.item.articles }}
                    </template>
                    <template #cell(total_price)="data">
                      {{ data.item.total_price }}€
                    </template>
                    <template #cell(id_user)="data" v-if="user_logued.rol === 'Administrator'">
                      {{ data.item.id_user }}
                    </template>
                    <template #cell(direction)="data" v-if="user_logued.rol === 'Administrator'">
                      {{ data.item.direction }}
                    </template>
                    <template #cell(date)="data">
                      {{ data.item.date }}
                    </template>
                    <template #cell(state)="data">
                      <b-form-select v-if="user_logued.rol === 'Administrator'" v-model="data.item.state" :options="optionsState" @change="changeOrderState(data.item.id, data.item.state)"></b-form-select>
                      <p v-else>{{ data.item.state }}</p>
                    </template>
                  </b-table>
                  <b-pagination
                    v-model="currentPage"
                    class="justify-content-center"
                    :total-rows="rows"
                    :per-page="5"
                    aria-controls="pedidos-table">
                  </b-pagination>
                </b-card-text>
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
import shopServices from '@/services/shopServices.js'

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
      product: {
        name: '',
        description: '',
        image: '',
        price: '',
        category: 'Categoría',
        brand: 'Marcas'
      },
      optionsState: [
        { text: 'ESPERA', value: 'ESPERA' },
        { text: 'PREPARACIÓN', value: 'PREPARACIÓN' },
        { text: 'REPARTO', value: 'REPARTO' },
        { text: 'ENTREGADO', value: 'ENTREGADO' }
      ],
      fieldsOrders: [],
      orders: [],
      loadingOrders: true,
      categories: [],
      loadingCategories: true,
      brands: [],
      loadingBrands: true,
      nameState: null,
      loading: false,
      currentPage: 1,
      tabIndex: 0
    }
  },
  computed: {
    ...mapGetters({ user_logued: 'user_logued' }),
    rows () {
      return this.orders.length
    }
  },
  created () {
    this.getUser()
    this.get_categories()
    this.get_brands()
    this.getOrders()
    if (this.user_logued.rol !== 'Administrator') {
      this.fieldsOrders = [
        { key: 'articles', label: 'Productos', tdClass: 'align-middle' },
        { key: 'total_price', label: 'Precio total', tdClass: 'align-middle' },
        { key: 'date', label: 'Fecha', tdClass: 'align-middle' },
        { key: 'state', label: 'Estado', tdClass: 'align-middle' }
      ]
    } else {
      this.fieldsOrders = [
        { key: 'articles', label: 'Productos', tdClass: 'align-middle' },
        { key: 'total_price', label: 'Precio total', tdClass: 'align-middle' },
        { key: 'id_user', label: 'Usuario', tdClass: 'align-middle' },
        { key: 'direction', label: 'Dirección', tdClass: 'align-middle' },
        { key: 'date', label: 'Fecha', tdClass: 'align-middle' },
        { key: 'state', label: 'Estado', tdClass: 'align-middle' }
      ]
    }
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
    },
    add_product () {
      this.loading = true
      shopServices.add_product(this.product)
        .then(response => {
          if (response.response === 'OK') {
            this.$bvToast.toast('Operación realizada con éxito', {
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
    },
    getOrders () {
      shopServices.getOrders(this.user_logued)
        .then(response => {
          if (response.orders.length > 0) {
            this.orders = response.orders
            this.loadingOrders = false
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.checkLoading()
        })
    },
    changeOrderState (orderId, state) {
      shopServices.changeOrderState(orderId, state)
        .then(response => {

        })
        .catch((error) => {
          this.$bvToast.toast('No se ha podido guardar', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
          console.error(error)
        })
    },
    get_categories () {
      shopServices.get_categories()
        .then(response => {
          if (response.Items.length > 0) {
            this.categories = response.Items
            this.categories.unshift('Categoría')
            this.loadingCategories = false
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.checkLoading()
        })
    },
    get_brands () {
      shopServices.get_brands()
        .then(response => {
          if (response.Items.length > 0) {
            this.brands = response.Items
            this.brands.unshift('Marcas')
            this.loadingBrands = false
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.checkLoading()
        })
    },
    checkLoading () {
      if (!this.loadingBrands && !this.loadingCategories && !this.loadingOrders) {
        this.loading = false
      }
    }
  }
}
</script>
<style scoped>
  .registro {
    max-width: 60em;
  }

</style>
