import { services } from '@/services/services'
import { apiHostBaseUrl } from '@/apiHost/apiHost'

const dataServices = {
  getMessage () {
    return new Promise((resolve, reject) => {
      services.get({
        path: apiHostBaseUrl + 'users/users'
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
