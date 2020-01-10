import { SET_TEXT_SIZE, SET_TEXT_WIDTH } from '@/store/constants';

export default {
  [SET_TEXT_SIZE]: ({ commit }, { size }) => commit(SET_TEXT_SIZE, size),
  [SET_TEXT_WIDTH]: ({ commit }, { width }) => commit(SET_TEXT_WIDTH, width),
};
