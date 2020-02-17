export default {
  // Local state.
  readerTextSize: state => state.readerTextSize,
  readerTextWidth: state => state.readerTextWidth,
  // TODO: Might end up in the root state slice.
  selectedLemmas: state => state.selectedLemmas,
  // Root state.
  passage: (state, getters, rootState, rootGetters) => rootGetters.passage,
  firstPassageUrn: (state, getters, rootState, rootGetters) =>
    rootGetters.firstPassageUrn,
  libraryTree: (state, getters, rootState, rootGetters) =>
    rootGetters.libraryTree,
  metadata: (state, getters, rootState, rootGetters) => rootGetters.metadata,
};
