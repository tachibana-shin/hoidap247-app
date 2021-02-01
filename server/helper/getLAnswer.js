const mysql = require("@server/database")

module.exports = async (id, uuid) => {
  const likes = (await mysql.query("select uuid from likedAnswer where id = ?", [id]))[0].map(item => item.uuid)

  const liked = likes.indexOf(uuid)
  if (liked > -1) {
    likes.splice(liked, 1)
  }

  return {
    likes,
    liked: liked > -1
  }
};