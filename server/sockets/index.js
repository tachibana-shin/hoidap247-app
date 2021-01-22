const socketIo = require("socket.io")
const auth = require("./modules/auth")
const like = require("./modules/like")
const newPoster = require("./modules/newPoster")

module.exports = server => {
  const io = socketIo(server, {
    cors: {
      origin: "*"
    }
  })

  io.on("connection", socket => {
    console.log("User connected")
    socket.on("disconnect", () => {
      console.log("User disconnected")
    })

    auth(socket, io)
    like(socket, io)
    newPoster(socket, io)
  })
};