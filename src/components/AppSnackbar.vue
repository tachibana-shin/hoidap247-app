<template>
  <v-snackbar v-model="state" :timeout="3000" :color="message.color" class="v-snack" app>
    {{ message.text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="message = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
  export default {
    computed: {
      state: {
        get() {
          return !!this.message.text
        },
        set(e) {
          if ( !e) {
            this.message = null
          }
        }
      },
      message: {
        get() {
          return this.$store.state.snackbar.message || {}
        },
        set(val) {
          this.$store.commit("snackbar/setMessage", {
            color: this.$store.state.snackbar.message.color,
            text: null
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  /*.v-snack {
    &.v-snack--top {
      bottom: auto;
    }

    &.v-snack--bottom {
      top: auto;
    }
  }*/
</style>