const router = require("express").Router()
const path = require("path")
const getPost = require("@helper/getPostNotInfo")

router.route("/").get(async (req, res) => {
  if (req.user) {
    const post = await getPost(req.query.id, req.user.uuid)
    if (post) {
      res.json(post)
    } else {
      res.status(401).json({
        message: req.$t("POSTER_NOT_EXISTS")
      })
    }
  } else {
    res.status(401).json({
      message: req.$t("REQUIRED_LOGIN")
    })
  }
})

module.exports = router;