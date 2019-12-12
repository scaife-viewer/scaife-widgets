<template>
  <div class="text-width-widget">
    <TextWidth :value="textWidth" @input="changeTextWidth" width="narrow" />
    <TextWidth :value="textWidth" @input="changeTextWidth" width="normal" />
    <TextWidth :value="textWidth" @input="changeTextWidth" width="wide" />
    <TextWidth :value="textWidth" @input="changeTextWidth" width="full" />
  </div>
</template>

<script>
import TextWidth from "@/components/TextWidth";
import { MODULE_NS, SET_TEXT_WIDTH } from "@/store/constants";

export default {
  name: "TextWidthWidget",
  components: { TextWidth },
  scaifeConfig: {
    displayName: "Text Width"
  },
  computed: {
    textWidth() {
      return this.$store.getters[`${MODULE_NS}/readerTextWidth`];
    }
  },
  methods: {
    changeTextWidth(width) {
      this.$store.dispatch(`${MODULE_NS}/${SET_TEXT_WIDTH}`, { width });
    }
  }
};
</script>

<style scoped>
.text-width-widget {
  margin: 0 2em;
  flex: 1;
}
</style>
