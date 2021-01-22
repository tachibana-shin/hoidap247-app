const eventStore = require("@server/eventStore")

module.exports = (socket, io) => {
  eventStore.on("newPost", () => {
    console.log("emit event ")
    if (socket.id) {
      socket.broadcast.emit("newPost")
    }
  })
};