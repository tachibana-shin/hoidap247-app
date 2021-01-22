const mysql = require("@server/database")
const getPhotosOnPost = require("./getPhotosOnPost")

module.exports = async (uuidPoster, uuid) => {
  try {
    if (uuid) {
      const post = (await mysql.query(`select id, lastModifier, contents, subject, class, point from posts where id = ? and uuid = ? limit 1`, [uuidPoster, uuid]))[0][0]
      const photos = await getPhotosOnPost(post.id)

      return {
        ...post,
        photos
      }
    }
    else {
      return null
    }
  } catch (e) {
    return null
  }
};