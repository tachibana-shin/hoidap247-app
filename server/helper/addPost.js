const mysql = require("@server/database")
const uploader = require("./uploader")

module.exports = async (user, body, photos) => {
  try {
    const photosUrl = await uploader.save(photos)
    const result = (await mysql.query(`
      insert into posts (
        contents,
        uuid,
        subject,
        point,
        class
      ) values (
        ?,
        ?,
        ?,
        ?,
        ?
      )
    `, [body.contents, user.uuid, body.subject, body.point, body.class]))[0]

    if (result) {
      const id = result.insertId
      if (photosUrl.length > 0) {
        return !!(await mysql.query(`
        insert into photos (
          uuidPoster,
          url
        ) values 
          ${photosUrl.map(() => "(?, ?)").join(",")}
      `, photosUrl.map(item => [`${id}`, item]).flat()))[0]
      } else {
        return true
      }
    } else {
      return false
    }
  } catch (e) {
    return false
  }
};