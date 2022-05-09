// Función para calcular los días transcurridos entre dos fechas
const utils = {

  difDates (f1, f2) {
    const dif = f2 - f1
    const dias = Math.floor(dif / (1000 * 60 * 60 * 24))
    return dias
  },

  getDatestr (date) {
    const formattedDate = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear()
    return formattedDate
  },

  getDatestrHours (date) {
    const formattedDate = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2)
    return formattedDate
  },

  getDateStrBooks (date) {
    return this.getDatestr(date) + ' ' + this.getDatestrHours(date) + ':00'
  },

  strToDate (dtStr) {
    if (!dtStr) return null
    const dateParts = dtStr.split('-')
    const timeParts = dateParts[2].split(' ')[1].split(':')
    dateParts[2] = dateParts[2].split(' ')[0]
    // month is 0-based, that's why we need dataParts[1] - 1
    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0], timeParts[0], timeParts[1], timeParts[2])
    return dateObject
  }
}

export default utils
