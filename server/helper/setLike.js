const mysql = require("@server/database")
const isLike = require("./isLike")

module.exports = async (id, uuid, value) => {
  try {
    if (value) {
      if (await isLike(id, uuid)) {
        return false
      } else {
        return (await mysql.query(`
          insert into liked ( uuidPoster, uuid ) values ( ?, ? )
        `, [id, uuid]))[0]
      }
    } else {
      return !!(await mysql.query(`
        delete from liked where uuidPoster = ? and uuid = ? limit 1
      `, [id, uuid]))[0]
    }
  } catch (e) {
    return null
  }
};