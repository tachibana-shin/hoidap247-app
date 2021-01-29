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
      path: "/profile/change-info",
      component: () => import("@/pages/Profile/ChangeInfo/Index"),
      meta: {
        auth: true,
        hideBottomBar: true
      }
    },
    {
      path: "/profile/change-info/contact",
      component: () => import("@/pages/Profile/ChangeInfo/Contact"),
      meta: {
        auth: true,
        hideBottomBar: true
      }
    },
    {
      path: "/profile/change-info/basic",
      component: () => import("@/pages/Profile/ChangeInfo/Basic"),
      meta: {
        auth: true,
        hideBottomBar: true
      }
    },
    {
      path: "/profile/change-password",
      component: () => import("@/pages/Profile/ChangePassword"),
      meta: {
        auth: true,
        hideBottomBar: true
      }
    },
    {
      path: "/profile/questions",
      component: () => import("@/pages/Profile/Questions"),
      meta: {
        auth: true,
        hideBottomBar: true
      }
    },
    {
      path: "/questions",
      component: () => import("@/pages/Questions/Index")
    },
    {
      path: "/post",
      component: () => import("@/pages/Post"),
      meta: {
        auth: true,
        hideBottomBar: true
      }
    },
    {
      path: "/post/:uid",
      component: () => import("@/pages/Post"),
      meta: {
        auth: true,
        hideBottomBar: true
      }
    },
    {
      path: "/logout",
      component: () => import("@/pages/Logout"),
      meta: {
        auth: true,
        hideBottomBar: true
      }
    },
    {
      path: "/watch-post/:id",
      component: () => import("@/pages/WatchPost"),
      meta: {
        hideBottomBar: true
      }
    }
  ]
});