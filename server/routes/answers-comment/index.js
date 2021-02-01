const router = require("express").Router()

router.use("/answers-comment", [
  require("./routes/get")
])

module.exports = router