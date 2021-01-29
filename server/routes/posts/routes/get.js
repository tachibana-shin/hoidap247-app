const router = require("express").Router()
const getPosts = require("@helper/getPosts")
const getPost = require("@helper/getPost")

router.route("/get").get(async (req, res) => {
  let posts

  if ("id" in req.query) {
    posts = await getPost(req.query.id, req.user && req.user.uuid)
  } else {
    posts = await getPosts(req.query, req.user && req.user.uuid)
  }

  if (posts) {
    res.json(posts)
  } else {
    res.status(404).json({
      message: req.$t("UNKNOWN")
    })
  }
})

module.exports = router;