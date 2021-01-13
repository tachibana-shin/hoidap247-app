const express = require("express")
const app = express()
const alias = require("module-alias")
const bodyParser = require("body-parser")

alias.addAlias("@server", __dirname)
alias.addAlias("@helper", __dirname + "/helper")

const checkUser = require("@helper/modules/checkUser")
require("dotenv").config()

app.use(require("cors")({
  exposedHeaders: "Authorization"
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(async (req, res, next) => {
  const token = req.headers["authorization"]?.replace(/^Bearer /i, "")
  
  if (token) {
    try {
      req.user = await checkUser(token)
    } catch (e) {
      console.log(e)
    }
  }
  
  next()
})
require("./i18n")(app)

require("./database").connect.then(async mysql => {
    require("./routes")(app)
    require("./sockets")(app.listen(3000, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log("Connected")
      }
    }), mysql)
  })
  .catch(err => console.log(err));