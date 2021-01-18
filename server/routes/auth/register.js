const router = require("express").Router()
const addUser = require("@helper/addUser")
const existsEmail = require("@helper/existsEmail")

router.route("/register").post(async (req, res) => {

  if (req.user) {
    res.status(401).json({
      error: true,
      message: req.$t("AUTH_LOGGED")
    })
  } else {
    if (await existsEmail(req.body.email, )) {
      res.status(401).json({
        error: true,
        message: req.$t("ACCOUNT_EXISTS")
      })
    } else {
      const token = await addUser(req.body)
      res.json({
        error: !token,
        token,
        message: req.$t(token ? "REGISTER_SUCCESS" : "REGISTER_FAILED")
      })
    }
  }
})

module.exports = router;