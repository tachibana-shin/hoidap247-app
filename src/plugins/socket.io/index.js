import Vue from "vue"
import VueSocketIOExt from "vue-socket.io-extended"
import io from "socket.io-client"

const socket = io(process.env.NODE_ENV == "production" ? "/" : "http://localhost:3000", {
  debug: true
})

Vue.use(VueSocketIOExt, socket);