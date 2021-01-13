const jwt = require("./jwt")
const mysql = require("@server/database")

module.exports = async token => {
  try {
    const user = (await jwt.verify(token)).data
    const detailUser = (await mysql.query(`select uuid, name, city, email, class, schoolName, birthday, typeLogin, avatar, lastModifier from users where uuid = ? and email = ? limit 1`, [user.uuid, user.email]))[0][0]
    return detailUser ? { ...detailUser } : null
  } catch (e) {
    return null
  }
}