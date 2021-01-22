const router = require("express").Router()

router.use("/posts", [
  require("./routes/upload"),
  require("./routes/get"),
  require("./routes/post")
])

module.exports = router;