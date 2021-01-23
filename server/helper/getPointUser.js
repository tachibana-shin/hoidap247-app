const mysql = require("@server/database")

module.exports = async uuid => {
  try {
    return (await mysql.query(`
      select point from users where uuid = ? limit 1
    `, [uuid]))[0][0].point
  return 0
  } catch (e) {
    return null
  }
};