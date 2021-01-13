export default i18n => ({
  required: value => !!value || i18n.$t("labels.REQUIRED"),
  email(value) {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || i18n.$t("labels.INVALID_EMAIL")
  },
  password(value) {
    if (value.length < 8) {
      return i18n.$t("labels.PASS_AT_LEAST_8")
    }
    if (!/[A-Z]/.test(value)) {
      return i18n.$t("labels.PASS_AT_LEAST_1_UPPERCASE")
    }
    if (!/[0-9]/.test(value)) {
      return i18n.$t("labels.PASS_AT_LEAST_1_NUMBER")
    }
    return true
  }
});