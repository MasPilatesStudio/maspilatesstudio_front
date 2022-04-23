import { services } from '@/services/services'
import { apiHostBaseUrl } from '@/apiHost/apiHost'

const dataServices = {
  register (user) {
    return new Promise((resolve, reject) => {
      services.post({
        url: apiHostBaseUrl + 'users/register',
        data: {
          user: user
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
