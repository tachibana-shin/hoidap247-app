const mysql = require("mysql").createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hoc247",
  encoding: "utf8",
  charset: "utf8mb4"
})
const connect = new Promise((resolve, reject) => {
  mysql.connect((err) => {
    if (err) {
      reject(err)
    } else {
      resolve(mysql)
    }
  })
})

module.exports = {
  connect,
  async query(...args) {
    const mysql = await connect
    return new Promise((resolve, reject) => {
      mysql.query(...args, (err, ...args) => {
        if (err) {
          reject(err)
        } else {
          resolve(args)
        }
      })
    })
  }
};