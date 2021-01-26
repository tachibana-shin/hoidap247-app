<template>
  <v-card flat min-height="100%" class="d-flex align-center justify-center" color="white">
    <div class="text-body-1 max-200 min-100 text-center">
      <v-layout column grow v-if="$auth.user()">
        <v-flex>
          <app-avatar size="80" :name="$auth.user().name" :avatar="$auth.user().avatar" />
          <p class="mb-0 mt-2 font-weight-bold"> {{ $auth.user().name }} </p>
        </v-flex>
        <v-flex>
          <p class="text-caption"> {{ $t("labels.LOGOUTING") }} </p>
          <v-progress-linear indeterminate color="cyan" rounded />
        </v-flex>
      </v-layout>
      <p class="mb-0" v-else> {{ $t("labels.LOGOUTED") }} </p>
    </div>
  </v-card>
</template>
<script>
  import AppAvatar from "@/components/AppAvatar"

  export default {
    components: {
      AppAvatar
    },
    created() {
      this.$auth.logout()
    }
  }
</script>
<style lang="scss" scoped>
  .max-200 {
    max-width: 400px;
  }

  .min-100 {
    min-width: 200px;
  }
</style>