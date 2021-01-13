<template>
  <v-card flat min-height="100%" color="F2">
    <v-card-title class="white flex-nowrap py-4">
      <app-avatar size="60px" :avatar="$auth.user().avatar" :name="$auth.user().name" />
      <v-layout row class="ml-2">
        <v-flex class="text-truncate"> {{ $auth.user().name }} </v-flex>
        <v-flex class="text-caption text-truncate"> {{ $auth.user().email }} </v-flex>
      </v-layout>
    </v-card-title>
    <v-divider />
    <v-list>
      <template v-for="(item, index) in items">
        <v-subheader v-if="item.header"> {{ item.header }} </v-subheader>
        <v-list-item :to="item.to" v-else>
          <v-list-item-icon>
            <v-icon> {{ item.icon }} </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> {{ item.text }} </v-list-item-title>
            <v-list-item-subtitle> {{ item.sub }} </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider v-if="index < items.length - 1 && items[index + 1].header" inset />
      </template>
    </v-list>
  </v-card>
</template>
<script>
  import AppAvatar from "@/components/AppAvatar"
  export default {
    components: { AppAvatar },
    data: () => ({
      items: [
        { header: "Thông tin cá nhân" },
        {
          icon: "mdi-account-outline",
          text: "Trang cá nhân",
          sub: "Xem thành tích và thông tin của bạn",
          to: "/profile"
        },
        {
          icon: "mdi-pen",
          text: "Chỉnh sửa cá nhân",
          sub: "Chỉnh sửa thông tin cá nhân",
          to: "/profile/contact-info"
        },
        {
          icon: "mdi-lock-outline",
          text: "Mật khẩu",
          sub: "Đổi mật khẩu",
          to: "/profile/change-password"
        },
        { header: "Câu hỏi" },
        {
          icon: "mdi-help-circle-outline",
          text: "Câu hỏi của tôi",
          sub: "Quản lý các câu hỏi của bạn",
          to: "/my-question"
        },
        {
          icon: "mdi-comment-outline",
          text: "Câu trả lời của tôi",
          sub: "Quản lý các câu trả lời của bạn",
          to: "/my-answer"
        },
        { header: "Liên hệ" },
        {
          icon: "mdi-forum-outline",
          text: "Góp ý",
          sub: "Góp ý hoặc báo cáo lỗi cho tôi",
          to: "/support"
        },
        { header: "Ứng dụng" },
        {
          icon: "mdi-share-outline",
          text: "Chia sẻ ứng dụng",
          sub: "Chia sẻ ứng dụng này với bạn bè của bạn",
          to: "/share"
        },
        {
          icon: "mdi-bell-outline",
          text: "Hủy đăng ký nhận thông báo",
          sub: "Không làm phiền và tắt thông báo liên quan",
          to: "/cancel-notify"
        },
        {
          icon: "mdi-logout",
          text: "Đăng xuất",
          sub: "Đăng xuất tài khoản khỏi thiết bị này",
          to: "/logout"
        }
      ]
    })
  }
</script>