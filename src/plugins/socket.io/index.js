import Vue from "vue"
import VueSocketIOExt from 'vue-socket.io-extended'
import io from "socket.io-client"

const socket = io(process.env.NODE_ENV == "production" ? "/" : "http://localhost:3000", {
  debug: true,
  query: {
    token: "abcd"
  }
})
socket.on("error", w => console.log(w))

Vue.use(VueSocketIOExt, socket);