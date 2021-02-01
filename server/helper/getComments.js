const mysql = require("@server/database")
const getLikerAndCommerInComment = require("./getLikerAndCommerInComment")
const getBaseUser = require("./getBaseUser")

module.exports = async ({
  page = 1,
  idPoster,
  lastCommentId
}, uuid) => {
  try {
    return await Promise.all((await mysql.query(`
        select comments.id,
          comments.uuidPoster,
          comments.contents,
          comments.url,
          comments.uuid,
          comments.lastModifier,
          
          users.uuid,
          users.name,
          users.avatar
        from comments, users
        where users.uuid = comments.uuid  ${lastCommentId ? "and comments.id < ?" : ""} and comments.uuidPoster = ?
        order by comments.lastModifier desc limit 20 
        ${lastCommentId ? "" : "offset ?"}`, [
          ...lastCommentId ? [] : [idPoster],
          lastCommentId || (page - 1) * 20,
          ...lastCommentId ? [idPoster] : []
        ]))[0]
      .map(async post => {
        const likeAndComment = await getLikerAndCommerInComment(post.id, uuid)

        return {
          ...post,
          answer: likeAndComment.comments.length ? {
            ...await getBaseUser(likeAndComment.comments[0]),
            count: likeAndComment.comments.length
          } : null,
          likes: likeAndComment.likes.length,
          liked: likeAndComment.liked
        }
      }))
  } catch (e) {
    console.log(e)
    return null
  }
};