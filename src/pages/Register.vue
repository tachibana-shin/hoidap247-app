<template>
  <v-card flat color="F2" class="py-8" min-height="100%">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="mx-2 pa-2">
            <v-img :max-width="`${230 / 360 * 100}%`" class="mb-2 mx-auto" :src="require('@/assets/logo.png')"></v-img>
            <h1 class="text-h5 text-md-h4 mx-auto text-center font-weight-bold blue--text"> {{ $t("labels.REGISTER_TEXT") }} </h1>
            <v-form v-model="valid" lazy-validation class="mx-sm-n3" @submit.prevent="submit">
              <v-container fluid>
                <v-row>
                  <v-col cols="12" md="6" class="py-0 py-md-3">
                    <app-email-field color="blue" :label="$t('labels.NAME')" required :hint="$t('labels.NAME_HINT')" prepend-inner-icon="mdi-account-outline" :rules="[rules.required]" v-model="input.name" />
                  </v-col>
                  <v-col cols="12" md="6" class="py-0 py-md-3 mt-n3 mt-md-0">
                    <app-datepicker color="blue" :label="$t('labels.BIRTHDAY')" prepend-inner-icon="mdi-calendar" v-model="input.birthday" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6" class="py-0 py-md-3">
                    <app-email-field color="blue" :label="$t('labels.SCHOOL_NAME')" required :hint="$t('labels.SCHOOL_NAME_HINT')" prepend-inner-icon="mdi-city" :rules="[rules.required]" v-model="input.schoolName" />
                  </v-col>
                  <v-col cols="12" md="6" class="py-0 py-md-3 mt-n3 mt-md-0">
                    <app-email-field color="blue" :label="$t('labels.CLASS')" required :hint="$t('labels.CLASS_HINT')" prepend-inner-icon="mdi-school-outline" :rules="[rules.required]" v-model="input.class" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="4" class="py-0 py-md-3">
                    <app-select-city :rules="[rules.required]" v-model="input.city" />
                  </v-col>
                  <v-col cols="12" md="4" class="py-0 py-md-3 mt-n3 mt-md-0 ">
                    <app-email-field color="blue" :label="$t('labels.EMAIL')" required :hint="$t('labels.EMAIL_HINT')" prepend-inner-icon="mdi-email-outline" :rules="[rules.required, rules.email]" v-model="input.email" />
                  </v-col>
                  <v-col cols="12" md="4" class="py-0 py-md-3 mt-n3 mt-md-0 ">
                    <app-password-field color="blue" v-model="input.password" />
                  </v-col>
                </v-row>
              </v-container>
              <div class="footer mt-2">
                <v-btn block color="blue" dark max-width="250" class="py-4" type="submit"> {{ $t("labels.REGISTER") }} </v-btn>
                <p class="text--secondary text-center py-3 mb-0"> {{ $t("labels.OR") }} </p>
                <div class="text-center">
                  <v-btn fab color="white" class="facebook" icon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1.5rem" height="1.5rem" fill="currentColor">
                      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>
                  </v-btn>
                  <v-btn fab color="white" class="google ml-2" icon>
                    <v-icon size="2.5rem"> mdi-google-plus </v-icon>
                  </v-btn>
                </div>
                <p class="text-center pt-3">
                  {{ $t("labels.EXISTS_ACCOUNT") }}? <router-link class="blue--text font-weight-bold text-center text-decoration-none" to="/login"> {{ $t("labels.LOGIN") }} </router-link>
                </p>
              </div>
            </v-form>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
  import AppEmailField from "@/components/AppEmailField"
  import AppPasswordField from "@/components/AppPasswordField"
  import AppDatepicker from "@/components/AppDatepicker"
  import AppSelectCity from "@/components/AppSelectCity"
  import rules from "@/rules"
  export default {
    components: {
      AppEmailField,
      AppPasswordField,
      AppDatepicker,
      AppSelectCity
    },
    data: () => ({
      valid: false,
      input: {
        name: "",
        email: "",
        class: "",
        schoolName: "",
        birthday: "",
        password: "",
        city: ""
      }
    }),
    computed: {
      rules() {
        return rules(this)
      }
    },
    methods: {
      submit() {
        this.$auth.register({
            data: this.input
          })
          .then(({ data: { message } }) => {
            this.$store.commit("snackbar/setMessage", {
              text: message
            })
          })
          .catch(({ data: { message } }) => {
            this.$store.commit("snackbar/setMessage", {
              color: "danger",
              text: message
            })
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .fill-height {
    max-width: 480px;
    max-height: (480px * 580 / 360);
  }
</style>