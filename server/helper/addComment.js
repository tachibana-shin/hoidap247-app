const mysql = require("@server/database")
const uploader = require("./uploader")

module.exports = async (user, body, photos) => {
  try {
    const photosUrl = await uploader.save(photos.slice(0, 1))
    const { insertId } = (await mysql.query(`
      insert into comments (
        uuidPoster,
        contents,
        url,
        uuid
      ) values (
        ?,
        ?,
        ?,
        ?
      )
    `, [body.uuidPoster, body.contents, photosUrl[0], user.uuid]))[0];

    return insertId
  } catch (e) {
    console.log(e)
    return false
  }
};