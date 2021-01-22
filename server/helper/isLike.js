const mysql = require("@server/database")

module.exports = async (idPoster, uuid) => {
  return !!(await mysql.query(`
    select id from liked where uuidPoster = ? and uuid = ? limit 1
  `, [idPoster, uuid]))[0][0]
}