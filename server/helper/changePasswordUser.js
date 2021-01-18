const jwt = require("./jwt")
const mysql = require("@server/database")
const sha1 = require("sha1")

module.exports = async (email, uuid, oldPass, newPass) => {
  try {
    return (await mysql.query(`update users set password = ? where password = ? and uuid = ? and email = ?`, [sha1(newPass), sha1(oldPass), uuid, email]))[0].length > 0
  } catch (e) {
    return null
  }
};