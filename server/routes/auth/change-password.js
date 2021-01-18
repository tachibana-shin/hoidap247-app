const router = require("express").Router()
const changePassword = require("@helper/changePasswordUser")
const checkPassword = require("@helper/checkPassword")
const checkNewPassword = require("@helper/checkPasswordNew")

router.route("/change-password").post(async (req, res) => {
  if (req.user) {
    if (await checkPassword(req.user.email, req.user.uuid, req.body.oldPassword)) {
      if (await checkNewPassword(req.user.uuid, req.body.newPassword)) {
        if (req.body.oldPassword == req.body.newPassword) {
          res.status(401).json({
            message: req.$t("PASSWORD_NEW_DOES_NOT_EQUAL_OLD")
          })
        } else {
          if (await changePassword(req.user.uuid, req.body.oldPassword, req.body.newPassword)) {
            res.json({
              message: req.$t("CHANGE_PASSWORD_SUCCESS")
            })
          } else {
            res.status(401).json({
              message: req.$t("UNKNOWN")
            })
          }
        }
      } else {
        res.status(401).json({
          message: req.$t("PASSWORD_USED")
        })
      }
    } else {
      res.status(401).json({
        message: req.$t("PASSWORD_CORRECT")
      })
    }
  } else {
    res.status(401).json({
      message: req.$t("REQUIRED_LOGIN")
    })
  }
})

module.exports = router;