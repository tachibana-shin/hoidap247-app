<template>
  <v-card flat color="white" class="fill-height wrapper">
    <v-app-bar app dense fixed flat>
      <v-tabs v-model="currentTab" fixed-tabs centered slider-color="blue" color="blue">
        <v-tab v-for="(item, index) in tabs" :key="index">
          <v-icon> {{ item.icon }} </v-icon>
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <v-tabs-items v-model="currentTab">
      <v-tab-item v-for="(item, index) in tabs" :key="index">
        <keep-alive>
          <component :is="item.component" />
        </keep-alive>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      currentTab: 0,
      tabs: [
        {
          icon: "mdi-keyboard",
          component: () => import("./tabs/TabSearch")
        },
        {
          icon: "mdi-camera",
          component: () => import("./tabs/TabCamera")
        }
      ]
    })
  }
</script>
<style lang="scss" scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
/*
    &>>>.v-window {
      min-height: 100%;

      &__container {
        min-height: 100%;
      }

      &-item {
        min-height: 100%;
        position: absolute;
        width: 100%;
        top: 0;
      }
    }*/
  }
</style>