const router = require("express").Router()

router.use("/post", require("./get"))
router.use("/post", require("./post"))

module.exports = router;