const router = require("express").Router()

router.use("/api", require("./auth"))
router.use("/api", require("./posts"))
router.use("/api", require("./utilities"))

module.exports = router;