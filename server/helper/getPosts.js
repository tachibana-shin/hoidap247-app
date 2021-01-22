const mysql = require("@server/database")
const getPhotosOnPost = require("./getPhotosOnPost")
const getLikerAndCommer = require("./getLikerAndCommer")

module.exports = async (query, uuidUser) => {
  const { page = 1, firstId, from, to } = query
  try {
    return await Promise.all((await mysql.query(`
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
        where users.uuid = posts.uuid ${firstId == null ? "" : "and posts.id <= ?"} ${to == null ? "" : "and posts.id > ?"}
        order by posts.lastModifier desc
        limit 20 offset ?`, [
          ...(firstId == null ? [] : [firstId]),
          ...(to == null ? [] : [to]),
          (page - 1) * 20
        ]))[0]
      .map(async post => {
        const [likerAndCommer, photos] = await Promise.all([
            await getLikerAndCommer(post.id),
            await getPhotosOnPost(post.id)
        ])

        return {
          ...post,
          photos,
          likes: likerAndCommer.likes.length,
          comments: likerAndCommer.comments.length,
          liked: likerAndCommer.likes.includes(uuidUser)
        }
      }))
  }
  catch (e) {
    return null
  }
};