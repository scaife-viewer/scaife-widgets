<template>
  <div class="passage-reference-widget u-widget">
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
  import { WIDGETS_NS } from '@/store/constants';

  export default {
    name: 'PassageReferenceWidget',
    scaifeConfig: {
      displayName: 'Passage Reference',
    },
    watch: {
      passage: {
        handler: 'setInputRef',
        immediate: true,
      },
    },
    computed: {
      firstPassageUrn() {
        return this.$store.getters[`${WIDGETS_NS}/firstPassageUrn`];
      },
      passage() {
        return this.$store.getters[`${WIDGETS_NS}/passage`];
      },
    },
    data() {
      return {
        reference: '',
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
            to: 'reader',
            query: {
              urn: this.reference
                ? `${this.passage.version}${this.reference}`
                : this.firstPassageUrn.toString(),
            },
          });
        } else {
          e.stopPropagation();
        }
      },
      handleClick(e) {
        const el = e.currentTarget;
        el.select();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .passage-reference-widget {
    margin: 0 2em;
    flex: 1;
    overflow-y: unset;
  }
</style>
