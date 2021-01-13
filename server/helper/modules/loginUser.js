const mysql = require("@server/database")
const jwt = require("./jwt")
const sha1 = require("sha1")

module.exports = async (email, password) => {
  const user = (await mysql.query("select uuid, email from users where email = ? and password = ?", [email, sha1(password)]))[0][0]
  return user ? jwt.sign(user, "30days") : false
};