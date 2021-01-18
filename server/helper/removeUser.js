const mysql = require("@server/database")

module.exports = async uuid => {
  try {
    return (await mysql.query("delete from users where uuid = ? limit 1", [uuid]))[0].length > 0
  } catch (e) {
    return null
  }
};