import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export const router = Vue.router = new Router({
  mode: "history",
  hashbang: false,
  scrollBehavior: (from, to, saved) => saved || { x: 0, y: 0 },
  routes: [
    {
      path: "/",
      component: () => import("@/pages/Index"),
      meta: {
        auth: null
      }
    },
    {
      path: "/login",
      component: () => import("@/pages/Login"),
      meta: {
        auth: false,
        hideBottomBar: true
      }
    },
    {
      path: "/register",
      component: () => import("@/pages/Register"),
      meta: {
        auth: false,
        hideBottomBar: true
      }
    },
    {
      path: "/account",
      component: () => import("@/pages/Account"),
      meta: {
        auth: true
      }
    },
    {
      path: "/profile",
      component: () => import("@/pages/Profile/Index"),
      meta: {
        auth: true,
        hideBottomBar: true
      }
    },
    {
      path: "/profile/contact-info",
      component: () => import("@/pages/Profile/ContactInfo"),
      meta: {
        auth: true,
        hideBottomBar: true
      }
    }
  ]
});