const evenStore = require("@server/eventStore")

module.exports = (socket, io) => {
  eventStore.on("newPost", () => socket.emit("newPost"))
};