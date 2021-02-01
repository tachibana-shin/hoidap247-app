const router = require("express").Router()
const existsPoster = require("@helper/existsPoster")
const getComments = require("@helper/getComments")

router.route("/get").get(async (req, res) => {
  if ( await existsPoster(req.query.idPoster) ) {
    const comments = await getComments(req.query, req.user && req.user.uuid)
    if ( comments ) {
      res.json(comments)
    } else {
      res.status(404).json({
        message: req.$t("UNKNOWN")
      })
    }
  } else {
    res.status(404).json({
      message: req.$t("POSTER_NOT_EXISTS")
    })
  }
})

module.exports = router;