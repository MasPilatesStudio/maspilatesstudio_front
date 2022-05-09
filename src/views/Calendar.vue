<template>
  <div class="container-fluid content p-0">
    <div v-if="loading">
      <b-spinner style="width: 3rem; height: 3rem;" variant="info"></b-spinner>
    </div>
    <div class="pr-3 pl-3" v-else>
      <h3>Calendario</h3>
      <b-col class="d-flex col-12 mb-2 justify-content-between">
        <div class="d-flex align-items-center">
          <b-icon
            class="pointer"
            icon="chevron-compact-left"
            @click="prev()"/>
          <p v-if="$refs.calendar" class="m-2 mb-0">{{ $refs.calendar.title }}</p>
            <b-icon
              class="pointer"
              icon="chevron-compact-right"
              @click="next()"/>
        </div>
        <div>
          <b-form-select
            v-model="selected"
            :options="typeToLabel"
            @change="type = selected">
          </b-form-select>
        </div>
      </b-col>
      <v-calendar
        class="calendario mb-4"
        ref="calendar"
        v-model="focus"
        :events="events"
        :event-color="getEventColor"
        :type="type"
        :first-interval= 7
        :interval-count= 15
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :weekdays="weekday"
        locale="es-es"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:date="viewDay"
        @change="assignEvents">
      </v-calendar>
    </div>
    <b-modal ref="modal-scoped"
      centered>
      <template #modal-header="{ }">
        <!-- Emulate built in modal header close button action -->
        <h5>{{ selectedEvent.name }}</h5>
      </template>

      <template #default="{  }">
        <p><b>Hora: </b>{{ hour }}</p>
        <p><b>Profesora: </b>{{ selectedEvent.teacher }}</p>
      </template>

      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="info" @click="book_class()">
          RESERVAR
        </b-button>
        <b-button size="sm" variant="outline-danger" @click="cancel()">
          CANCELAR
        </b-button>
      </template>
    </b-modal>
    <Footer />
  </div>
</template>

<script>
import calendarServices from '@/services/calendarServices.js'
import constants from '@/utils/constants.js'
import utils from '@/utils/utils.js'
import Footer from './Footer.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'CalendarPage',
  components: {
    Footer
  },
  data: () => ({
    loading: true,
    loadingSchedule: true,
    loadingBooks: true,
    mode: 'stack',
    selected: 'week',
    focus: '',
    type: 'week',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days'
    },
    weekday: [1, 2, 3, 4, 5],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    color: {
      PILATES: '#00acc1',
      CORE: '#7986cb',
      'ENT. FUNCIONAL': '#90d142',
      'P. TERAPÉUTICO': '#f56564'
    },
    names: ['PILATES', 'PILATES TERAPÉUTICO', 'CORE', 'ENTRENAMIENTO FUNCIONAL'],
    schedule: [],
    books: [],
    modal: {
      event: false
    },
    hour: ''
  }),
  mounted () {
    this.get_schedule()
    this.get_books()
  },
  created () {
  },
  computed: {
    ...mapGetters({ user_logued: 'user_logued' })
  },
  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    getHour () {
      this.hour = constants.weekdays[this.selectedEvent.day] + ' ' +
        this.selectedEvent.start.getDay() + ', ' + utils.getDatestrHours(this.selectedEvent.start) + ' - ' +
        utils.getDatestrHours(this.selectedEvent.end)
    },
    showEvent ({ event }) {
      this.selectedEvent = event
      this.modal.event = true
      this.getHour()
      this.$refs['modal-scoped'].show()
    },
    // updateRange ({ start, end }) {
    //   const events = []
    //   const min = new Date(`${start.date}T00:00:00`)
    //   const max = new Date(`${end.date}T23:59:59`)
    //   const days = (max.getTime() - min.getTime()) / 864000000
    //   const eventCount = this.rnd(days, days + 20)
    //   for (let i = 0; i < eventCount; i++) {
    //     const allDay = this.rnd(0, 3) === 0
    //     const firstTimestamp = this.rnd(min.getTime(), max.getTime())
    //     const first = new Date(firstTimestamp - (firstTimestamp % 900000))
    //     const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
    //     const second = new Date(first.getTime() + secondTimestamp)
    //     events.push({
    //       name: this.names[this.rnd(0, this.names.length - 1)],
    //       start: first,
    //       end: second,
    //       color: this.colors[this.rnd(0, this.colors.length - 1)],
    //       timed: !allDay
    //     })
    //   }
    //   this.events = events
    // },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    get_books () {
      calendarServices.get_books(this.user_logued.email)
        .then(response => {
          if (response.Items.length > 0) {
            this.books = response.Items
            this.loadingBooks = false
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.checkLoading()
        })
    },
    get_schedule () {
      calendarServices.get_schedule()
        .then(response => {
          if (response.Items.length > 0) {
            this.schedule = response.Items
            this.loadingSchedule = false
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
      if (!this.loadingSchedule && !this.loadingBooks) {
        this.loading = false
      }
    },
    book_class () {
      this.loading = true
      const aux = {
        name: this.selectedEvent.name,
        start: utils.getDatestr(this.selectedEvent.start) + ' ' + utils.getDatestrHours(this.selectedEvent.start) + ':00',
        end: utils.getDatestr(this.selectedEvent.end) + ' ' + utils.getDatestrHours(this.selectedEvent.end) + ':00'
      }

      calendarServices.book_class(aux, this.user_logued.email)
        .then(response => {
          if (response.response === 'OK') {
            this.$refs['modal-scoped'].hide()
            this.$router.go(0)
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
    checkIsBooked () {
      this.events.forEach(element => {
        this.books.forEach(item => {
          const aux = new Date(item.start_date)
          aux.setHours(aux.getHours() - 2)
          if (utils.getDateStrBooks(new Date(element.start)) === utils.getDateStrBooks(aux)) {
            element.name += ' - RESERVADO'
          }
        })
      })
    },
    assignEvents ({ start, end }) {
      this.$refs.calendar.checkChange()
      const events = []
      const fecInicio = new Date(`${start.date}T00:00:00`)
      const fecFin = new Date(`${end.date}T23:59:59`)
      const aux = fecInicio

      for (let index = 0; index <= utils.difDates(fecInicio, fecFin) + 4; index++) {
        if (aux.getDay() === 1) {
          const monday = this.schedule.filter(obj => obj.weekday === 'LUNES')
          monday.forEach(element => {
            const obj = {
              name: element.name,
              start: utils.strToDate(utils.getDatestr(fecInicio) + ' ' + element.start_hour + ':00'),
              end: utils.strToDate(utils.getDatestr(fecInicio) + ' ' + element.end_hour + ':00'),
              color: this.color[element.name],
              timed: true,
              day: element.weekday,
              teacher: element.teacher
            }
            events.push(obj)
          })
        } else if (aux.getDay() === 2) {
          const tuesday = this.schedule.filter(obj => obj.weekday === 'MARTES')
          tuesday.forEach(element => {
            const obj = {
              name: element.name,
              start: utils.strToDate(utils.getDatestr(fecInicio) + ' ' + element.start_hour + ':00'),
              end: utils.strToDate(utils.getDatestr(fecInicio) + ' ' + element.end_hour + ':00'),
              color: this.color[element.name],
              timed: true,
              day: element.weekday,
              teacher: element.teacher
            }
            events.push(obj)
          })
        } else if (aux.getDay() === 3) {
          const wednesday = this.schedule.filter(obj => obj.weekday === 'MIERCOLES')
          wednesday.forEach(element => {
            const obj = {
              name: element.name,
              start: utils.strToDate(utils.getDatestr(fecInicio) + ' ' + element.start_hour + ':00'),
              end: utils.strToDate(utils.getDatestr(fecInicio) + ' ' + element.end_hour + ':00'),
              color: this.color[element.name],
              timed: true,
              day: element.weekday,
              teacher: element.teacher
            }
            events.push(obj)
          })
        } else if (aux.getDay() === 4) {
          const thursday = this.schedule.filter(obj => obj.weekday === 'JUEVES')
          thursday.forEach(element => {
            const obj = {
              name: element.name,
              start: utils.strToDate(utils.getDatestr(fecInicio) + ' ' + element.start_hour + ':00'),
              end: utils.strToDate(utils.getDatestr(fecInicio) + ' ' + element.end_hour + ':00'),
              color: this.color[element.name],
              timed: true,
              day: element.weekday,
              teacher: element.teacher
            }
            events.push(obj)
          })
        } else if (aux.getDay() === 5) {
          const friday = this.schedule.filter(obj => obj.weekday === 'VIERNES')
          friday.forEach(element => {
            const obj = {
              name: element.name,
              start: utils.strToDate(utils.getDatestr(fecInicio) + ' ' + element.start_hour + ':00'),
              end: utils.strToDate(utils.getDatestr(fecInicio) + ' ' + element.end_hour + ':00'),
              color: this.color[element.name],
              timed: true,
              day: element.weekday,
              teacher: element.teacher
            }
            events.push(obj)
          })
        }
        aux.setDate(aux.getDate() + 1)
      }
      this.events = events
      this.checkIsBooked()
    }
  }
}
</script>
<style scoped>
.calendario {
  height: 90%;
  width: 100%;
}
</style>
