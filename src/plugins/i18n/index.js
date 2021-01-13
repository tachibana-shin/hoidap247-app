import Vue from "vue"
import VueI18n from "vue-i18n"
import messages from "./messages/vi-VN.json"
import axios from "axios"

Vue.use(VueI18n)

export const $i18n = new VueI18n({
  locale: "vi-VN",
  fallbackLocale: "vi-VN",
  messages
})

const loadedLanguages = ["vi-VN"]

function set$i18nLanguage(lang) {
  $i18n.locale = lang
  axios.defaults.headers.common["Accept-Language"] = lang
  document.querySelector("html").setAttribute("lang", lang)
  return lang
}

export const loadLanguageAsync = lang => {
  if ($i18n.locale === lang) {
    return Promise.resolve(set$i18nLanguage(lang))
  }

  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(set$i18nLanguage(lang))
  }

  return import(`./messages/${lang}.js`).then(messages => {
    $i18n.setLocaleMessage(lang, messages.default)
    loadedLanguages.push(lang)
    return set$i18nLanguage(lang)
  })
}
export const i18n = Vue.i18n = $i18n;