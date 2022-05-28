import { services } from '@/services/services'
import { apiHostBaseUrl } from '@/apiHost/apiHost'
const prefix = 'shop'

const shopServices = {

  get_products (filters) {
    return new Promise((resolve, reject) => {
      services.post({
        url: apiHostBaseUrl + prefix + '/get_products',
        data: {
          filters
        }
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  get_categories () {
    return new Promise((resolve, reject) => {
      services.get({
        path: apiHostBaseUrl + prefix + '/get_categories'
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  get_brands () {
    return new Promise((resolve, reject) => {
      services.get({
        path: apiHostBaseUrl + prefix + '/get_brands'
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
export default shopServices
