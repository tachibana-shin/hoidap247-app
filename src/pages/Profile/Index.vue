<template>
  <v-card flat color="white" min-height="100%">
    <v-app-bar fixed app color="white">
      <v-btn icon>
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
      <v-toolbar-title>
        Trang cá nhân
      </v-toolbar-title>
    </v-app-bar>
    <v-card-title class="white flex-nowrap py-4">
      <app-avatar size="60px" :avatar="$auth.user().avatar" :name="$auth.user().name" />
      <v-layout row class="ml-2">
        <v-flex class="text-truncate"> {{ $auth.user().name }} </v-flex>
        <v-flex class="text-caption"> Thành viên từ {{ $auth.user().lastModifier | date }} </v-flex>
      </v-layout>
    </v-card-title>
    <v-divider />
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="6">
          <div class="font-weight-bold text-capitalize"> Thông tin chung </div>
          <v-layout justify-space-between class="mt-3">
            <v-flex v-for="(item, index) in general" :key="index" class="text-center">
              <p class="mb-0"> {{ item.name }} </p>
              <div class="d-flex align-center justify-center">
                <img :src="item.icon" style="height: 1em" />
                <span class="font-weight-bold ml-2"> {{ item.value }} </span>
              </div>
            </v-flex>
          </v-layout>
          <v-divider class="d-lg-none mt-5" />
        </v-col>
        <v-col cols="12" lg="6">
          <div class="font-weight-bold text-capitalize"> Các môn đã giúp đỡ bạn bè</div>
          <v-layout class="mt-3">
            <v-flex v-for="(item, index) in subjectsHasHelped" :key="index" class="text-center">
              <p class="mb-0"> {{ item.name }} </p>
              <span class="font-weight-bold"> {{ item.value }} </span>
            </v-flex>
          </v-layout>
          <v-divider class="d-lg-none mt-5" />
        </v-col>
        <v-col cols="12">
          <div class="font-weight-bold text-capitalize"> Top những người đã cảm ơn </div>
          <div class="mt-3">
            <app-avatar v-for="({ avatar, name }, index) in humanThanks" :key="index" size="35px" :avatar="avatar" :name="name" class="ml-3" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
  import AppAvatar from "@/components/AppAvatar"
  export default {
    components: { AppAvatar },
    data: () => ({
      general: [
        {
          icon: require("@/assets/icon-hoidap.png"),
          name: "Điểm số",
          value: "80"
        },
        {
          icon: require("@/assets/icon-camon.png"),
          name: "Cảm ơn",
          value: 0
        },
        {
          icon: require("@/assets/icon-haynhat.png"),
          name: "Hay nhất",
          value: 0
        },
        {
          icon: require("@/assets/icon-5sao.png"),
          name: "5 sao",
          value: 0
        },
        {
          icon: require("@/assets/icon-xacthuc.png"),
          name: "Xác thực",
          value: 0
        }
      ],
      subjectsHasHelped: [
        {
          name: "Vật lý",
          value: 10
        },
        {
          name: "Hóa học",
          value: 20
        }
      ],
      humanThanks: [
        {
          name: "Admin"
        }
      ]
    }),
    filters: {
      date(str) {
        const now = new Date(new Date(str) + new Date().getTimezoneOffset() * 60 * 60 * 1000)
        return now.toLocaleDateString()
      }
    }
  }
</script>