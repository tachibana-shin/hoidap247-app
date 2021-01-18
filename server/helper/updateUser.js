const jwt = require("./jwt")
const mysql = require("@server/database")
const fields = ["name", "email", "class", "schoolName", "birthday", "city", "avatar"]

module.exports = async (email, uuid, args) => {
  const argsColumns = []
  for (const field in args) {
    if (fields.includes(field) && !!args[field]) {
      argsColumns.push({
        field,
        value: args[field]
      })
    }
  }
  try {
    return !!(await mysql.query(`update users set ${argsColumns.map(item => `${item.field} = ?`)} where email = ? and uuid = ?`, [...argsColumns.map(item => item.value), email, uuid]))[0]
  } catch (e) {
    return null
  }
};