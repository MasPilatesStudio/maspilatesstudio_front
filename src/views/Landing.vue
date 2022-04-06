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
          <!-- Icon made by Freepik perfect from www.flaticon.com -->
          <img src="../assets/undraw_meditation_re_gll0.svg" height="120" class="m-4">
          <h3 class="font-weight-bold">Pilates Terapéutico</h3>
          <h5 class="ml-md-4 mr-md-4">
            Para aquellas personas con alguna lesión o patología que quieran fortalecer su cuerpo sin dañarlo,
            o simplemente quieran obtener un control integral de su cuerpo y cuidarse.
          </h5>
        </div>
      </div>
    </div>
    <div id="schedule" class="p-3 p-md-5">
      <div class="row">
        <div class="col-lg">
          <h2>Horario</h2>
          <b-table
            :sticky-header="stickyHeader"
            :no-border-collapse="noCollapse"
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
              class="mb-2 mr-sm-2 mb-sm-2"
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
      contact_notice: '',
      fields: [
        { key: 'id', stickyColumn: true, isRowHeader: true, variant: 'primary' },
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes'
        // { key: 'c', stickyColumn: true, variant: 'info' },
        // 'k',
        // 'l'
      ],
      items: [
        { id: '8:00 - 8:50', Lunes: 'PILATES', Martes: '-', Miércoles: 'PILATES', Jueves: '-', Viernes: '-' },
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
  #schedule {
    background-color: $primary-color;
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
