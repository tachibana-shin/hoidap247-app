import Vue from "vue"

Vue.use(vue => {
  vue.prototype.$notify = function(config) {
    this.$store.commit("snackbar/setMessage", config)
  }
})