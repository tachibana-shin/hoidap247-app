<template>
  <v-card flat color="white" min-height="100%">
    <v-app-bar fixed app color="white">
      <v-btn icon>
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
            <span class="blue--text"> Chỉnh sửa </span>
          </v-layout>
          <div class="">
            <app-avatar :avatar="$auth.user().avatar" :name="$auth.user().name" size="60px" class="d-block mx-auto" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import AppAvatar from "@/components/AppAvatar"
  export default {
    components: { AppAvatar }
  }
</script>