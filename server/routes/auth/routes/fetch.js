const router = require("express").Router()

router.route("/fetch").get((req, res) => {
  res.status(req.user ? 200 : 401).json(req.user ? { data: req.user } : null)
})

module.exports = router;