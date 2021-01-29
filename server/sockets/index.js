const socketIo = require("socket.io")
const addComment = require("@helper/addComment")
const getComment = require("@helper/getComment")
const existsPoster = require("@helper/existsPoster")
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
    socket.on("sendComment", async body => {
      if (socket.user) {
        if (await existsPoster(body.uuidPoster)) {
          const result = await addComment(socket.user, body, body.photos, __dirname)
          if (result) {
            io.to(socket.id).emit("sendComment__DONE", {
              id: body.uuidPoster,
              message: req.$t("COMMENT_SUCCESS")
            })
            const newCommentAppended = await getComment(result)
            socket.emit("newComment", newCommentAppended)
          } else {
            io.to(socket.id).emit("sendComment__DONE", {
              id: body.uuidPoster,
              message: req.$t("COMMENT_FAILED")
            })
          }
        } else {
          io.to(socket.id).emit("sendComment__DONE", {
            isError: true,
            id: body.uuidPoster,
            message: req.$t("POSTER_NOT_EXISTS")
          })
        }
      } else {
        io.to(socket.id).emit("sendComment__DONE", {
          isError: true,
          id: body.uuidPoster,
          message: req.$t("REQUIRED_LOGIN")
        })
      }
    })
  })
};