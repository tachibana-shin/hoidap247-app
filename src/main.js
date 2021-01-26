import eruda from "eruda2"

import Vue from "vue"
import App from "./App"
import {
  router,
  store,
  vuetify,
  i18n
} from "./plugins"
eruda.init()

new Vue({
  el: "#app",
  router,
  store,
  vuetify,
  i18n,
  components: { App },
  template: "<App/>"
});
