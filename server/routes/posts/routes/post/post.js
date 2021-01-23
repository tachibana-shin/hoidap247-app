const router = require("express").Router()
const multer = require("multer")
const path = require("path")
const checkPost = require("@helper/checkPost")
const addPost = require("@helper/addPost")
const updatePost = require("@helper/updatePost")
const eventStore = require("@server/eventStore")
const getPointUser = require("@helper/getPointUser")
const rules = require("@helper/rules")
const minusPointUser = require("@helper/minusPointUser")

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024
  }
})

router.route("/").post(upload.array("photos[]", 10), async (req, res) => {
  if (req.user) {
    const mess = rules(req, req.body)
    if (mess === true) {
      if ("uid" in req.body) {
        // mode update post
        if (await checkPost(req.body.uid, req.user.uuid)) {
          if (await updatePost(req.user, req.body, req.files, path.resolve(__dirname, ".."))) {
            res.json({
              message: req.$t("POST_UPGRADE_SUCCESS")
            })
          } else {
            res.status(401).json({
              message: req.$t("POST_UPGRADE_FAILED")
            })
          }
        } else {
          res.status(401).json({
            message: req.$t("POSTER_NOT_EXISTS")
          })
        }
      } else {
        const pointUser = await getPointUser(req.user.uuid)
        if (req.body.point > pointUser) {
          res.status(401).json({
            message: req.$t("YOU_NOT_ENOUGH_POINTS")
          })
        } else {
          if (await addPost(req.user, req.body, req.files, path.resolve(__dirname, ".."))) {
            await minusPointUser(req.user.uuid, req.body.point)
            eventStore.emit("newPost")
            res.json({
              message: req.$t("POST_UPLOADED_SUCCESS")
            })
          } else {
            res.status(401).json({
              message: req.$t("POST_UPLOADED_FAILED")
            })
          }
        }
      }
    } else {
      res.status(401).json({
        message: mess
      })
    }
  } else {
    res.status(401).json({
      message: req.$t("REQUIRED_LOGIN")
    })
  }
})

module.exports = router;