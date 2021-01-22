const router = require("express").Router()

router.use("/posts", require("./routes/upload"))
router.use("/posts", require("./routes/get"))
router.use("/posts", require("./routes/post"))

module.exports = router;