const router = require("express").Router()

router.use("/comments", [
  require("./routes/get")
])

module.exports = router;