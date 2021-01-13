const jwt = require("./jwt")
const mysql = require("@server/database")
const fields = ["name", "email", "class", "schoolName", "birthday", "city", "avatar"]
const sha1 = require("sha1")

module.exports = async (uuid, email, args) => {
  const argsColumns = []
  for (const field in args) {
    if (fields.includes(field)) {
      argsColumns.push({
        field,
        value: args[field]
      })
    }
  }

  return jwt.sign({
    ...(await mysql.query(`update users set ${argsColumns.map(item => `${item.field} = ?`)} where email = ? and uuid = ?`, [...argsColumns.map(item => item.value), email, uuid]))[0][0]
  }, "30days")
};