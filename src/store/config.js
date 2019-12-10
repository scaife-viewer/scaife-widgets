import actions from "@/store/actions";
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import state from "@/store/state";
import { MODULE_NS } from "@/store/constants";

export default function createStore() {
  return {
    namespace: MODULE_NS,
    store: {
      namespaced: true,
      state: {
        ...state
      },
      actions: {
        ...actions
      },
      mutations: {
        ...mutations
      },
      getters: {
        ...getters
      }
    }
  };
}
