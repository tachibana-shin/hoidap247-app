const mysql = require("@server/database")
const getLikerAndCommerInComment = require("./getLikerAndCommerInComment")

async function getBaseUser(uuid) {
  return (await mysql.query(`select name from users where uuid = ? limit 1`, [uuid]))[0][0]
}

module.exports = async ({
  page = 1,
  id
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
        where users.uuid = comments.uuid
        order by comments.lastModifier desc
        limit 20 offset ?`, [(page - 1) * 20]))[0]
      .map(async post => {
        const likeAndComment = await getLikerAndCommerInComment(post.id, uuid)

        return {
          ...post,
          answer: {
            name: (await getBaseUser(post.uuid))?.name,
            count: likeAndComment.comments.length
          },
          likes: likeAndComment.likes.length,
          liked: likeAndComment.liked 
        }
      }))
  } catch (e) {
    console.log(e)
    return null
  }
};