const jwt = require("./jwt")
const mysql = require("@server/database")
const fields = ["name", "email", "class", "schoolName", "birthday", "password", "city", "typeLogin", "uuid", "avatar"]
const sha1 = require("sha1")
const getParamsAllow = require("@helper/getParamsAllow")
const rules = require("./rules")

module.exports = async (args) => {

  if (args.password) {
    args.password = sha1(args.password)
  }

  const argsColumns = getParamsAllow(args, fields)

  try {
    return (await mysql.query(`insert into users (
        ${argsColumns.map(item => item.field).join(", ")}
      ) values (
        ${argsColumns.map(item => "?").join(", ")}
      )`, argsColumns.map(item => item.value)))[0]
  } catch (e) {
    return null
  }
};