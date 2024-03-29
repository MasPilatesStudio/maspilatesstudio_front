import { services } from '@/services/services'
import { apiHostBaseUrl } from '@/apiHost/apiHost'
const prefix = 'users'

const dataServices = {

  register (user) {
    return new Promise((resolve, reject) => {
      services.post({
        url: apiHostBaseUrl + prefix + '/register',
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
  },
  add_employee (employee) {
    return new Promise((resolve, reject) => {
      services.post({
        url: apiHostBaseUrl + prefix + '/add_employee',
        data: {
          employee: employee
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
  update_send_direction (user) {
    return new Promise((resolve, reject) => {
      services.post({
        url: apiHostBaseUrl + prefix + '/update_send_direction',
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
  },
  get_user (email) {
    return new Promise((resolve, reject) => {
      services.get({
        path: apiHostBaseUrl + prefix + '/get_user/' + email
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  login (user) {
    return new Promise((resolve, reject) => {
      services.post({
        url: apiHostBaseUrl + prefix + '/login',
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
  },
  logout () {
    return new Promise((resolve, reject) => {
      services.get({
        path: apiHostBaseUrl + prefix + '/logout'
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
