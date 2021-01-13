import eruda from "eruda"
eruda.init()

import Vue from "vue"
import App from "./App"
import {
  router,
  store,
  vuetify,
  http,
  i18n
} from "./plugins"

new Vue({
  el: "#app",
  router,
  store,
  vuetify,
  i18n,
  components: { App },
  template: "<App/>"
});
