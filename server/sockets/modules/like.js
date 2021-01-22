const setLike = require("@helper/setLike")
const getLikerAndCommer = require("@helper/getLikerAndCommer")
const isLike = require("@helper/isLike")

module.exports = (socket, io) => {
  socket.on("like", async ({ id, value }) => {
    //socket.emit("updateLikeAndComment", )
    if (socket.user && await setLike(id, socket.user.uuid, value)) {
      const { likes, comments } = await getLikerAndCommer(id)

      socket.emit("updateLikeAndComment", {
        id,
        likes: likes.length,
        comments: comments.length
      })
      io.to(socket.id).emit("likeDone", {
        id,
        value: await isLike(id, socket.user.uuid)
      })
    } else {
      io.to(socket.id).emit("error")
    }
  })
};