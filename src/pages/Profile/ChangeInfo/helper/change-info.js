import Vue from "vue"
export default async (formData) => {
  await Vue.http.post("/auth/change-info", formData)
    .then(({ data: { message } }) => {
      Vue.store.commit("snackbar/setMessage", {
        color: "success",
        text: message
      })
    })
    .catch(({ data: { message } }) => {
      Vue.store.commit("snackbar/setMessage", {
        color: "error",
        text: message
      })
    })
};