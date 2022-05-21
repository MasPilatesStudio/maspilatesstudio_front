<template>
  <div class="container-fluid content p-0">
    <div v-if="loading">
      <b-spinner style="width: 3rem; height: 3rem;" variant="info"></b-spinner>
    </div>
    <div class="pr-3 pl-3 pb-3" v-else>
      <div class="d-flex">
        <b-form-input v-model="search" type="search" size="lg" placeholder="Buscar ...">
        </b-form-input>
      </div>
      <b-card no-body class="mt-4">
        <b-tabs card>
          <b-tab title="Tienda" class="d-flex" active>
              <b-card
                title="Card Title"
                img-src="https://picsum.photos/600/400/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 18rem;"
                class="m-2">
                <b-card-text>
                  Some quick example text to build on the card title.
                </b-card-text>
                <b-button href="#" variant="primary">Go somewhere</b-button>
              </b-card>

              <b-card
                title="Card Title"
                img-src="https://picsum.photos/600/400/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 18rem;"
                class="m-2">
                <b-card-text>
                  Some quick example text to build on the card title.
                </b-card-text>
                <b-button href="#" variant="primary">Go somewhere</b-button>
              </b-card>

              <b-card
                title="Card Title"
                img-src="https://picsum.photos/600/400/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 18rem;"
                class="m-2">
                <b-card-text>
                  Some quick example text to build on the card title.
                </b-card-text>
                <b-button href="#" variant="primary">Go somewhere</b-button>
              </b-card>
          </b-tab>
          <b-tab title="Carrito">
            <b-card-text>Tab contents 2</b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from './Footer.vue'

export default {
  name: 'ShopPage',
  components: {
    Footer
  },
  data () {
    return {
      loading: false
    }
  }
}
</script>
