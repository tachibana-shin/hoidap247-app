const router = require("express").Router()

router.use("/auth", require("./login"))
router.use("/auth", require("./register"))
router.use("/auth", require("./fetch"))
router.use("/auth", require("./change-info"))
router.use("/auth", require("./get-upload"))

module.exports = router;