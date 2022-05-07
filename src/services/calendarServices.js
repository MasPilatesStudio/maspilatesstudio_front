import { services } from '@/services/services'
import { apiHostBaseUrl } from '@/apiHost/apiHost'
const prefix = 'calendar'

const dataServices = {

  get_schedule () {
    return new Promise((resolve, reject) => {
      services.get({
        path: apiHostBaseUrl + prefix + '/schedule'
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  },

  book_class (book) {
    console.log(book)
    return new Promise((resolve, reject) => {
      services.post({
        url: apiHostBaseUrl + prefix + '/book_class',
        data: {
          book: book
        }
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}
export default dataServices
