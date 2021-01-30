const mysql = require("@server/database")
const isLikeComment = require("./isLikeComment")

module.exports = async (id, uuid, value) => {
  try {
    if (value) {
      if (await isLikeComment(id, uuid)) {
        return false
      } else {
        return (await mysql.query(`
          insert into likedInComment ( uuidComment, uuid ) values ( ?, ? )
        `, [id, uuid]))[0]
      }
    } else {
      return !!(await mysql.query(`
        delete from likedInComment where uuidComment = ? and uuid = ? limit 1
      `, [id, uuid]))[0]
    }
  } catch (e) {
    return null
  }
};