const router = require("express").Router()

router.use("/comments", [
  require("./modules/get")
])

module.exports = router;