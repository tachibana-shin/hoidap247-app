const mysql = require("@server/database")
const getLAnswer = require("@helper/getLAnswer")

module.exports = async id => {
  try {
    return (await Promise.all((await mysql.query(`
        select commentsInComment.id,
          commentsInComment.uuidComment,
          commentsInComment.contents,
          commentsInComment.url,
          commentsInComment.uuid,
          commentsInComment.lastModifier,
          
          users.uuid,
          users.name,
          users.avatar
        from commentsInComment, users
        where users.uuid = commentsInComment.uuid and commentsInComment.id = ? limit 1 `, [id]))[0]
      .map(async anst => {
        const { likes, liked } = await getLAnswer(anst.id)
        return {
          ...anst,
          likes: likes.length,
          liked: liked
        }
      })))[0]

  } catch (e) {
    console.log(e)
    return null
  }
};