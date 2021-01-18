<template>
  <v-select :items="citys" menu-props="auto" :label="$t('labels.CITY')" prepend-inner-icon="mdi-map" single-line v-model="valueNow" :rulee="rules" item-text="name" :hint="$t('labels.CITY_HINT')" :outlined="outlined"></v-select>
</template>
<script>
  import citys from "@/data/citys"

  export default {
    props: {
      rules: Array,
      value: [Date, String],
      outlined: Boolean
    },
    data: () => ({
      citys: Object.values(citys)
    }),
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