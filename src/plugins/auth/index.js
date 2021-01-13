import Vue from "vue"
import auth from "@websanova/vue-auth/dist/v2/vue-auth.esm.js"
import bearer from "@websanova/vue-auth/dist/drivers/auth/bearer.esm.js"
import driverAuthBearer from "@websanova/vue-auth/dist/drivers/auth/bearer.esm.js"
import driverHttpAxios from "@websanova/vue-auth/dist/drivers/http/axios.1.x.esm.js"
import driverRouterVueRouter from "@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js"
import driverOAuth2Google from "@websanova/vue-auth/dist/drivers/oauth2/google.esm.js"
import driverOAuth2Facebook from "@websanova/vue-auth/dist/drivers/oauth2/facebook.esm.js"

driverOAuth2Google.params.client_id = "547886745924-4vrbhl09fr3t771drtupacct6f788566.apps.googleusercontent.com"
driverOAuth2Facebook.params.client_id = "196729390739201"

Vue.use(auth, {
  plugins: {
    http: Vue.http,
    router: Vue.router
  },
  drivers: {
    auth: {
      request(req, token) {
        if (token) {
          req.headers["authorization"] = `Bearer ${token}`
        }
      },
      response(req) {
        const token = req.headers["authorization"]
        if (token) {
          return token.replace(/^bearer /i, "")
        }
      }
    },
    http: driverHttpAxios,
    router: driverRouterVueRouter,
    oauth2: {
      google: driverOAuth2Google,
      facebook: driverOAuth2Facebook,
    }
  },
  options: {
    rolesKey: "type",
    notFoundRedirect: {
      path: "/"
    },
    authRedirect: {
      path: "/login"
    },
    registerData: {
      url: "/auth/register",
      autoLogin: true
    },
    loginData: {
      url: "/auth/login"
    },
    logoutData: {
      url: "/auth/logout"
    },
    fetchData: {
      url: "/auth/fetch"
    },
    refreshData: {
      url: "/auth/fetch?action=refresh",
      enabled: false
    },
    /* @default */
    rememberkey: 'auth_remember',
    staySignedIn: true,
    tokenDefaultKey: "token",
    tokenImpersonateKey: 'auth_token_impersonate',
    stores: ["storage", "cookie"],
    /* @/end */
  }
});