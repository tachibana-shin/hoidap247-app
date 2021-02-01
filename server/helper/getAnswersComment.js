const mysql = require("@server/database")
const getLAnswer = require("@helper/getLAnswer")

module.exports = async ({
  page = 1,
  idComment,
  firstId
}, uuid) => {
  try {
    const answers = await Promise.all((await mysql.query(`
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
        where users.uuid = commentsInComment.uuid  ${firstId ? "and commentsInComment.id < ?" : ""} and commentsInComment.uuidComment = ?
        order by commentsInComment.lastModifier desc limit 21 
        ${firstId ? "" : "offset ?"}`, [
          ...firstId ? [] : [idComment],
          firstId || (page - 1) * 20,
          ...firstId ? [idComment] : []
        ]))[0]
      .map(async anst => {
        const { likes, liked } = await getLAnswer(anst.id)
        return {
          ...anst,
          likes: likes.length,
          liked: liked
        }
      }))

    if (answers.length < 21) {
      return {
        answers: answers.reverse(),
        existsMore: false
      }
    } else {
      return {
        answers: answers.slice(0, -1).reverse(),
        existsMore: true
      }
    }
  } catch (e) {
    console.log(e)
    return null
  }
};