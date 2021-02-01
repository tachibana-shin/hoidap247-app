const existsComment = require("@helper/existsComment")
const setLikeComment = require("@helper/setLikeComment")
const getLikesAndComments = require("@helper/getLikerAndCommerInComment")

module.exports = (socket, io) => {
  const req = socket.request
  socket.on("like-comment", async ({ id, value }) => {
    if (socket.user) {
      if (await existsComment(id)) {
        if (await setLikeComment(id, socket.user.uuid, value)) {
          io.to(socket.id).emit("like-comment__DONE", {
            isError: false,
            id,
            value,
            message: req.$t("LIKE_SUCCESS")
          })

          socket.emit("SERVER__updateLikes-comment", {
            id,
            value: (await getLikesAndComments(id, socket.user.uuid)).comments.length
          })
        } else {
          io.to(socket.id).emit("like-comment__DONE", {
            isError: true,
            id,
            value,
            message: req.$t("LIKE_FAILED")
          })
        }
      } else {
        io.to(socket.id).emit("like-comment__DONE", {
          isError: true,
          value,
          id,
          message: req.$t("COMMENT_NOT_EXISTS")
        })
      }
    } else {
      io.to(socket.id).emit("like-comment__DONE", {
        isError: true,
        id,
        value,
        message: req.$t("REQUIRED_LOGIN")
      })
    }
  })
};