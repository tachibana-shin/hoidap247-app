const mysql = require("@server/database")

module.exports = async (email) => {
  try {
    return (await mysql.query("select id from users where email = ? limit 1", [email]))[0].length > 0
  } catch (e) {
    return null
  }
}