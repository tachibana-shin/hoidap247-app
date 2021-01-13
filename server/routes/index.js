const loginUser = require("@helper/modules/loginUser")
const addUser = require("@helper/modules/addUser")
const existsEmail = require("@helper/modules/existsEmail")

module.exports = app => {
  app.route("/api/posts").get((req, res) => {
    res.json({
      status: "ok",
      posts: [{
        id: 1,
        writer: {
          uuid: "80",
          displayName: "Admin"
        },
        poster: {
          lastTimeModifier: new Date("2020/11/1"),
          subject: "Vật lý",
          classes: 10,
          point: 30,
          contents: "Mọi người giúp em bài này với",
          linker: {
            small: true,
            href: "#",
            urlName: "google.com",
            name: "Google",
            image: "https://google.com/favicon.ico"
          },
          likes: 3,
          comments: 10,
          liked: false,
          firstPost: true
        }
      }]
    })
  })
  app.route("/api/auth/login").post(async (req, res) => {
    if (req.user) {
      res.status(401).json({
        error: true,
        message: req.$t("AUTH_LOGGED")
      })
    } else {
      try {
        const token = await loginUser(req.body.email, req.body.password)
        if (token) {
          res.header("Authorization", `Bearer ${token}`)
        }
        res.status(token ? 200 : 401).json({
          error: !token,
          token,
          message: req.$t(token ? "LOGIN_SUCCESS" : "LOGIN_CORRECT")
        })
      } catch (e) {
        res.status(401).json({
          error: true,
          message: req.$t("LOGIN_CORRECT")
        })
      }
    }
  })
  app.route("/api/auth/register").post(async (req, res) => {

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
        try {
          const token = await addUser(req.body)
          res.json({
            error: !token,
            token,
            message: req.$t(token ? "REGISTER_SUCCESS" : "REGISTER_FAILED")
          })
        } catch (e) {
          console.log(e)
          res.status(401).json({
            error: true,
            message: req.$t("UNKNOWN")
          })
        }
      }
    }
  })
  app.route("/api/auth/fetch").get((req, res) => res.status(req.user ? 200 : 401).json(req.user ? { data: req.user } : null))
};