<template>
  <div class="container-fluid m-0 p-0">
    <div class="p-4 d-flex align-items-center">
      <div class="container registro content">
        <b-overlay :show="loading" rounded="sm">
          <b-card :aria-hidden="loading ? 'true' : null" class="p-4 d-flex align-items-center card" no-body>
            <b-card-header>
              <h3>Calendario</h3>
            </b-card-header>
            <b-card-body class="d-flex col-12">
              <b-row class="d-flex col-12">
                <b-col class="d-flex col-12 justify-content-between">
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
                  <div class="">
                    <b-form-select
                      v-model="selected"
                      :options="typeToLabel"
                      @change="type = selected"
                      class="mb-3">
                    </b-form-select>
                  </div>
                </b-col>
                <v-calendar
                  class="calendario"
                  ref="calendar"
                  v-model="focus"
                  :events="events"
                  :event-color="getEventColor"
                  :type="type"
                  locale="es-es"
                  @click:event="showEvent"
                  @click:more="viewDay"
                  @click:date="viewDay"
                  @change="updateRange">
                </v-calendar>
              </b-row>
            </b-card-body>
          </b-card>
        </b-overlay>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarPage',
  data: () => ({
    loading: false,
    selected: 'month',
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days'
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['#42a5f5', '#4caf50', '#673ab7', '#0097a7', '#2e7d32', '#fb8c00', '#f4511e'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']
  }),
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      console.log(event.color)
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
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        // requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      const events = []
      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)
      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)
        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay
        })
      }
      this.events = events
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
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
