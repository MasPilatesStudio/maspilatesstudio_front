import { services } from '@/services/services'
import { apiHostBaseUrl } from '@/apiHost/apiHost'
const prefix = 'shop'

const shopServices = {

  get_products (filters, currentPage, perPage, userLogued) {
    return new Promise((resolve, reject) => {
      services.post({
        url: apiHostBaseUrl + prefix + '/get_products',
        data: {
          filters,
          currentPage,
          perPage,
          userLogued
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
  get_count_products (filters, userLogued) {
    return new Promise((resolve, reject) => {
      services.post({
        url: apiHostBaseUrl + prefix + '/get_count_products',
        data: {
          filters,
          userLogued
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
  },
  get_shopping_cart (email) {
    return new Promise((resolve, reject) => {
      services.get({
        path: apiHostBaseUrl + prefix + '/get_shopping_cart/' + email
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  get_count_shopping_cart (email) {
    return new Promise((resolve, reject) => {
      services.get({
        path: apiHostBaseUrl + prefix + '/get_count_shopping_cart/' + email
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  add_to_shopping_cart (productId, email) {
    return new Promise((resolve, reject) => {
      services.post({
        url: apiHostBaseUrl + prefix + '/add_to_shopping_cart',
        data: {
          productId: productId,
          email: email
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
  add_product (product) {
    return new Promise((resolve, reject) => {
      services.post({
        url: apiHostBaseUrl + prefix + '/add_product',
        data: {
          product: product
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
  delete_product (email, product) {
    return new Promise((resolve, reject) => {
      services.put({
        url: apiHostBaseUrl + prefix + '/delete_product',
        data: {
          email: email,
          product: product
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
  saveOrder (email, products) {
    return new Promise((resolve, reject) => {
      services.post({
        url: apiHostBaseUrl + prefix + '/add_order',
        data: {
          products: products,
          email: email
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
  disabledProduct (productId, xtiActivo) {
    return new Promise((resolve, reject) => {
      services.post({
        url: apiHostBaseUrl + prefix + '/disabled_product',
        data: {
          product_id: productId,
          xti_activo: xtiActivo
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
  getOrders (user) {
    return new Promise((resolve, reject) => {
      services.post({
        url: apiHostBaseUrl + prefix + '/get_orders',
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
  changeOrderState (orderId, state) {
    return new Promise((resolve, reject) => {
      services.post({
        url: apiHostBaseUrl + prefix + '/change_order_state',
        data: {
          order_id: orderId,
          state: state
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
  pay_monthly_fee (email) {
    return new Promise((resolve, reject) => {
      services.post({
        url: apiHostBaseUrl + prefix + '/pay_monthly_fee',
        data: {
          email: email
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
export default shopServices
