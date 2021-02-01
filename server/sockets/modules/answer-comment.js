const addAnswerComment = require("@helper/addAnswerComment")
const getAnswerComment = require("@helper/getAnswerComment")
const existsComment = require("@helper/existsComment")

module.exports = (socket, io) => {
  const req = socket.request
  socket.on("answer-comment", async body => {
    if (socket.user) {
      if (await existsComment(body.uuidComment)) {
        const result = await addAnswerComment(socket.user, body, body.photo, __dirname)
        if (result) {
          io.to(socket.id).emit("answer-comment__DONE", {
            isError: false,
            id: body.uuidComment,
            message: req.$t("COMMENT_SUCCESS")
          })

          socket.emit("SERVER__newAnswer-comment", await getAnswerComment(result))
        } else {
          io.to(socket.id).emit("answer-comment__DONE", {
            isError: true,
            id: body.uuidComment,
            message: req.$t("COMMENT_FAILED")
          })
        }
      } else {
        io.to(socket.id).emit("answer-comment__DONE", {
          isError: true,
          id: body.uuidComment,
          message: req.$t("POSTER_NOT_EXISTS")
        })
      }
    } else {
      io.to(socket.id).emit("answer-comment__DONE", {
        isError: true,
        id: body.uuidComment,
        message: req.$t("REQUIRED_LOGIN")
      })
    }
  })
};