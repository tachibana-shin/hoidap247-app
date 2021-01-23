const mysql = require("@server/database")

module.exports = async (uuid, pointMinus) => {
  try {
    return (await mysql.query(`
      update users set point = point - ? where uuid = ? limit 1
    `, [pointMinus, uuid]))[0]
  } catch (e) {
    return null
  }
}