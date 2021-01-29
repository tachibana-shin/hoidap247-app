const mysql = require("@server/database")
const sha1 = require("sha1")

module.exports = async (uuid, oldPass, newPass) => {
  try {
    const result = !!(await mysql.query("update users set password = ? where password = ? and uuid = ? limit 1", [sha1(newPass), sha1(oldPass), uuid]))[0]
    if ( result ) {
      mysql.query("select id from oldPassword where uuid = ? and hash = ? limit 1", [ uuid, sha1(oldPass) ])
      .then(async res => {
        if ( !res[0][0] ) {
          await mysql.query("insert into oldPassword (uuid, hash) values ( ?, ? ) limit 1", [uuid, sha1(oldPass)])
        }
      })
    }
    return result
  } catch (e) {
    return null
  }
};