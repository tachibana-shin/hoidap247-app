const mysql = require("@server/database")

module.exports = async id => {
  try {
    return {
      ...(await mysql.query(`
        select uuidPoster, id, contents, url from comments where id = ? limit 1
      `, [id]))[0]
    }
  } catch (e) {
    return null
  }
}