const socketIo = require("socket.io")
const i18n = require("@server/i18n")

module.exports = server => {
  const io = socketIo(server, {
    cors: {
      origin: "*"
    },
    debug: "*"
  })

  io.on("connection", socket => {
    const req = socket.request
    i18n.init(req)

    console.log("User connected")
    socket.on("disconnect", () => {
      console.log("User disconnected")
    })

    require("./modules/auth")(socket, io)
    require("./modules/like")(socket, io)
    require("./modules/newPoster")(socket, io)
    require("./modules/comment")(socket, io)
    require("./modules/like-comment")(socket, io)
  })
};