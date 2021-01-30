const eventStore = require("@server/eventStore")

module.exports = (socket, io) => {
  eventStore.on("newPost", () => {
    if (socket.id) {
      socket.broadcast.emit("newPost")
    }
  })
};