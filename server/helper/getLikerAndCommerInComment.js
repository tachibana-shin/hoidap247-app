const mysql = require("@server/database")

module.exports = async (id, uuid) => {
  const [likes, comments, liked] = await Promise.all([
    mysql.query("select uuid from likedInComment where uuidComment = ? and not uuid = ?", [id, uuid]),
    mysql.query("select uuid from commentsInComment where uuidComment = ? order by lastModifier desc", [id]),
    mysql.query("select uuid from likedInComment where uuidComment = ? and uuid = ? limit 1", [id, uuid])
  ])

  return {
    likes: likes[0].map(item => item.uuid),
    comments: comments[0].map(item => item.uuid),
    liked: !!liked[0][0]
  }
};