const router = require("express").Router()

router.use("/post", [
  require("./get"),
  require("./post")
])

module.exports = router;