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
              <b-tab v-if="user_logued.rol === 'Administrator' || user_logued.rol === 'Employee'" title="Productos">
                <b-card-text>
                  <div>
                    <b-form-input
                      v-model="product.name"
                      class="mt-2"
                      type="text"
                      placeholder="Nombre*" />
                    <b-form-textarea
                      v-model="product.description"
                      placeholder="Descripción*"
                      class="mt-2" />
                    <b-form-input
                      v-model="product.price"
                      class="mt-2"
                      type="number"
                      placeholder="Precio*" />
                    <b-form-file
                      v-model="product.file"
                      class="mt-2"
                      :state="fileState"
                      placeholder="Choose a file or drop it here..."
                      drop-placeholder="Drop file here...">
                    </b-form-file>
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
                    :fields="fieldsOrders"
                    show-empty
                    :empty-text="'No se han realizado pedidos'" >
                    <template #cell(articles)="data">
                      {{ data.item.articles }}
                    </template>
                    <template #cell(total_price)="data">
                      {{ data.item.total_price }}€
                    </template>
                    <template #cell(id_user)="data" v-if="user_logued.rol === 'Administrator' || user_logued.rol === 'Employee'">
                      {{ data.item.id_user }}
                    </template>
                    <template #cell(direction)="data" v-if="user_logued.rol === 'Administrator' || user_logued.rol === 'Employee'">
                      {{ data.item.direction }}
                    </template>
                    <template #cell(date)="data">
                      {{ data.item.date }}
                    </template>
                    <template #cell(state)="data">
                      <b-form-select v-if="user_logued.rol === 'Administrator' || user_logued.rol === 'Employee'" v-model="data.item.state" :options="optionsState" @change="changeOrderState(data.item.id, data.item.state)"></b-form-select>
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
              <!-- Añadir empleado -->
              <b-tab v-if="user_logued.rol == 'Administrator'" title="Empleado">
                <b-card-text>
                  <div>
                    <b-form-input
                      v-model="employee.email"
                      type="email"
                      placeholder="Email*"
                      :state="emailState"
                      @change="emailState = null" />
                    <b-form-input
                      v-model="employee.name"
                      class="mt-2"
                      type="text"
                      placeholder="Nombre*"
                      :state="nameEmployeeState"
                      @change="nameEmployeeState = null" />
                    <b-form-input
                      v-model="employee.password"
                      class="mt-2"
                      type="password"
                      placeholder="Contraseña*"
                      :state="passwordState"
                      @change="passwordState = null" />
                    <b-form-input
                      v-model="employee.province"
                      class="mt-2"
                      type="text"
                      placeholder="Provincia*"
                      :state="provinceState"
                      @change="provinceState = null" />
                    <b-form-input
                      v-model="employee.direction"
                      class="mt-2"
                      type="text"
                      placeholder="Dirección*"
                      :state="directionState"
                      @change="directionState = null" />
                    <b-form-input
                      v-model="employee.cp"
                      class="mt-2"
                      type="number"
                      placeholder="Código Postal*"
                      :state="cpState"
                      @change="cpState = null" />
                    <b-form-input
                      v-model="employee.phone"
                      class="mt-2"
                      type="number"
                      placeholder="Teléfono*"
                      :state="phoneState"
                      @change="phoneState = null" />
                    <b-alert
                      class="m-2"
                      variant="danger"
                      fade
                      dismissible
                      :show="showError">
                      {{ error }}
                    </b-alert>
                    <b-button :disabled="loading" @click="add_employee()" class="mt-3 primary-button">
                      Guardar
                    </b-button>
                  </div>
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
import storage from '@/firebase.js'
import { ref, uploadBytes } from 'firebase/storage'

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
      employee: {
        email: '',
        name: '',
        password: '',
        province: '',
        direction: '',
        cp: '',
        phone: '',
        rol: 'Employee'
      },
      // State employee
      emailState: null,
      nameEmployeeState: null,
      passwordState: null,
      provinceState: null,
      directionState: null,
      cpState: null,
      phoneState: null,
      error: '',
      showError: false,
      product: {
        name: '',
        description: '',
        file: null,
        price: '',
        category: 'Categoría*',
        brand: 'Marcas*'
      },
      fileState: null,
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
    if (this.user_logued.rol !== 'Administrator' && this.user_logued.rol !== 'Employee') {
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
      if (this.product.name === '' || this.product.description === '' || this.product.file === null ||
      this.product.price === '' || this.product.category === 'Categoría*' || this.product.brand === 'Marcas*') {
        this.$bvToast.toast('Todos los campos son obligatorios', {
          title: 'ERROR',
          variant: 'danger',
          solid: true
        })
      } else if (!this.product.file.name.includes('.png')) {
        this.$bvToast.toast('El formato de la imágen no es correcto, debe ser png', {
          title: 'ERROR',
          variant: 'danger',
          solid: true
        })
      } else {
        this.loading = true
        shopServices.add_product(this.product)
          .then(response => {
            if (response.message !== null) {
              const refImg = ref(storage, 'imagenes/' + response.message + '.png')
              const metadata = { contentType: 'img/png' }
              uploadBytes(refImg, this.product.file, metadata)
              this.product = {
                name: '',
                description: '',
                file: null,
                price: '',
                category: 'Categoría*',
                brand: 'Marcas*'
              }
              this.$bvToast.toast('Operación realizada con éxito', {
                title: 'Información',
                variant: 'success',
                solid: true
              })
              this.loading = false
            } else {
              this.$bvToast.toast('No se ha podido guardar', {
                title: 'ERROR',
                variant: 'danger',
                solid: true
              })
            }
          })
          .catch((error) => {
            this.$bvToast.toast('No se ha podido guardar', {
              title: 'ERROR',
              variant: 'danger',
              solid: true
            })
            console.error(error)
            this.loading = false
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    getOrders () {
      shopServices.getOrders(this.user_logued)
        .then(response => {
          if (response.orders !== 'No hay registros') {
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
    add_employee () {
      this.showError = false
      const expr = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/

      if (this.employee.email == null || this.employee.email === '' ||
          this.employee.name == null || this.employee.name === '' ||
          this.employee.password == null || this.employee.password === '' ||
          this.employee.province == null || this.employee.province === '' ||
          this.employee.direction == null || this.employee.direction === '' ||
          this.employee.cp == null || this.employee.cp === '' ||
          this.employee.phone == null || this.employee.phone === '' ||
          !expr.test(this.employee.email)) {
        // Cambiar el state si está vacio
        this.emailState = this.employee.email === '' || !expr.test(this.employee.email) ? false : null
        this.nameEmployeeState = this.employee.name === '' ? false : null
        this.passwordState = this.employee.password === '' ? false : null
        this.provinceState = this.employee.province === '' ? false : null
        this.directionState = this.employee.direction === '' ? false : null
        this.cpState = this.employee.cp === '' ? false : null
        this.phoneState = this.employee.phone === '' ? false : null
        if (!expr.test(this.employee.email) && this.employee.email !== '') {
          this.showError = true
          this.error = 'El email no es válido'
        }
      } else {
        userServices.add_employee(this.employee)
          .then(response => {
            if (response.message !== 'OK') {
              this.showError = true
              this.error = response.message
            } else {
              this.$bvToast.toast('Empleado guardado correctamente', {
                title: 'ÉXITO',
                variant: 'success',
                solid: true
              })
            }
          })
          .catch((error) => {
            this.$bvToast.toast('No se ha podido guardar', {
              title: 'ERROR',
              variant: 'danger',
              solid: true
            })
            console.error(error)
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    get_categories () {
      shopServices.get_categories()
        .then(response => {
          if (response.Items.length > 0) {
            this.categories = response.Items
            this.categories.unshift('Categoría*')
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
            this.brands.unshift('Marcas*')
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
