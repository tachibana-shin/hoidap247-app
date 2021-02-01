const mysql = require("@server/database")
const getLikerAndCommerInComment = require("./getLikerAndCommerInComment")
const getBaseUser = require("./getBaseUser")

module.exports = async (idComment, uuid) => {
  try {
    return (await Promise.all((await mysql.query(`
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
        where users.uuid = comments.uuid and comments.id = ?
        limit 1`, [idComment]))[0]
      .map(async post => {
        const likeAndComment = await getLikerAndCommerInComment(post.id, uuid)

        return {
          ...post,
          answer: likeAndComment.length ? {
            name: (await getBaseUser(likeAndComment[0]))?.name,
            count: likeAndComment.comments.length
          } : null,
          likes: likeAndComment.likes.length,
          liked: likeAndComment.liked
        }
      })))[0]
  } catch (e) {
    console.log(e)
    return null
  }
};