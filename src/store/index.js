import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  readerTextSize: "md",
  readerTextWidth: "normal"
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
