const mysql = require("@server/database")

module.exports = async (id, uuid) => {
  const [likes, comments] = await Promise.all([
    mysql.query("select uuid from likedInComment where uuidComment = ?", [id]),
    mysql.query("select uuid from commentsInComment where uuidComment = ? order by lastModifier desc", [id])
  ])

  let likesName = likes[0].map(item => item.uuid)
  const liked = likesName.indexOf(uuid)
  
  if (liked > -1) {
    likesName.splice(liked, 1)
  }

  return {
    likes: likesName,
    comments: comments[0].map(item => item.uuid),
    liked: liked > -1
  }
};