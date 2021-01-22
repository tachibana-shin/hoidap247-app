const router = require("express").Router()

router.use("/auth", [
  require("./routes/login"),
  require("./routes/register"),
  require("./routes/fetch"),
  require("./routes/change-info"),
  require("./routes/upload"),
  require("./routes/change-password")
])

module.exports = router;