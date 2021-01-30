const mysql = require("@server/database")

module.exports = async (idPoster, uuid) => {
  return !!(await mysql.query(`
    select id from likedInComment where uuidComment = ? and uuid = ? limit 1
  `, [idPoster, uuid]))[0][0]
}