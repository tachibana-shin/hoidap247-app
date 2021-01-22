const router = require("express").Router()
const getPosts = require("@helper/getPosts")

router.route("/get").get(async (req, res) => {
  const post = await getPosts(req.query, req.user && req.user.uuid)
  
  if ( post ) {
    res.json(post)
  } else {
    res.status(404).json({
      message: req.$t("UNKNOWN")
    })
  }
})

module.exports = router;