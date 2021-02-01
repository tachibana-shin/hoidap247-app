const mysql = require("@server/database")

module.exports = async function getBaseUser(uuid) {
  return (await mysql.query("select name, uuid, avatar from users where uuid = ? limit 1", [uuid]))[0][0]
}