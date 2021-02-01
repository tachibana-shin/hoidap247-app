import Vue from "vue"
import axios from "axios"

axios.defaults.baseURL = process.env.NODE_ENV == "production" ? "/" : "http://localhost:3000/api"
axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (!("data" in error.response)) {
    error.response.data = {
      message: Vue.i18n.$t("labels.NETWORK_ERROR")
    }
  }

  return Promise.reject(error.response)
})
axios.interceptors.request.use(function(config) {
  config.headers["accept-language"] = Vue.i18n.locale
  return config
})

Vue.prototype.$http = axios

export const http = Vue.http = axios