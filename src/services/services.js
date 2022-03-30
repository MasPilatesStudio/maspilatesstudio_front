/* eslint-disable no-async-promise-executor */
import axios from 'axios'

export const services = {
  get ({ path, params, header, auth, responseType }) {
    return new Promise(async function (resolve, reject) {
      axios.get(path,
        {
          auth: auth,
          params: params,
          responseType: responseType,
          headers: header
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  post ({ url, data, header }) {
    return new Promise(async function (resolve, reject) {
      axios.post(url, data,
        {
          headers: header
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  put ({ url, data, header }) {
    return new Promise(async function (resolve, reject) {
      axios.put(url, data,
        {
          headers: header
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  delete ({ url, params }) {
    return new Promise(async function (resolve, reject) {
      axios.delete(url, { params: params })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
