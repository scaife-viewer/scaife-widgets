import actions from "@/store/actions";
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import { WIDGETS_NS } from "@/store/constants";

const state = {
  readerTextSize: "md",
  readerTextWidth: "normal"
};

export default {
  namespace: WIDGETS_NS,
  store: {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
  }
};
