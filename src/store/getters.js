import URN from "@/utils/URN";

const readerTextSize = state => state.readerTextSize;
const readerTextWidth = state => state.readerTextWidth;
const passage = (state, getters, rootState, rootGetters) => {
  return rootGetters.passage ? new URN(rootGetters.passage) : null;
};
const firstPassageUrn = (state, getters, rootState, rootGetters) => {
  return rootGetters.firstPassageUrn
    ? new URN(rootGetters.firstPassageUrn)
    : null;
};

export default {
  readerTextSize,
  readerTextWidth,
  passage,
  firstPassageUrn
};
