<template>
  <div class="container-fluid content p-0">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      class="height"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd">

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide
        caption="First slide"
        class="height"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum.">
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="../assets/beneficios-pilates-para-runners.jpg"
            alt="image slot">
        </template>
      </b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide
        caption="First slide"
        class="height"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum.">
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="../assets/abdominales-con-rodillo.jpg"
            alt="image slot">
        </template>
      </b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide
        caption="First slide"
        class="height"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum.">
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="../assets/entrenar-con-bandas-elasticas.jpg"
            alt="image slot">
        </template>
      </b-carousel-slide>

      <b-carousel-slide
        caption="First slide"
        class="height"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum.">
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="../assets/trx-banner.jpg"
            alt="image slot">
        </template>
      </b-carousel-slide>
    </b-carousel>
    <div v-if="loading">
      <b-spinner style="width: 3rem; height: 3rem;" variant="info"></b-spinner>
    </div>
    <div class="m-4" v-else>
      <h3>TIENDA</h3>
      <div class="d-flex">
        <b-icon icon="filter" class="h3 mr-2 sidebar" v-b-toggle.sidebar-1></b-icon>
        <b-form-input v-model="filters.search" type="search" placeholder="Buscar ..." @change="get_products()"></b-form-input>
      </div>
      <div class="d-flex">
        <b-card
            tag="article"
            style="max-width: 15rem; min-width: 15rem; text-align: left;"
            class="m-2 mt-3 filters">
          <div class="px-3 py-2" style="text-align: left">
            <h3>FILTROS</h3>
            <h4 class="mt-2" v-b-toggle.collapse-1>
              Categorías
              <b-icon icon="chevron-up" aria-hidden="true" class="when-open"></b-icon>
              <b-icon icon="chevron-down" aria-hidden="true" class="when-closed"></b-icon>
            </h4>
            <b-collapse id="collapse-1" class="mt-2 ml-4">
              <div v-for="category in categories" :key="category">
                <p @click="filters.category = category, get_products()" class="pointer">{{ category }}</p>
              </div>
            </b-collapse>
            <h4 class="mt-4">Ordenar por</h4>
              <div class="pl-4 pr-4">
                <b-form-select v-model="filters.order" :options="options" @change="get_products()"></b-form-select>
              </div>
            <h4 class="mt-4" v-b-toggle.collapse>
              Marcas
              <b-icon icon="chevron-up" aria-hidden="true" class="when-open"></b-icon>
              <b-icon icon="chevron-down" aria-hidden="true" class="when-closed"></b-icon>
            </h4>
            <b-collapse id="collapse" class="ml-4">
              <b-form-checkbox-group
                v-model="filters.brands"
                v-for="brand in brands"
                :key="brand"
                @input="get_products()">
                <b-form-checkbox :value="brand">{{ brand }}</b-form-checkbox>
              </b-form-checkbox-group>
            </b-collapse>
          </div>
        </b-card>
        <b-sidebar id="sidebar-1" title="FILTROS" shadow >
          <div class="px-3 py-2" style="text-align: left">
            <h4 class="mt-2" v-b-toggle.collapse-1>
              Categorías
              <b-icon icon="chevron-up" aria-hidden="true" class="when-open"></b-icon>
              <b-icon icon="chevron-down" aria-hidden="true" class="when-closed"></b-icon>
            </h4>
            <b-collapse id="collapse-1" class="mt-2 ml-4">
              <div v-for="category in categories" :key="category">
                <p @click="filters.category = category, get_products()" class="pointer">{{ category }}</p>
              </div>
            </b-collapse>
            <h4 class="mt-4">Ordenar por</h4>
              <div class="pl-4 pr-4">
                <b-form-select v-model="filters.order" :options="options" @change="get_products()"></b-form-select>
              </div>
            <h4 class="mt-4" v-b-toggle.collapse>
              Marcas
              <b-icon icon="chevron-up" aria-hidden="true" class="when-open"></b-icon>
              <b-icon icon="chevron-down" aria-hidden="true" class="when-closed"></b-icon>
            </h4>
            <b-collapse id="collapse" class="ml-4">
              <b-form-checkbox-group
                v-model="filters.brands"
                v-for="brand in brands"
                :key="brand"
                @input="get_products()">
                <b-form-checkbox :value="brand">{{ brand }}</b-form-checkbox>
              </b-form-checkbox-group>
            </b-collapse>
          </div>
        </b-sidebar>
        <div class="d-flex m-2 flex-wrap justify-content-center gap" style="flex-grow: 1;" id="itemList">
          <p v-if="!checkLength">No hay registros para tu búsqueda</p>
          <div
            v-else
            v-for="product in products" :key="product.id"
            class="product-card mt-2">
            <div class="product-tumb">
              <img :src="getImgUrl(product)" alt="">
            </div>
            <div class="product-details">
              <span class="product-catagory">{{ product.category }}</span>
              <h4><a href="">{{ product.name }}</a></h4>
              <p>{{ product.description }}</p>
              <div class="product-bottom-details pt-2">
                <div class="product-price">{{ product.price }}€</div>
                <div class="product-links">
                  <b-icon icon="cart-fill" aria-hidden="true" @click="addToShoppingCart(product)"></b-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <b-pagination
        v-model="currentPage"
        aria-controls="itemList"
        align="center"
        :total-rows="rows"
        :per-page="perPage"
        @input="get_products()">
      </b-pagination>
    </div>
    <Footer />
  </div>
</template>

<script>
import shopServices from '@/services/shopServices.js'
import { mapGetters } from 'vuex'
import Footer from './Footer.vue'

export default {
  name: 'ShopPage',
  components: {
    Footer
  },
  data () {
    return {
      perPage: 3,
      currentPage: 1,
      count: 0,
      slide: 0,
      sliding: null,
      options: [
        { value: null, text: 'Lo más nuevo' },
        { value: 'desc', text: 'Precio: De más alto a más bajo' },
        { value: 'asc', text: 'Precio: De más bajo a más alta' }
      ],
      products: [],
      categories: [],
      brands: [],
      filters: {
        category: '',
        order: null,
        brands: [],
        search: ''
      },
      loading: true,
      loadingProducts: true,
      loadingCategories: true
    }
  },
  computed: {
    ...mapGetters({ user_logued: 'user_logued', countProducts: 'countProducts' }),
    checkLength () {
      if (this.products.length > 0) {
        return true
      }
      return false
    },
    rows () {
      return this.count
    }
  },
  mounted () {
    this.get_count_products()
    this.get_products()
    this.get_categories()
    this.get_brands()
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    getImgUrl (product) {
      return require('@/assets/shop/' + product.image)
    },
    addToShoppingCart (product) {
      if (this.user_logued !== undefined) {
        this.addToShoppingCartLogued(product)
      } else {
        this.$store.commit('set_product', product)
      }
      this.$store.commit('set_count_products', parseInt(this.countProducts) + 1)
    },
    addToShoppingCartLogued (product) {
      shopServices.add_to_shopping_cart(product.id, this.user_logued.email)
        .then(response => {
          if (response.message !== 'OK') {
            this.$bvToast.toast('Lo sentimos, algo ha ido mal', {
              title: 'Error',
              variant: 'danger',
              solid: true
            })
          } else {
            this.$bvToast.toast('Producto añadido al carrito', {
              title: 'Información',
              variant: 'info',
              solid: true
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    get_products () {
      shopServices.get_products(this.filters, this.currentPage, this.perPage)
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
    get_count_products () {
      shopServices.get_count_products()
        .then(response => {
          this.count = response.Items
          this.loadingCount = false
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.checkLoading()
        })
    },
    get_categories () {
      shopServices.get_categories()
        .then(response => {
          if (response.Items.length > 0) {
            this.categories = response.Items
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
      if (!this.loadingProducts && !this.loadingCategories && !this.loadingBrands && !this.loadingCount) {
        this.loading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/varibles';

.height {
  max-height: 50vh;
}

.gap {
  gap: 10px;
}

@media(min-width: 850px) {
  .height {
    max-height: 60vh;
  }
}

@media(min-width: 1000px) {
  .sidebar {
    display: none;
  }
  .pagination {
    margin-left: 17rem;
  }
}

@media(max-width: 1000px) {
  .filters {
    display: none;
  }
}

.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}

.product-card {
  width: 18rem;
  height: 25rem;
  position: relative;
  box-shadow: 0 2px 7px #dfdfdf;
  background: #fafafa;
}

.product-tumb {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  background: #d6d9dc;
  padding: 10px;
}

.product-details {
  padding: 10px;
}

.product-catagory {
  display: block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #9e9e9e;
  margin-bottom: 18px;
}

.product-details h4 a {
  font-weight: 500;
  display: block;
  margin-bottom: 18px;
  text-transform: uppercase;
  color: #363636;
  text-decoration: none;
  transition: 0.3s;
}

.product-details h4 a:hover {
  color: $third-color;
}

.product-details p {
  font-size: 15px;
  line-height: 22px;
  margin-bottom: 18px;
  color: #999;
}

.product-bottom-details {
  overflow: hidden;
  border-top: 1px solid #eee;
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  left: 0;
}

.product-bottom-details div {
  float: left;
  width: 50%;
}

.product-price {
  font-size: 18px;
  color: $third-color;
  font-weight: 600;
}

.product-links svg {
  display: inline-block;
  margin-left: 5px;
  color: #9e9e9e;
  transition: 0.3s;
  font-size: 17px;
  text-align: right;
}

.product-links svg:hover {
  color: $third-color;
}
</style>
