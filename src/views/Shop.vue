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
    <div class="m-4">
      <h3>TIENDA</h3>
      <div class="d-flex">
        <b-icon icon="filter" class="h3 mr-2 sidebar" v-b-toggle.sidebar-1></b-icon>
        <b-form-input v-model="search" type="search" placeholder="Buscar ..."></b-form-input>
      </div>
      <div class="d-flex">
        <b-card
            tag="article"
            style="max-width: 18rem; text-align: left;"
            class="m-2 mt-3 filters">
          <div class="px-3 py-2" style="text-align: left">
            <h3>FILTROS</h3>
            <h4 class="mt-2" v-b-toggle.collapse-1>
              Categorías
              <b-icon icon="chevron-up" aria-hidden="true" class="when-open"></b-icon>
              <b-icon icon="chevron-down" aria-hidden="true" class="when-closed"></b-icon>
            </h4>
            <b-collapse id="collapse-1" class="mt-2 ml-4">
              <p>Materiales</p>
              <p>Nutrición</p>
              <p>Ropa</p>
            </b-collapse>
            <h4 class="mt-4">Ordenar por</h4>
              <div class="pl-4 pr-4">
                <b-form-select v-model="order" :options="options"></b-form-select>
              </div>
            <h4 class="mt-4" v-b-toggle.collapse>
              Marcas
              <b-icon icon="chevron-up" aria-hidden="true" class="when-open"></b-icon>
              <b-icon icon="chevron-down" aria-hidden="true" class="when-closed"></b-icon>
            </h4>
            <b-collapse id="collapse" class="ml-4">
              <b-form-checkbox value="orange">Orange</b-form-checkbox>
              <b-form-checkbox value="apple">Apple</b-form-checkbox>
              <b-form-checkbox value="pineapple">Pineapple</b-form-checkbox>
              <b-form-checkbox value="grape">Grape</b-form-checkbox>
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
              <p>Materiales</p>
              <p>Nutrición</p>
              <p>Ropa</p>
            </b-collapse>
            <h4 class="mt-4">Ordenar por</h4>
              <div class="pl-4 pr-4">
                <b-form-select v-model="order" :options="options"></b-form-select>
              </div>
            <h4 class="mt-4" v-b-toggle.collapse>
              Marcas
              <b-icon icon="chevron-up" aria-hidden="true" class="when-open"></b-icon>
              <b-icon icon="chevron-down" aria-hidden="true" class="when-closed"></b-icon>
            </h4>
            <b-collapse id="collapse" class="ml-4">
              <b-form-checkbox value="orange">Orange</b-form-checkbox>
              <b-form-checkbox value="apple">Apple</b-form-checkbox>
              <b-form-checkbox value="pineapple">Pineapple</b-form-checkbox>
              <b-form-checkbox value="grape">Grape</b-form-checkbox>
            </b-collapse>
          </div>
        </b-sidebar>
        <div class="d-flex m-2 flex-wrap justify-content-center">
          <b-card
            tag="article"
            style="max-width: 18rem; height: 25rem;"
            class="m-2">
            <img
              class="d-block img-fluid w-100 p-3"
              style="height: 60%; object-fit: contain;"
              src="../assets/shop/81N1jamp9eL._AC_SY355_.jpg"
              alt="image slot">
            <div class="container-lines">
              <div class="line"></div>
                <b-icon icon="chevron-up" aria-hidden="true"></b-icon>
              <div class="line"></div>
            </div>
            <b-card-text class="pb-3 pl-3 pr-3 d-flex justify-content-center" style="height: 35%; flex-direction: column">
              <h4>Article</h4>
              Some quick example text to build on the card title.
            </b-card-text>
          </b-card>

          <b-card
            tag="article"
            style="max-width: 18rem; height: 25rem;"
            class="m-2">
            <img
              class="d-block img-fluid w-100 "
              style="height: 60%; object-fit: contain;"
              src="../assets/shop/banda-elastica-latex-densidad-media.jpg"
              alt="image slot">
            <b-card-text>
              <h4>Article</h4>
              Some quick example text to build on the card title.
            </b-card-text>
          </b-card>

          <b-card
            tag="article"
            style="max-width: 18rem; height: 25rem;"
            class="m-2">
            <img
              class="d-block img-fluid w-100"
              style="height: 60%; object-fit: contain;"
              src="../assets/shop/Gliding-Disc-Hardwood.jpg"
              alt="image slot">
            <b-card-text>
              <h4>Article</h4>
              Some quick example text to build on the card title.
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopPage',
  data () {
    return {
      slide: 0,
      sliding: null,
      order: null,
      options: [
        { value: null, text: 'Lo más nuevo' },
        { value: 'asc', text: 'Precio: De más alto a más bajo' },
        { value: 'desc', text: 'Precio: De más bajo a más alta' }
      ]
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>
<style scoped>
.height {
  max-height: 50vh;
}

.card-body {
  padding: 0;
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
}

@media(max-width: 1000px) {
  .filters {
    display: none;
  }
}

.container-lines{
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
}

.container-lines > svg {
  color: #35858b8a;
}

.line{
  margin:0 .75rem;
  background-color:#35858b8a;
  height:2px;
  width:80px;
}

.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
</style>
