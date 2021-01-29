const mysql = require("@server/database")
const sha1 = require("sha1")

module.exports = async (uuid, pass) => {
  return !(await mysql.query("select id from oldPassword where uuid = ? and hash = ? limit 1", [uuid, sha1(pass)]))[0][0]
};