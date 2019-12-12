<template>
  <div class="passage-reference-widget">
    <input
      v-model="reference"
      v-on:keyup="handleKeyUp"
      v-on:click="handleClick"
      type="text"
      class="form-control form-control-sm"
    />
  </div>
</template>

<script>
import { MODULE_NS } from "@/store/constants";

export default {
  name: "PassageReferenceWidget",
  scaifeConfig: {
    displayName: "Passage Reference"
  },
  watch: {
    passage: {
      handler: "setInputRef",
      immediate: true
    }
  },
  computed: {
    firstPassageUrn() {
      return this.$store.getters[`${MODULE_NS}/firstPassageUrn`];
    },
    passage() {
      return this.$store.getters[`${MODULE_NS}/passage`];
    }
  },
  data() {
    return {
      reference: ""
    };
  },
  methods: {
    setInputRef() {
      if (this.passage) {
        this.reference = this.passage.reference;
      }
    },
    handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.$router.push({
          to: "reader",
          query: {
            urn: this.reference
              ? `${this.passage.version}${this.reference}`
              : this.firstPassageUrn.absolute
          }
        });
      } else {
        e.stopPropagation();
      }
    },
    handleClick(e) {
      const el = e.currentTarget;
      el.select();
    }
  }
};
</script>

<style scoped>
.passage-reference-widget {
  margin: 0 2em;
  flex: 1;
}
</style>
