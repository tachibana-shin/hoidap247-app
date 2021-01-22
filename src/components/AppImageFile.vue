<template>
  <img :is="tag" :src="sourceMe" @load="revoke" />
</template>
<script>
  export default {
    props: {
      tag: {
        type: String,
        default: "img"
      },
      source: [File, String]
    },
    data: () => ({
      sourceMe: String
    }),
    watch: {
      source: {
        handler(newVal) {
          if (newVal instanceof File) {
            const urlBlob = URL.createObjectURL(newVal)
            this.$once("load", () => URL.revokeObjectURL(urlBlob))
            this.sourceMe = urlBlob
          } else {
            this.sourceMe = newVal
          }
        },
        immediate: true
      }
    },
    methods: {
      revoke() {
        this.$emit("load")
      }
    }
  }
</script>