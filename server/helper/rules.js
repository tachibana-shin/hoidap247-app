const createRules = i18n => ({
  required: value => !!value || i18n.$t("REQUIRED"),
  email(value) {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || i18n.$t("INVALID_EMAIL")
  },
  password(value) {
    if (value.length < 8) {
      return i18n.$t("PASS_AT_LEAST_8")
    }
    if (!/[A-Z]/.test(value)) {
      return i18n.$t("PASS_AT_LEAST_1_UPPERCASE")
    }
    if (!/[0-9]/.test(value)) {
      return i18n.$t("PASS_AT_LEAST_1_NUMBER")
    }
    return true
  },
  phone(val) {
    if (val.length < 10) {
      return i18n.$t("labels.PHONE_NUMBER_MIN_10")
    }
    if (val.match(/^[0-9]+$/)) {
      return true
    }
    return i18n.$t("labels.PHONE_NUMBER_ALL_NUMBER")
  }
})

module.exports = (i18n, object) => {
  const rules = createRules(i18n)
  
  for ( const key in object ) {
    if ( key in rules ) {
      const mess = rules[ key ](object[ key ])
      if ( mess !== true ) {
        return mess
      }
    }
  }
  
  return true
};