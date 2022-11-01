<template>
  <div class="container-fluid content p-0">
    <div v-if="loading">
      <b-spinner style="width: 3rem; height: 3rem;" variant="info"></b-spinner>
    </div>
    <div class="m-4 p-4" v-else>
      <div v-if="products.length === 0">
        <p>No has añadido ningún producto al carrito</p>
        <h5><router-link class="link-black" to="/shop">Seguir comprando</router-link></h5>
      </div>
      <div v-else>
        <h3 class="p-3">MI CARRITO</h3>
        <b-table
          responsive
          :items="products"
          :fields="fields" >
          <template #cell(Producto)="data">
            <img :src="data.item.imgUrl" class="image_shopping_cart mr-3" alt="">
            {{ data.item.name }}
          </template>
          <template #cell(price)="data">
            {{ data.item.price }}€
          </template>
          <template #cell(quantity)="data">
            <b-form-spinbutton id="demo-sb" v-model="data.item.quantity" min="1" max="100" @change="getTotal(), deleteProduct(data.item)"></b-form-spinbutton>
          </template>
          <template #cell(total_price)="data">
            {{ getTotalPrice(data.item) }} €
          </template>
          <template #cell(Eliminar)="data">
            <b-icon icon="x" class="h3 pointer" @click="data.item.quantity = 0, deleteProduct(data.item)"></b-icon>
          </template>
        </b-table>
        <div>
          <h4 id="align">Total: {{ total.toFixed(2) }}</h4>
          <div class="d-flex justify-content-between mt-4 align-items-center">
            <h5><router-link class="link-black" to="/shop">Seguir comprando</router-link></h5>
            <b-button size="lg" variant="info" @click="user_logued === undefined ? goToRegister() : modalPedido()">Procesar pedido</b-button>
          </div>
        </div>
      </div>
      <ModalPedido :products="products" v-if="user_logued !== undefined"></ModalPedido>
    </div>
  </div>
</template>

<script>
import shopServices from '@/services/shopServices.js'
import { mapGetters } from 'vuex'
import ModalPedido from '@/components/Pedido.vue'
import { ref, getDownloadURL } from 'firebase/storage'
import storage from '@/firebase.js'

export default {
  name: 'HomeMessage',
  components: {
    ModalPedido
  },
  data () {
    return {
      loading: true,
      loadingProducts: true,
      fields: [
        'Producto',
        { key: 'price', label: 'Precio unidad', tdClass: 'align-middle' },
        { key: 'quantity', label: 'Cantidad', tdClass: 'align-middle' },
        { key: 'total_price', label: 'Precio final', tdClass: 'align-middle' },
        { key: 'Eliminar', label: 'Eliminar', tdClass: 'align-middle' }
      ],
      products: [],
      total: 0
    }
  },
  computed: {
    ...mapGetters({ user_logued: 'user_logued', store_products: 'products' })
  },
  mounted () {
    if (this.user_logued !== undefined) this.get_shopping_cart()
    else {
      this.products = this.store_products
      this.getTotal()
      this.loadingProducts = false
      this.checkLoading()
    }
  },
  methods: {
    // getImgUrl (product) {
    //   return require('@/assets/shop/' + product.image)
    // },
    getTotalPrice (data) {
      const num = data.price * data.quantity
      return num.toFixed(2)
    },
    getTotal () {
      this.total = 0
      let totalQuantity = 0
      this.products.forEach(element => {
        this.total += element.price * element.quantity
        totalQuantity += element.quantity
      })
      this.$store.commit('set_count_products', totalQuantity)
      this.$store.commit('set_products', this.products)
    },
    modalPedido () {
      this.$bvModal.show('realizar-pedido')
    },
    deleteProduct (product) {
      if (this.user_logued !== undefined) {
        shopServices.delete_product(this.user_logued.email, product)
          .then(response => {
            console.log(response)
          })
          .catch((error) => {
            console.error(error)
          })
      }
      this.$store.commit('del_product', product)
    },
    goToRegister () {
      this.$router.push('/register')
    },
    get_shopping_cart () {
      shopServices.get_shopping_cart(this.user_logued.email)
        .then(response => {
          if (response.Items === 'No hay registros') {
            this.products = []
            this.loadingProducts = false
          } else if (response.Items.length > 0) {
            this.products = response.Items
            this.products.forEach(element => {
              const listRef = ref(storage, 'imagenes/' + element.image)
              getDownloadURL(listRef)
                .then((res) => {
                  element.imgUrl = res
                  if (this.products[this.products.length - 1].id === element.id) {
                    this.loadingProducts = false
                    this.checkLoading()
                  }
                }).catch()
            })
            this.getTotal()
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
      if (!this.loadingProducts) {
        this.loading = false
      }
    }
  }
}
</script>
<style scoped>
.image_shopping_cart {
  height: 80px;
  width: 80px;
  object-fit: contain;
}
#align {
  text-align: right;
}
</style>
