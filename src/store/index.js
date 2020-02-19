import actions from '@/store/actions';
import getters from '@/store/getters';
import mutations from '@/store/mutations';
import { WIDGETS_NS } from '@/store/constants';

const state = {
  readerTextSize: 'md',
  readerTextWidth: 'normal',
  // TODO: Determine if there is a better way to override this
  tocEndpoint:
    process.env.VUE_APP_TOC_ENDPOINT ||
    'https://mini-stack-a-feature-se-j47yu0.herokuapp.com',
};

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
