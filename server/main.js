const express = require("express")
const app = express()
const alias = require("module-alias")
const bodyParser = require("body-parser")

alias.addAlias("@server", __dirname)
alias.addAlias("@helper", `${__dirname}/helper`)

const getUser = require("@helper/getUser")
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
      req.user = await getUser(token)
      req.token = token
    } catch (e) {
      console.log(e)
    }
  }

  next()
})
app.use((req, res, next) => {
  require("./i18n").init(req, res)
  next()
})

require("./database").connect.then(async mysql => {
    app.use("/", require("./routes"))
    require("./sockets")(app.listen(3000, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log("Connected")
      }
    }), mysql)
  })
  .catch(err => console.log(err));