<template>
  <div class="container-fluid m-0 p-0">
    <div id="home-page" class="full-height p-4 d-flex align-items-center">
      <div class="container">
        <h1 class="display-3 first-title">{{ title }}</h1>
        <h3 class="second-title mt-3">Entrena con nosotros</h3>
        <b-button class="primary-button p-3 mt-5" href="#about">
          Saber más
        </b-button>
      </div>
    </div>

    <div id="about" class="bg-light p-3 p-md-5">
      <div class="row">
        <div class="col-lg">
          <img src="../assets/undraw_pilates_gpdb.svg" height="120" class="m-4">
          <h3 class="font-weight-bold">Pilates Matwork</h3>
          <h5 class="ml-md-4 mr-md-4">
            Este tipo de entrenamiento se realiza sobre una colchoneta siendo una actividad muy
            beneficiosa para el cuerpo y que puede ser practicada por todos.
          </h5>
        </div>
        <div class="col-lg">
          <img src="../assets/undraw_stability_ball_b-4-ia.svg" height="120" class="m-4">
          <h3 class="font-weight-bold">Pilates con Materiales</h3>
          <h5 class="ml-md-4 mr-md-4">
            Es bueno para fortalecer toda la musculatura del cuerpo. Se han añadido materiales
            a las clases de Pilates con el objetivo de aumentar la intensidad y variedad de los ejercicios.
          </h5>
        </div>
        <div class="col-lg">
          <img src="../assets/undraw_meditation_re_gll0.svg" height="120" class="m-4">
          <h3 class="font-weight-bold">Pilates Terapéutico</h3>
          <h5 class="ml-md-4 mr-md-4">
            Para aquellas personas con alguna lesión o patología que quieran fortalecer su cuerpo sin dañarlo,
            o simplemente quieran obtener un control integral de su cuerpo y cuidarse.
          </h5>
        </div>
      </div>
    </div>

    <div id="paid-page" class="d-flex justify-content-center align-items-center">
      <div class="card">
        <h1>35€</h1>
        <img src="../assets/undraw_personal_trainer_re_cnua.svg" alt="logo" class="payment_image" />
        <ul class="text-align-left mt-4">
          <li>Clases dirigidas</li>
          <li>Clases adaptadas a las capacidades</li>
          <li>Clases con los mejores materiales</li>
          <li>Mejora tu flexibilidad, fuerza y equilibrio</li>
        </ul>
        <b-button class="button mt-4" @click="pay_monthly_fee()">Pagar mensualidad</b-button>
      </div>
    </div>

    <div id="schedule" class="p-3 p-md-5">
      <div class="row">
        <div class="col-lg">
          <h2>Horario</h2>
          <b-table
            responsive
            :items="items"
            :fields="fields" >
            <!-- We are using utility class `text-nowrap` to help illustrate horizontal scrolling -->
            <template #head(id)>
              <div class="text-nowrap"></div>
            </template>
            <template #head()="scope">
              <div class="text-nowrap">
                {{ scope.label }}
              </div>
            </template>
          </b-table>
        </div>
      </div>
    </div>

    <div id="contact" v-show="!user_logued" class="p-4">
      <div class="row justify-content-center mt-3 mb-3">
        <div class="col-lg-4">
          <h2>Iniciar sesión</h2>
          <b-form>
            <b-form-input
              v-model="user.email"
              type="email"
              @change="check()"
              class="mb-2 mr-sm-2 mb-sm-2"
              placeholder="Enter Your Email">
            </b-form-input>

            <b-form-input
              v-model="user.password"
              type="password"
              @change="check()"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder="Enter Your Password">
            </b-form-input>
          </b-form>
            <p v-if="show_error">{{ error }}</p>
            <p class="pt-2">¿Aún no estás registrado? <router-link class="link-black" to="/register"> Crear cuenta </router-link></p>
            <b-button class="secondary-button" @click="login()" >Iniciar sesión</b-button>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import userServices from '@/services/userServices.js'
import shopServices from '@/services/shopServices.js'
import { mapGetters } from 'vuex'
import Footer from './Footer.vue'
export default {
  name: 'LandingPage',
  components: {
    Footer
  },
  data () {
    return {
      title: 'Más Pilates Studio',
      user: {
        email: '',
        password: ''
      },
      error: '',
      show_error: false,
      fields: [
        { key: 'id', stickyColumn: true, isRowHeader: true, variant: 'primary' },
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes'
      ],
      items: [
        { id: '8:00 - 8:50', Lunes: 'CORE', Martes: '-', Miércoles: 'CORE', Jueves: '-', Viernes: '-' },
        { id: '9:10 - 10:00', Lunes: 'PILATES', Martes: '-', Miércoles: 'PILATES', Jueves: '-', Viernes: 'ENTRENAMIENTO FUNCIONAL' },
        { id: '', Lunes: '', Martes: '', Miércoles: '', Jueves: '', Viernes: '' },
        { id: '15:30 - 16:20', Lunes: 'PILATES', Martes: 'PILATES', Miércoles: 'PILATES', Jueves: 'PILATES', Viernes: '-' },
        { id: '16:30 - 17:20', Lunes: 'PILATES TERAPÉUTICO', Martes: 'PILATES', Miércoles: 'PILATES TERAPÉUTICO', Jueves: 'CORE', Viernes: '-' },
        { id: '17:30 - 18:20', Lunes: 'PILATES', Martes: '-', Miércoles: 'PILATES', Jueves: '-', Viernes: '-' },
        { id: '18:30 - 19:20', Lunes: '-', Martes: 'PILATES', Miércoles: '-', Jueves: 'PILATES', Viernes: '-' },
        { id: '19:30 - 20:20', Lunes: 'PILATES', Martes: 'PILATES', Miércoles: 'PILATES', Jueves: 'PILATES', Viernes: '-' },
        { id: '20:30 - 21:20', Lunes: 'PILATES', Martes: '-', Miércoles: 'PILATES', Jueves: '-', Viernes: '-' }
      ]
    }
  },
  created () {
  },
  computed: {
    ...mapGetters({ user_logued: 'user_logued' })
  },
  methods: {
    check () {
      if (this.user.email !== '' && this.user.email !== undefined &&
      this.user.password !== '' && this.user.password !== undefined) {
        this.error = 'Todos los campos son obligatorios'
        return false
      } else return true
    },
    pay_monthly_fee () {
      if (!this.user_logued) {
        this.$router.push('/register')
      } else {
        shopServices.pay_monthly_fee(this.user_logued.email)
          .then(response => {
            const a = document.createElement('a')
            a.href = response.response
            a.click()
          })
          .catch((error) => {
            console.error(error)
          })
      }
    },
    login () {
      this.loading = true
      userServices.login(this.user)
        .then(response => {
          if (response.response === 'Incorrect password' || response.response === 'Invalid credentials') {
            this.showError = true
            this.error = response.response
          } else {
            this.$store.commit('set_user', response.response)
            this.show_login = false
            this.$router.go(0)
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/assets/varibles';

  #home-page {
    background: url('../assets/landing_bg.jpg') no-repeat center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  #paid-page {
    background-color: $third-color;
    height: 87vh ;
  }

  .card {
    border-radius: 25px;
    width: 30em;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    background: #fff;
    padding: 20px;
    align-items: center;
  }

  @media(max-width: 850px) {
    .card {
      width: 30em;
    }
  }

  @media(max-width: 720px) {
    .card {
      width: 20em;
    }
  }

  ul {
    list-style: none;
  }
  ul li {
    font-weight: 600;
  }

  .payment_image {
    width: 150px;
    height: 150px;
  }
  #about {
    min-height: 40vh;
  }
  #schedule {
    background-color: $primary-color;
  }
  #contact {
    background-color: $third-color;
  }

</style>
