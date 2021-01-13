const mysql = require("@server/database")

module.exports = async uuid => {
  return (await mysql.query("delete from users where uuid = ?", [uuid]))[0].length > 0
};