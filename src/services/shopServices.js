import { services } from '@/services/services'
import { apiHostBaseUrl } from '@/apiHost/apiHost'
const prefix = 'shop'

const shopServices = {

  get_products () {
    return new Promise((resolve, reject) => {
      services.get({
        path: apiHostBaseUrl + prefix + '/get_products'
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
