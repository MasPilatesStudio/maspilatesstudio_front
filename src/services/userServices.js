import { services } from '@/services/services'
import { apiHostBaseUrl } from '@/apiHost/apiHost'

const dataServices = {
  addUser () {
    return new Promise((resolve, reject) => {
      services.post({
        path: apiHostBaseUrl + 'users/add_user'
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
