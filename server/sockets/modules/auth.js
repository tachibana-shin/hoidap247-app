const getUser = require("@helper/getUser")

module.exports = (socket, io) => {
  socket.user = null
  socket.on("disconnect", socket => {
    socket.user = null
  })
  socket.on("authorizer", async token => {
    if (token) {
      try {
        socket.user = await getUser(token)
      } catch (e) {
        socket.user = null
      }
    } else {
      socket.user = null
    }
    io.to(socket.id).emit("authorized")
  })
};