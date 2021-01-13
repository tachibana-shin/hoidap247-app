<template>
  <v-text-field :rules="rules" :required="required" :outlined="outlined" :color="color" :label="label" :hint="hint" :prepend-inner-icon="prependInnerIcon" v-model="valueNow"></v-text-field>
</template>
<script>
  export default {
    props: {
      rules: Array,
      required: Boolean,
      outlined: Boolean,
      color: String,
      label: String,
      hint: String,
      prependInnerIcon: String,
      value: [Array, String, null, undefined, Date]
    },
    computed: {
      valueNow: {
        get() {
          return this.value
        },
        set(e) {
          this.$emit("input", e)
        }
      }
    }
  }
</script>