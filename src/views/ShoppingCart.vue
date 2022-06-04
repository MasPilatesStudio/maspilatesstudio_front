<template>
  <div class="container-fluid content p-0">
    <div v-if="loading">
      <b-spinner style="width: 3rem; height: 3rem;" variant="info"></b-spinner>
    </div>
    <div class="m-4" v-else>
      <h3>MI CARRITO</h3>
        <b-table
          responsive
          :items="products"
          :fields="fields" >
          <template #cell(Producto)="data">
            <img :src="getImgUrl(data.item)" class="image_shopping_cart" alt="">
            {{ data.item.name }}
          </template>
          <template #cell(price)="data">
            {{ data.item.price }}€
          </template>
          <template #cell(total_price)="data">
            {{ data.item.price * data.item.quantity }}€
          </template>
          <template #cell(Quitar)>
            <b-icon icon="x" class="h3"></b-icon>
          </template>
        </b-table>
    </div>
  </div>
</template>

<script>
import shopServices from '@/services/shopServices.js'
import { mapGetters } from 'vuex'

export default {
  name: 'HomeMessage',
  data () {
    return {
      loading: true,
      loadingProducts: true,
      fields: [
        'Producto',
        { key: 'price', label: 'Precio unidad', tdClass: 'align-middle' },
        { key: 'quantity', label: 'Cantidad', tdClass: 'align-middle' },
        { key: 'total_price', label: 'Precio final', tdClass: 'align-middle' },
        { key: 'Quitar', label: 'Quitar', tdClass: 'align-middle' }
      ],
      products: []
    }
  },
  computed: {
    ...mapGetters({ user_logued: 'user_logued', store_products: 'products' })
  },
  mounted () {
    if (this.user_logued !== undefined) this.get_shopping_cart()
    else {
      this.products = this.store_products
      this.loadingProducts = false
      this.checkLoading()
    }
  },
  methods: {
    getImgUrl (product) {
      return require('@/assets/shop/' + product.image)
    },
    get_shopping_cart () {
      shopServices.get_shopping_cart(this.user_logued.email)
        .then(response => {
          if (response.Items === 'No hay registros') {
            this.products = []
          } else if (response.Items.length > 0) {
            this.products = response.Items
            this.loadingProducts = false
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

.table td {
  vertical-align: middle !important;
}
</style>
