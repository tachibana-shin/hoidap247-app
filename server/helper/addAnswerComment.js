const mysql = require("@server/database")
const uploader = require("./uploader")

module.exports = async (user, body, photo) => {
  try {
    const photosUrl = await uploader.save(photo ? [photo] : [])
    const { insertId } = (await mysql.query(`
      insert into commentsInComment (
        uuidComment,
        contents,
        url,
        uuid
      ) values (
        ?,
        ?,
        ?,
        ?
      )
    `, [body.uuidComment, body.contents, photosUrl[0], user.uuid]))[0];

    return insertId
  } catch (e) {
    console.log(e)
    return false
  }
};