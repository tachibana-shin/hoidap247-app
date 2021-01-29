const router = require("express").Router()

router.use("/api", [
  require("@helper/uploader"),
  require("./auth"),
  require("./posts"),
  require("./utilities"),
  require("./comments")
])

module.exports = router;