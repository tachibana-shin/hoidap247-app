<template>
  <v-card flat color="white" min-height="100%">
    <v-app-bar fixed app color="white">
      <v-btn icon @click="$router.back()">
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
      <v-toolbar-title>
        Chỉnh sửa cá nhân
      </v-toolbar-title>
    </v-app-bar>
    <v-container fluid class="mt-5">
      <v-row>
        <v-col cols="12" md="6" lg="4">
          <v-layout justify-space-between>
            <v-flex>
              <span class="font-weight-medium text-capitalize"> Ảnh đại diện </span>
            </v-flex>
            <span class="blue--text" @click="changeAvatar"> Chỉnh sửa </span>
          </v-layout>
          <div class="mt-2 text-center">
            <app-avatar :avatar="`${$auth.user().avatar}?key=${keyAvatar}`" :name="$auth.user().name" size="65px" :key="keyAvatar" />
          </div>
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <v-layout justify-space-between>
            <v-flex>
              <span class="font-weight-medium text-capitalize"> Thông tin liên hệ </span>
            </v-flex>
            <router-link to="/profile/change-info/contact" class="blue--text text-decoration-none"> Chỉnh sửa </router-link>
          </v-layout>
          <v-list>
            <v-list-item v-for="(item, index) in infoContact" :key="index">
              <v-list-item-icon>
                <v-icon> {{ item.icon }} </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> {{ item.value }} </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.name }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <v-layout justify-space-between>
            <v-flex>
              <span class="font-weight-medium text-capitalize"> Thông tin cơ bản </span>
            </v-flex>
            <router-link to="/profile/change-info/basic" class="blue--text text-decoration-none"> Chỉnh sửa </router-link>
          </v-layout>
          <v-list>
            <v-list-item v-for="(item, index) in infoBasic" :key="index">
              <v-list-item-icon>
                <v-icon> {{ item.icon }} </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> {{ item.value }} </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.name }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
  import AppAvatar from "@/components/AppAvatar"
  import changeInfo from "./helper/change-info"
  export default {
    components: { AppAvatar },
    data: () => ({
      keyAvatar: 0
    }),
    computed: {
      infoContact() {
        return [
          {
            icon: "mdi-email",
            name: "Email",
            value: this.$auth.user().email
          },
          {
            icon: "mdi-phone-outline",
            value: this.$auth.user().phone,
            name: "Số điện thoại"
          },
          {
            icon: "mdi-city",
            name: "Trường",
            value: this.$auth.user().schoolName
          },
          {
            icon: "mdi-school",
            name: "Lớp",
            value: this.$auth.user().class
          },
          {
            icon: "mdi-city",
            name: "Thành phố",
            value: this.$auth.user().city
          }
        ]
      },
      infoBasic() {
        return [
          {
            icon: "mdi-account-box",
            name: "Tên người dùng",
            value: this.$auth.user().name
          },
          {
            icon: "mdi-cake",
            name: "Ngày sinh",
            value: this.$auth.user().birthday
          }
        ]
      }
    },
    methods: {
      changeAvatar() {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/*"
        input.hidden = true
        document.body.appendChild(input)
        let onChange
        input.addEventListener("change", onChange = async () => {
          input.removeEventListener("change", onChange)
          const file = input.files[0]
          const formData = new FormData()
          formData.append("avatar", file)
          await changeInfo(formData)
          this.keyAvatar = Date.now()
        })
        input.click()
        document.body.removeChild(input)
      }
    }
  }
</script>