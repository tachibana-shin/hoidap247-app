const router = require("express").Router()

router.use("/api", require("./auth"))
router.use("/api", require("./posts"))

module.exports = router;