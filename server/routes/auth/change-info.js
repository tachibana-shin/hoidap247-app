const router = require("express").Router()
const multer = require("multer")
const updateUser = require("@helper/updateUser")
const fs = require("fs")
const resizeImg = require("resize-img")
const uuidv4 = require("uuid")
const path = require("path")
const getDomain = require("@helper/getDomain")

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
})



async function saveImage(path, buffer) {
  try {
    /*const image = await resizeImg(buffer, {
      width: 300,
      height: 300
    })*/

    fs.writeFileSync(path, buffer)
    return path
  } catch (e) {
    return null
  }
}


router.route("/change-info").post(upload.single("avatar"), async (req, res) => {
  if (req.user) {
    if (req.file) {
      const pathAvatar = await saveImage(
        path.resolve(`${path.join(__dirname, "/upload")}/${req.user.uuid}.png`),
        req.file.buffer
      )
      if (pathAvatar) {
        req.body.avatar = getDomain() + `/api/auth/upload/${req.user.uuid}.png`
      } else {
        res.status(401).json({
          message: req.$t("AVATAR_UPLOAD_ERROR")
        })
      }
    }
    if (await updateUser(req.user.email, req.user.uuid, req.body)) {
      res.json({
        message: req.$t("UPDATE_PROFILE_SUCCESS")
      })
    } else {
      res.status(401).json({
        message: req.$t("UPDATE_PROFILE_FAILED")
      })
    }
  } else {
    res.status(401).json({
      error: true,
      message: req.$t("REQUIRED_LOGIN")
    })
  }
})

module.exports = router;