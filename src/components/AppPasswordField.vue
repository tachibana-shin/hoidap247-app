<template>
  <v-text-field :label="$t('labels.PASSWORD')" :required="required" :outlined="outlined" prepend-inner-icon="mdi-lock-outline" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.password]" :type="showPassword ? 'text' : 'password'" :hint="$t('labels.PASSWORD_HINT')" @click:append="showPassword = !showPassword" v-model="valueNow" :color="color"></v-text-field>
</template>
<script>
  import rules from "@/rules"
  export default {
    props: {
      value: String,
      color: String,
      required: Boolean,
      outlined: Boolean
    },
    data: () => ({
      showPassword: false,
    }),
    computed: {
      valueNow: {
        get() {
          return this.value || ""
        },
        set(e) {
          this.$emit("input", e)
        }
      },
      rules() {
        return rules(this)
      }
    }
  }
</script>