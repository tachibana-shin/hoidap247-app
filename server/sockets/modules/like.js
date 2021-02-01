const setLike = require("@helper/setLike")
const getLikerAndCommer = require("@helper/getLikerAndCommer")
const existsPoster = require("@helper/existsPoster")

module.exports = (socket, io) => {
  const req = socket.request
  socket.on("like", async ({ id, value }) => {
    if (socket.user) {
      if (await existsPoster(id)) {
        if (await setLike(id, socket.user.uuid, value)) {
          io.to(socket.id).emit("like__DONE", {
            isError: false,
            id,
            value,
            message: req.$t("LIKE_SUCCESS")
          })

          socket.emit("SERVER__updateLikes", {
            id,
            value: (await getLikerAndCommer(id, socket.user.uuid)).likes.length
          })
        } else {
          io.to(socket.id).emit("like__DONE", {
            isError: true,
            id,
            value,
            message: req.$t("LIKE_FAILED")
          })
        }
      } else {
        io.to(socket.id).emit("like__DONE", {
          isError: true,
          value,
          id,
          message: req.$t("COMMENT_NOT_EXISTS")
        })
      }
    } else {
      io.to(socket.id).emit("like__DONE", {
        isError: true,
        id,
        value,
        message: req.$t("REQUIRED_LOGIN")
      })
    }
  })
}