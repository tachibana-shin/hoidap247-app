<template>
  <v-card flat color="white" min-height="100%">
    <v-app-bar fixed app color="white">
      <v-btn icon @click="$router.back()">
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
      <v-toolbar-title>
        Đổi mật khẩu
      </v-toolbar-title>
    </v-app-bar>
    <v-container fluid class="mt-5">
      <v-row>
        <v-col cols="12">
          <h6 class="text-h6 font-weight-medium"> Thay đổi mật khẩu </h6>
          <p class="text--secondary text-caption">
            Thay đổi mật khẩu đăng nhập vào tàu khoản của bạn
          </p>
          <v-row class="mt-3">
            <v-col cols="12" md="6" class="py-0">
              <app-password-field label="Mật khẩu cũ" outlined color="blue" v-model="input.oldPassword" />
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <app-password-field label="Mật khẩu mới" outlined color="blue" v-model="input.newPassword" />
            </v-col>
          </v-row>
          <v-btn color="blue" block dark @click="postInput"> Đổi mật khẩu </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
  import AppPasswordField from "@/components/AppPasswordField"
  export default {
    components: {
      AppPasswordField
    },
    data: () => ({
      input: {
        oldPassword: "",
        newPassword: ""
      }
    }),
    methods: {
      async postInput() {
        this.$http.post("/auth/change-password", this.input)
          .then(({ data: { message } }) => {
            this.$store.commit("snackbar/setMessage", {
              color: "success",
              text: message
            })
          })
          .catch(({ data: { message } }) => {
            this.$store.commit("snackbar/setMessage", {
              color: "error",
              text: message
            })
          })
      }
    }
  }
</script>