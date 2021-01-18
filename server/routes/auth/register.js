const router = require("express").Router()
const addUser = require("@helper/addUser")
const existsEmail = require("@helper/existsEmail")
const rules = require("@helper/rules")

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
      const mess = rules(req.body)
      if (mess === true) {
        const token = await addUser(req.body)
        res.status(token ? 200 : 401).json({
          token,
          message: req.$t(token ? "REGISTER_SUCCESS" : "REGISTER_FAILED")
        })
      } else {
        res.status(401).json({
          message: mess
        })
      }
    }
  }
})

module.exports = router;