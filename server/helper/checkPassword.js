const mysql = require("@server/database")
const sha1 = require("sha1")

module.exports = async (email, uuid, pass) => {
  return (await mysql.query(`select id from users where email = ? and uuid = ? and password = ? limit 1`, [email, uuid, sha1(pass)]))[0][0]
};