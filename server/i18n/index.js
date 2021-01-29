const i18n = require("i18n")

i18n.configure({
  locales: ["vi-VN"],
  directory: `${__dirname}/messages`,
  cookie: "lang",
  defaultLocale: "vi-VN",
  header: "accept-language",
  api: {
    __: "$t",
    __n: "$tn"
  }
})

module.exports = i18n;