<template>
  <div class="container-fluid m-0 p-0">
    <div id="home-page" class="full-height p-4 d-flex align-items-center">
      <div class="container">
        <h1 class="display-3 first-title">{{ title }}</h1>
        <h3 class="second-title mt-3">Entrena con nosotros</h3>
        <b-button class="primary-button p-3 mt-5 pr-4" href="#about">
          Saber más
        </b-button>
      </div>
    </div>

    <div id="about" class="bg-light p-3 p-md-5">
      <div class="row">
        <div class="col-lg">
          <img src="../assets/header_t.png" height="120" class="m-4">
          <h5 class="ml-md-4 mr-md-4">
            Plan your next adventure by setting a daily spending budget.
            We make it easy to break your expenses down by category,
            giving you more time to plan the important tings!
          </h5>
        </div>
        <div class="col-lg">
          <img src="../assets/header_t.png" height="120" class="m-4">
          <h5 class="ml-md-4 mr-md-4">
            Use the app to track how much money you’ve saved towards your trips
            total budgeted goal. Know exactly how much more you need to save,
            and how much time you have left to save.
          </h5>
        </div>
        <div class="col-lg">
          <!-- Icon made by Freepik perfect from www.flaticon.com -->
          <img src="../assets/header_t.png" height="120" class="m-4">
          <h5 class="ml-md-4 mr-md-4">
            When the day of your trip comes, have the peace of mind that you
            planned out your expenses. Never worry about money on a trip again!
          </h5>
        </div>
      </div>
    </div>

    <div id="contact" class="p-4">
      <div class="row justify-content-center mt-3 mb-3">

        <div v-if="show_contact == true" class="col-lg-4">
          <h2>Iniciar sesión</h2>

          <div v-if="contact_notice != ''" class="alert alert-warning">
            There was a problem submitting your message. {{contact_notice}}
          </div>
          <b-form>
            <b-form-input
              type="email"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder="Enter Your Email">
            </b-form-input>

            <b-form-input
              type="password"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder="Enter Your Password">
            </b-form-input>
          </b-form>
            <p class="pt-2">¿Aún no estás registrado? <a href="#" class="enlace-black"> Crear cuenta </a></p>
            <b-button class="secondary-button">Iniciar sesión</b-button>
        </div>

        <div v-else>
          <h3>Message Sent Successfully!</h3>
          <p>Thank you for contacting us, we'll get back to you as soon as we can.</p>
        </div>
      </div>

    </div>

    <div id="footer" class=" p-4">
      <footer class="text-light p-4">
        <a
          href="https://www.google.es/maps/place/Mas+Pilates/@38.3873668,-0.7737453,17z/data=!3m1!4b1!4m5!3m4!1s0xd63c7cb6dc73f87:0x601a1bd0184fcbfc!8m2!3d38.3873228!4d-0.7715365?hl=es"
          target="_blank" class="enlace">Calle Tirso Molina 54</a> |
        <a href="tel:+34607722863" class="enlace">607 72 28 63</a>
        <br>
        <small>&copy; 2022, Más Pilates Studio</small>
      </footer>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LandingPage',
  data () {
    return {
      title: 'Más Pilates Studio',
      email: '',
      message: '',
      show_contact: true,
      contact_email: '',
      contact_message: '',
      contact_notice: ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/assets/varibles';

  #home-page {
    background: url('../assets/landing_bg.jpg') no-repeat center center;
    // filter : brightness(50%);
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  #about {
    min-height: 40vh;
  }
  #contact {
    background-color: $third-color;
  }
  #footer {
    background-color: $secondary-color;
  }

/*
@media(max-width: 850px) {
  .img-landing {
    height: 40% !important;
  }
} */

</style>
