export const snackbar = {
  namespaced: true,
  state: {
    message: null
  },
  mutations: {
    setMessage(state, payload) {
      state.message = payload
    }
  }
};