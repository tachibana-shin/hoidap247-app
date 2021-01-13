const i18n = require("i18n")

module.exports = app => {
  app.use((req, res, next) => {
    i18n.init(req, res)
    next()
  })
  i18n.configure({
    locales: ["vi-VN"],
    directory: __dirname + "/messages",
    cookie: "lang",
    defaultLocale: "vi-VN",
    header: "accept-language",
    api: {
      __: "$t",
      __n: "$tn"
    }
  })
  return i18n
}