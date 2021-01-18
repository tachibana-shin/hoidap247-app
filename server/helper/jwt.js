const jwt = require("jsonwebtoken")
const privateKey = require("fs").readFileSync(__dirname + "/authorized_keys", "utf-8")
const mysql = require("@server/database")


async function verify(token) {
  if ((await mysql.query(`select id from jwt_evict where token = ? limit 1`, [token]))[0].length) {
    console.warn(`"${token} evicted!`)
    return null
  } else {
    return jwt.verify(token, privateKey)
  }
}

module.exports = {
  sign(data, expiresIn) {
    return jwt.sign({
      data: {
        ...data
      }
    }, privateKey, {
      expiresIn,
      algorithm: "HS256"
    })
  },
  verify,
  async evict(token) {
    try {
      if (await verify(token) !== null) {
        return (await mysql.query(`insert into jwt_evict (token) values ( ? )`, [token]))[0].length > 0
      } else {
        return false
      }
    } catch (e) {
      console.warn(e)
      return false
    }
  }
};