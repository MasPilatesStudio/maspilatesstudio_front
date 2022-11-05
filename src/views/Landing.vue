<template>
  <div class="container-fluid m-0 p-0">
    <div id="home-page" class="full-height p-4 d-flex align-items-center">
      <div class="container">
        <h1 class="display-3 first-title">{{ title }}</h1>
        <h3 class="second-title mt-3">Entrena con nosotros</h3>
        <b-button class="btn-cssbuttons p-3 mt-5">
          <span>Redes sociales</span>
          <span>
            <svg height="18" width="18" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" class="shere">
              <path fill="#ffffff" d="M767.99994 585.142857q75.995429 0 129.462857 53.394286t53.394286 129.462857-53.394286 129.462857-129.462857 53.394286-129.462857-53.394286-53.394286-129.462857q0-6.875429 1.170286-19.456l-205.677714-102.838857q-52.589714 49.152-124.562286 49.152-75.995429 0-129.462857-53.394286t-53.394286-129.462857 53.394286-129.462857 129.462857-53.394286q71.972571 0 124.562286 49.152l205.677714-102.838857q-1.170286-12.580571-1.170286-19.456 0-75.995429 53.394286-129.462857t129.462857-53.394286 129.462857 53.394286 53.394286 129.462857-53.394286 129.462857-129.462857 53.394286q-71.972571 0-124.562286-49.152l-205.677714 102.838857q1.170286 12.580571 1.170286 19.456t-1.170286 19.456l205.677714 102.838857q52.589714-49.152 124.562286-49.152z"></path>
            </svg>
          </span>
          <ul>
            <li>
              <a href="https://twitter.com/" target="_blank">
                <svg height="18" width="18" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" class="icon">
                  <path fill="white" d="M962.267429 233.179429q-38.253714 56.027429-92.598857 95.451429 0.585143 7.972571 0.585143 23.990857 0 74.313143-21.723429 148.260571t-65.974857 141.970286-105.398857 120.32-147.456 83.456-184.539429 31.158857q-154.843429 0-283.428571-82.870857 19.968 2.267429 44.544 2.267429 128.585143 0 229.156571-78.848-59.977143-1.170286-107.446857-36.864t-65.170286-91.136q18.870857 2.852571 34.889143 2.852571 24.576 0 48.566857-6.290286-64-13.165714-105.984-63.707429t-41.984-117.394286l0-2.267429q38.838857 21.723429 83.456 23.405714-37.741714-25.161143-59.977143-65.682286t-22.308571-87.990857q0-50.322286 25.161143-93.110857 69.12 85.138286 168.301714 136.265143t212.260571 56.832q-4.534857-21.723429-4.534857-42.276571 0-76.580571 53.979429-130.56t130.56-53.979429q80.018286 0 134.875429 58.294857 62.317714-11.995429 117.174857-44.544-21.138286 65.682286-81.115429 101.741714 53.174857-5.705143 106.276571-28.598857z"></path>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/maspilates/?hl=es" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="icon" viewBox="0 0 16 16">
                  <path fill="white" d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://wa.me/607722863" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="icon" viewBox="0 0 16 16">
                  <path fill="white" d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
                </svg>
              </a>
            </li>
          </ul>
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
            <b-alert
              class="mt-2"
              variant="danger"
              fade
              dismissible
              :show="show_error">
              {{ error }}
            </b-alert>
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
      if (this.user.email !== '' && this.user.password !== '') {
        userServices.login(this.user)
          .then(response => {
            if (response.response === 'Incorrect password' || response.response === 'Invalid credentials') {
              this.show_error = true
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
      } else {
        this.$bvToast.toast('Debe rellenar el email y la contraseña', {
          title: 'Información',
          variant: 'info',
          solid: true
        })
      }
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
