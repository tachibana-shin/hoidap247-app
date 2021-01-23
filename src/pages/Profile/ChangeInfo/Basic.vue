<template>
  <v-card flat color="white" min-height="100%">
    <v-app-bar fixed app color="white">
      <v-btn icon @click="$router.back()">
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
      <v-toolbar-title>
        Chỉnh sửa thông tin cơ bản
      </v-toolbar-title>
    </v-app-bar>
    <v-container fluid class="mt-5">
      <v-row>
        <v-col cols="12">
          <h6 class="text-h6 font-weight-medium"> Họ tên - Ngày sinh </h6>
          <p class="text--secondary text-caption">
            Hãy cung cấp họ tên thật để không bị nhầm lẫn khi tham gia lớp học hoặc làm bài kiểm tra
          </p>
          <v-row class="mt-3">
            <v-col cols="12" md="6" class="py-0">
              <app-email-field label="Họ tên" outlined color="blue" :rules="[rules.required]" required prepend-inner-icon="mdi-account-outline" v-model="input.name" />
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <app-datepicker label="Ngày sinh" required outlined color="blue" :rules="[rules.required]" v-model="input.birthday" />
            </v-col>
          </v-row>
          <v-btn color="blue" block dark @click="postInput"> Cập nhật </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
  import changeInfo from "./helper/change-info"
  import AppEmailField from "@/components/AppEmailField"
  import AppDatepicker from "@/components/AppDatepicker"
  import rules from "@/rules"
  export default {
    components: {
      AppEmailField,
      AppDatepicker
    },
    data: () => ({
      input: {
        name: "",
        birthday: ""
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
              this.input.name,
              this.input.birthday
            ] = [
              user.name || "",
              user.birthday
            ]
          }
        },
        immediate: true
      }
    },
    methods: {
      async postInput() {
        await changeInfo(this.input)
        this.$auth.fetch()
      }
    }
  }
</script>