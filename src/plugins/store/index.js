import Vue from "vue"
import Vuex from "vuex"
import { snackbar } from "./modules"

Vue.use(Vuex)

export const store = Vue.store = new Vuex.Store({
  modules: {
    snackbar
  }
});