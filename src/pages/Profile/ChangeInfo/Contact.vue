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
          <app-email-field label="Số điện thoại" outlined type="tel" color="blue" :rules="[rules.required, rules.tel]" required prepend-inner-icon="mdi-phone" v-model="input1.phone" />
          <app-email-field label="Email" outlined color="blue" :rules="[rules.required, rules.email]" v-model="input1.email" persistent-hint hint="Bạn không thể thay đổi địa chỉ Email" readonly />
          <v-btn color="blue" block dark @click="postInput1"> Cập nhật </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <h6 class="text-h6 font-weight-medium"> Địa chỉ </h6>
          <p class="text--secondary text-caption">
            Thông tin trường học để thầy/cô/các bạn học sinh nhận diện nhau khi tham gia hệ thống
          </p>
          <app-email-field color="blue" :label="$t('labels.SCHOOL_NAME')" required prepend-inner-icon="mdi-city" outlined v-model="input2.schoolName" />
          <app-email-field color="blue" :label="$t('labels.CLASS')" required prepend-inner-icon="mdi-school-outline" outlined v-model="input2.class" />
          <app-select-city outlined v-model="input2.city" />
          <v-btn color="blue" block dark @click="postInput2"> Cập nhật </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
  import changeInfo from "./helper/change-info"
  import AppEmailField from "@/components/AppEmailField"
  import AppSelectCity from "@/components/AppSelectCity"
  import rules from "@/rules"
  export default {
    components: {
      AppEmailField,
      AppSelectCity
    },
    data: () => ({
      input1: {
        phone: "",
        email: ""
      },
      input2: {
        schoolName: "",
        class: "",
        city: ""
      }
    }),
    computed: {
      rules() {
        return rules(this)
      },
      user() {
        return this.$auth.user()
      }
    },
    watch: {
      "user": {
        handler(user) {
          if (user) {
            [
              this.input1.phone,
              this.input1.email
            ] = [
              user.phone || "",
              user.email || ""
            ];
            [
              this.input2.schoolName,
              this.input2.class,
              this.input2.city
            ] = [
              user.schoolName || "",
              user.class || "",
              user.city || ""
            ]
          }
        },
        immediate: true
      }
    },
    methods: {
      async postInput1() {
        await changeInfo(this.input1)
        this.$auth.fetch()
      },
      async postInput2() {
        await changeInfo(this.input2)
        this.$auth.fetch()
      }
    }
  }
</script>