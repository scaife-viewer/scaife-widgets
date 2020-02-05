export default {
  readerTextSize: state => state.readerTextSize,
  readerTextWidth: state => state.readerTextWidth,
  passage: (state, getters, rootState, rootGetters) => rootGetters.passage,
  firstPassageUrn: (state, getters, rootState, rootGetters) =>
    rootGetters.firstPassageUrn,
  libraryTree: (state, getters, rootState, rootGetters) =>
    rootGetters.libraryTree,
  metadata: (state, getters, rootState, rootGetters) => rootGetters.metadata,
};
