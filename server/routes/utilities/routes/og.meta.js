const router = require("express").Router()
const axios = require("axios")
const { JSDOM } = require("jsdom")
const NodeCache = require("node-cache")

function getOgMeta(document, name) {
  return document.querySelector(`meta[property="${name}"]`) ?.getAttribute("content")
}
async function getFavIcon(url, document) {
  const relIcon = [...document.querySelectorAll("link")].find(item => {
    if (item.getAttribute("rel").match(/icon/)) {
      return item
    }
  })?.getAttribute("href")

  if (relIcon) {
    return relIcon
  } else {
    try {
      await axios.get(url + "/favicon.ico")
      return `${url}/favicon.ico`
    } catch (e) {

    }
  }
}

const cache = new NodeCache({
  useClones: false
})

router.route("/og-meta").get(async (req, res) => {
  try {
    const { url } = req.query
    const urlName = (url.replace(/^https?:\/\//, "").match(/^([^/]+)/) || [])[1]?.replace(/\/$/, "")

    if (url) {
      if (cache.has(url)) {
        res.json(cache.get(url))
      } else {
        const { data } = await axios.get(url)
        const { document } = new JSDOM(data, { charset: "utf-8" }).window
        const info = {
          image: getOgMeta(document, "og:image") || await getFavIcon(`http://${urlName}/`, document),
          urlName: (getOgMeta(document, "og:url") || urlName).replace(/\/$/, ""),
          name: getOgMeta(document, "og:title") || document.title,
          href: url,
          small: true
        }
        cache.set(url, info)
        res.json(info)
      }
    } else {
      throw new Error("URL not found")
    }
  } catch (e) {
    res.status(404).json({
      message: req.$t("NOT_FOUND")
    })
  }
})

module.exports = router;