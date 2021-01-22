const router = require("express").Router()

router.use("/auth", require("./routes/login"))
router.use("/auth", require("./routes/register"))
router.use("/auth", require("./routes/fetch"))
router.use("/auth", require("./routes/change-info"))
router.use("/auth", require("./routes/upload"))
router.use("/auth", require("./routes/change-password"))

module.exports = router;