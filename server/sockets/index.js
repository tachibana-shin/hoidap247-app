const socketIo = require("socket.io")
const checkUser = require("@helper/modules/checkUser")
module.exports = server => {
  const io = socketIo(server, {
    cors: {
      origin: "*"
    }
  })

  io.on("connection", socket => {
    console.log("User connected")
    let user = null
    socket.on("disconnect", () => {
      console.log("User disconnected")
      user = null
    })
    socket.on("login", async token => {
      user = await checkUser(token)
      console.log(user, " logged")
    })
    socket.on("upPost", async (post) => {
      const result = await Helper.uploadPost(post)
      socket.emit("upPost_result", result)
      if (result.success) {
        socket.broadcast.emit("notifyNewPost")
      }
    })
  })
};