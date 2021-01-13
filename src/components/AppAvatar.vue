<template>
  <v-avatar :size="size" :color="color">
    <v-img lazy-src="avatar" v-if="avatar" />
    <span class="white--text" v-else> {{ name.split(" ").slice(0, 2).map(item => item[0]).join("") }} </span>
  </v-avatar>
</template>
<script>
  export default {
    props: {
      size: [String, Number],
      color: {
        type: String,
        default: "deep-purple accent-4"
      },
      avatar: [String, null, undefined, Boolean],
      name: String
    }
  }
</script>