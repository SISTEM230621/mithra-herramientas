
const state = () => ({
  loading: false,
  dialog: false,
});


const getters = {

  getDialog(state) {
    return state.dialog;
  },
  getLoading(state) {
    return state.loading;
  },

};

const mutations = {

  SET_LOADING(state, valor) {
    state.loading = valor;
  },
  SET_DIALOG(state, value) {
    state.dialog = value;
  }
};

const actions = {
  setLoading(context, value) {
    context.commit("SET_LOADING", value);
  },
  setDialog(context, value) {
    context.commit("SET_DIALOG", value)
  }

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
