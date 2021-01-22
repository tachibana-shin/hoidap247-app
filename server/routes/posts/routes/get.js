const router = require("express").Router()
const getPosts = require("@helper/getPosts")

router.route("/get").get(async (req, res) => {
  const post = await getPosts(req.query.page, req.user && req.user.uuid, req.query.firstPostId)
  
  if ( post ) {
    res.json(post)
  } else {
    req.status(404).json({
      message: req.$t("UNKNOWN")
    })
  }
})

module.exports = router;