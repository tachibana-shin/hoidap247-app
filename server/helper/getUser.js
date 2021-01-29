const jwt = require("./jwt")
const mysql = require("@server/database")

function to2(e) {
  e += ""
  return e.length < 2 ? "0" + e : e
}
module.exports = async (...args) => {
  try {
    const user = args.length == 1 ? (await jwt.verify(args[0])).data : {
      email: args[0],
      uuid: args[1]
    }
    const detailUser = (await mysql.query("select uuid, name, city, email, class, schoolName, birthday, typeLogin, avatar, lastModifier, phone from users where uuid = ? and email = ? limit 1", [user.uuid, user.email]))[0][0]
    if (detailUser) {
      if (detailUser.birthday) {
        const oldate = new Date(detailUser.birthday)
        const newDate = new Date(oldate.getTime() + oldate.getTimezoneOffset() * 6e4)
        detailUser.birthday = [
         newDate.getFullYear(),
         to2(newDate.getMonth() + 1),
         to2(newDate.getDate() + 1)
        ].join("-")
      }
    }

    return detailUser ? { ...detailUser } : null
  } catch (e) {
    return null
  }
};