const addComment = require("@helper/addComment")
const getComment = require("@helper/getComment")
const existsPoster = require("@helper/existsPoster")
const getLikerAndCommer = require("@helper/getLikerAndCommer")

module.exports = (socket, io) => {
  const req = socket.request
  socket.on("comment", async body => {
    if (socket.user) {
      if (await existsPoster(body.uuidPoster)) {
        const result = await addComment(socket.user, body, body.photo, __dirname)
        if (result) {
          io.to(socket.id).emit("comment__DONE", {
            isError: false,
            id: body.uuidPoster,
            message: req.$t("COMMENT_SUCCESS")
          })

          socket.emit("SERVER__updateComments", {
            id: body.uuidPoster,
            value: (await getLikerAndCommer(body.uuidPoster)).comments.length
          })

          socket.emit("SERVER__newComment", await getComment(result))
        } else {
          io.to(socket.id).emit("comment__DONE", {
            isError: true,
            id: body.uuidPoster,
            message: req.$t("COMMENT_FAILED")
          })
        }
      } else {
        io.to(socket.id).emit("comment__DONE", {
          isError: true,
          id: body.uuidPoster,
          message: req.$t("POSTER_NOT_EXISTS")
        })
      }
    } else {
      io.to(socket.id).emit("comment__DONE", {
        isError: true,
        id: body.uuidPoster,
        message: req.$t("REQUIRED_LOGIN")
      })
    }
  })
};