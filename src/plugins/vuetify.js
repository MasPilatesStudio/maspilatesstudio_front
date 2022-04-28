import Vue from 'vue'
import Vuetify, { VCalendar } from 'vuetify/lib'

Vue.use(Vuetify, {
  components: {
    VCalendar
  }
})

const opts = {}

export default new Vuetify(opts)
