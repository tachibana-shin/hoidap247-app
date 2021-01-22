const mysql = require("@server/database")

module.exports = async (uuidPoster, uuid) => {
  try {
    return (await mysql.query(`select id from posts where id = ? and uuid = ? limit 1`, [uuidPoster, uuid]))[0].length > 0
  } catch (e) {
    return null
  }
};