<template>
  <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field v-model="date" readonly v-bind="{ ...$attrs, ...attrs }" v-on="on"></v-text-field>
    </template>
    <v-date-picker v-model="date" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false">
        Cancel
      </v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(date)">
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>
<script>
  export default {
    props: ["value"],
    data: () => ({
      modal: false
    }),
    computed: {
      date: {
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