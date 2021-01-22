const jwt = require("./jwt")
const mysql = require("@server/database")
const fields = ["name", "phone", "class", "schoolName", "birthday", "city", "avatar"]
const isEmpty = require("./isEmpty")
const getParamsAllow = require("@helper/getParamsAllow")

module.exports = async (uuid, args) => {
  const argsColumns = getParamsAllow(args, fields)
  
  if (isEmpty(argsColumns)) {
    return !!getUser(email, uuid)
  }
  try {
    return !!(await mysql.query(`update users set ${argsColumns.map(item => `${item.field} = ?`)} where uuid = ? limit 1`, [...argsColumns.map(item => item.value), uuid]))[0]
  } catch (e) {
    return null
  }
};