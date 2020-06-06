export default {
  // Local state.
  readerTextSize: state => state.readerTextSize,
  readerTextWidth: state => state.readerTextWidth,
  // Root state.
  passage: (state, getters, rootState, rootGetters) => rootGetters.passage,
  firstPassageUrn: (state, getters, rootState, rootGetters) =>
    rootGetters.firstPassageUrn,
  metadata: (state, getters, rootState, rootGetters) => rootGetters.metadata,
};
