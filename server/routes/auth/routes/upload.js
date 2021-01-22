const router = require("express").Router()
const fs = require("fs")

router.route("/upload/:uuid").get((req, res) => {
  const path = `${__dirname}/upload/${req.params.uuid}.png`.replace(/(?:\.png)+$/g, ".png")
  if ( fs.existsSync(path) ) {
    res.sendFile(path)
  } else {
    res.status(404).json({
      message: req.$t("NOT_FOUND")
    })
  }
})

module.exports = router;