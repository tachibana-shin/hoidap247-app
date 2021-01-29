const mysql = require("@server/database")
const uploader = require("./uploader")

module.exports = async (user, body, photos) => {
  try {
    const photosUrl = await uploader.save(photos)

    const result = (await mysql.query(`
      update posts
      set contents = ?, 
        subject = ?,
        class = ?
      where id = ? and
        uuid = ? 
      
    `, [body.contents, body.subject, body.class, body.uid, user.uuid]))[0]

    if (result) {
      // remove
      await mysql.query(`
        delete from photos
        where uuidPoster = ? ${body.photos_not_remove ? `and
          id not in (${(body.photos_not_remove || []).map(() => "?").join(",")})` : ""}
          limit 10
      `, [body.uid, ...(body.photos_not_remove || [])])

      if (photosUrl.length > 0) {
        return !!(await mysql.query(`
        insert into photos (
          uuidPoster,
          url
        ) values 
          ${photosUrl.map(() => "(?, ?)").join(",")}
      `, photosUrl.map(item => [`${body.uid}`, item]).flat()))[0]
      } else {
        return true
      }
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
    return false
  }
};