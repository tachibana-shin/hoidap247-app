const mysql = require("@server/database")

module.exports = async uuid => {
  return (await mysql.query(`select id, url from photos where uuidPoster = ? limit 10`, [uuid]))[0].map(({ id, url }) => ({
    key: id,
    url
  }))
}