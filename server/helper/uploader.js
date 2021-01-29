const fs = require("fs")
const path = require("path")
const uuid = require("uuid")
const router = require("express").Router()
const getDomain = require("./getDomain")

exports.save = async function save(photos) {
  /* eslint no-return-await: "off" */
  return await Promise.all(
    photos.map(item => new Promise(async (resolve, reject) => {
      const namePhoto = uuid.v4() + path.extname(item.originalname)
      await fs.writeFile(path.resolve(__dirname, "../uploaded", namePhoto), item.buffer, err => err ? reject(err) : resolve(getDomain() + `/api/uploaded/${namePhoto}`))
    }))
  )
}
router.route("/uploaded", (req, res) => {
  const pathResolve = path.resolve(__dirname, "../uploaded", req.params.uuid)

  if (fs.existsSync(pathResolve)) {
    res.sendFile(pathResolve)
  } else {
    res.status(404).json({
      message: req.$t("NOT_FOUND")
    })
  }
})

module.exports = router;