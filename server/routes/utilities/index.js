const router = require("express").Router()

router.use("/utilities", require("./routes/og:meta"))

module.exports = router;