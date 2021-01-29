const mysql = require("@server/database")
const getPhotosOnPost = require("./getPhotosOnPost")
const getLikerAndCommer = require("./getLikerAndCommer")

module.exports = async (uuid, uuidUser) => {
  try {
    return (await Promise.all((await mysql.query(`
        select posts.id,
          posts.lastModifier,
          posts.subject,
          posts.class,
          posts.point,
          posts.contents,
          
          users.uuid,
          users.name,
          users.avatar
        from posts, users
        where users.uuid = posts.uuid and
          posts.id = ?
        limit 1`, [uuid]))[0]
      .map(async post => {
        const [likerAndCommer, photos] = await Promise.all([
            getLikerAndCommer(post.id, uuidUser),
            getPhotosOnPost(post.id)
        ])

        return {
          ...post,
          photos,
          likes: likerAndCommer.likes.length,
          comments: likerAndCommer.comments.length,
          liked: likerAndCommer.liked
        }
      })))[0]
  } catch (e) {
    return null
  }
};