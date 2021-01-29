const mysql = require("@server/database")

module.exports = async id => {
  try {
    return (await mysql.query("select id from posts where id = ? limit 1", [id]))[0].length > 0
  } catch (e) {
    return null
  }
}