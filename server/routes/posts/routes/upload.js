const router = require("express").Router()
const fs = require("fs")
const { resolve } = require("path")

router.route("/upload/:uuid").get((req, res) => {
  const path = `${__dirname}/upload/${req.params.uuid}`
  
  if (fs.existsSync(path)) {
    res.sendFile(path)
  } else {
    res.status(404).json({
      message: req.$t("NOT_FOUND")
    })
  }
})

module.exports = router;