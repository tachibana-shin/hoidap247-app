const mysql = require("@server/database")
const jwt = require("./jwt")
const sha1 = require("sha1")

module.exports = async (email, password) => {
  try {
    const user = (await mysql.query("select uuid, email from users where email = ? and password = ? limit 1", [email, sha1(password)]))[0][0]
    return user ? jwt.sign(user, "30days") : false
  } catch (e) {
    return null
  }
};