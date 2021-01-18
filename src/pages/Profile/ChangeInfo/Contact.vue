<template>
  <v-card flat color="white" min-height="100%">
    <v-app-bar fixed app color="white">
      <v-btn icon @click="$router.back()">
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
      <v-toolbar-title>
        Chỉnh sửa thông tin liên hệ
      </v-toolbar-title>
    </v-app-bar>
    <v-container fluid class="mt-5">
      <v-row>
        <v-col cols="12" md="6">
          <h6 class="text-h6 font-weight-medium"> Số điện thoại - Email </h6>
          <p class="text--secondary text-caption">
            Vui lòng cung cấp <span class="blue--text font-weight-medium"> đúng số điện thoại và email </span> bạn đang sử dụng để có thể lấy lại mật khẩu khi cần thiết
          </p>
          <app-email-field label="Số điện thoại" outlined type="tel" color="blue" />
          <app-email-field label="Email" outlined color="blue" />
          <v-btn color="blue" block dark> Cập nhật </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
  import changeInfo from "./helper/change-info"
  import AppEmailField from "@/components/AppEmailField"
  export default {
    components: {
      AppEmailField
    }
  }
</script>