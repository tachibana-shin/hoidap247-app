const jwt = require("./jwt")
const mysql = require("@server/database")
const sha1 = require("sha1")

module.exports = async (uuid, oldPass, newPass) => {
  return (await mysql.query(`update users set password = ? where password = ? and uuid = ?`, [sha1(newPass), sha1(oldPass), uuid]))[0].length > 0
};