const router = require("express").Router()
const loginUser = require("@helper/loginUser")

router.route("/login").post(async (req, res) => {
  if (req.user) {
    res.status(401).json({
      error: true,
      message: req.$t("AUTH_LOGGED")
    })
  } else {
    const token = await loginUser(req.body.email, req.body.password)
    if (token) {
      res.header("Authorization", `Bearer ${token}`)
    }
    res.status(token ? 200 : 401).json({
      error: !token,
      token,
      message: req.$t(token ? "LOGIN_SUCCESS" : "LOGIN_CORRECT")
    })
  }
})

module.exports = router;