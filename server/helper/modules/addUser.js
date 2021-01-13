const jwt = require("./jwt")
const mysql = require("@server/database")
const fields = ["name", "email", "class", "schoolName", "birthday", "password", "city", "typeLogin", "uuid", "avatar"]
const sha1 = require("sha1")

module.exports = async (args) => {
  const argsColumns = []
  if (args.password) {
    args.password = sha1(args.password)
  }
  for (const field in args) {
    if (fields.includes(field) && !!args[field]) {
      argsColumns.push({
        field,
        value: args[field]
      })
    }
  }

  return (await mysql.query(`insert into users ( ${argsColumns.map(item => item.field).join(", ")} ) values (${argsColumns.map(item => "?").join(", ")})`, argsColumns.map(item => item.value)))[0]
};