const router = require("express").Router()
const existsComment = require("@helper/existsComment")
const getAnswersComment = require("@helper/getAnswersComment")

router.route("/get").get(async (req, res) => {
  if (await existsComment(req.query.idComment)) {
    const comments = await getAnswersComment(req.query, req.user && req.user.uuid)
    if (comments) {
      res.json(comments)
    } else {
      res.status(404).json({
        message: req.$t("UNKNOWN")
      })
    }
  } else {
    res.status(404).json({
      message: req.$t("COMMENT_NOT_EXISTS")
    })
  }
})

module.exports = router