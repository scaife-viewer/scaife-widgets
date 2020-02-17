import actions from '@/store/actions';
import getters from '@/store/getters';
import mutations from '@/store/mutations';
import state from '@/store/state';
import { WIDGETS_NS } from '@/store/constants';

export default {
  namespace: WIDGETS_NS,
  store: {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
  },
};
