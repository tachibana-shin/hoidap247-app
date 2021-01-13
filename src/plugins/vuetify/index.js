import Vue from "vue"
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"
import colors from "vuetify/lib/util/colors"
import "@mdi/font/css/materialdesignicons.css"

Vue.use(Vuetify)

export const vuetify = new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: colors.purple,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
        F2: "#f2f2f2",
        "app-green": "#8cc254",
        facebook: "#4267B2",
        google: "#dd4b39"
      },
      dark: {
        primary: colors.blue.lighten3
      }
    }
  }
});