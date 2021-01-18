<template>
  <v-card flat color="white" min-height="100%">
    <v-app-bar fixed app color="white">
      <v-btn icon @click="$router.back()">
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
      <v-toolbar-title>
        Trang cá nhân
      </v-toolbar-title>
    </v-app-bar>
    <v-list two-line>
      <template v-for="(item, index) in items">
        <v-subheader v-if="index == 0 || item.date != items[index - 1].date"> {{ $d(new Date(item.date), "short", $i18n.locale) }} </v-subheader>
        <v-list-item>
          <v-list-item-avatar>
            <app-avatar :name="$auth.user().name" :avatar="$auth.user().avatar" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium">
              {{ item.subject }} • Lớp {{ item.class }} • {{ item.point }}đ
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ item.content }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset v-if="items[index + 1]" />
      </template>
      <infinite-loading @infinite="fetchData" />
    </v-list>
  </v-card>
</template>
<script>
  import AppAvatar from "@/components/AppAvatar"
  export default {
    components: {
      AppAvatar
    },
    data: () => ({
      items: []
    }),
    methods: {
      async fetchData({ loaded, complete }) {
        const response = await this.$http.get("/auth/questions", {
          params: this.pages
        })

        this.pages++
        this.items.push(...response.data.questions)
        if (response.data.questions.length < 20) {
          complete()
        } else {
          loaded()
        }
      }
    }
  }
</script>