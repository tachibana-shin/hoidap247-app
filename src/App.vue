<template>
  <v-app id="app">
    <v-main>
      <router-view />
    </v-main>
    <v-bottom-navigation color="blue" grow shift fixed app v-if="!$route.meta.hideBottomBar">
      <v-btn to="/">
        <span> Trang chủ </span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn to="/questions">
        <span> Đặt câu hỏi </span>
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
      <v-btn to="/notification">
        <span> Thông báo </span>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn to="/account">
        <span> Cá nhân </span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <app-snackbar />
  </v-app>
</template>
<script>
  import AppSnackbar from "@/components/AppSnackbar"

  let timeout = null
  export default {
    components: {
      AppSnackbar
    },
    computed: {
      user() {
        return this.$auth.user()
      }
    },
    sockets: {
      authorized() {
        clearTimeout(timeout)
      }
    },
    watch: {
      user: {
        handler() {
          clearTimeout(timeout)
          if (!timeout) {
            this.sendToken()
          }
          timeout = setTimeout(() => {
            this.sendToken()
          }, 1000)
        },
        immediate: true
      }
    },
    methods: {
      sendToken() {
        console.log("%c <socket.io>: sended token.", "color: blue")
        this.$socket.client.emit("authorizer", this.$auth.token())
      }
    }
  }
</script>
<style lang="scss">
  body {
    font-size: 14px;

    .text-inherit {
      font-size: inherit !important;
      font-weight: inherit;
      text-transform: inherit;
      letter-spacing: inherit !important;
    }

    .text-normal {
      font-size: 14px;
      font-weight: 400;
      text-transform: initial;
      letter-spacing: initial;
    }
  }
</style>