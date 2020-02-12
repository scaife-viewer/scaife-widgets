<template>
  <div class="library-widget u-widget u-flex">
    <ul class="node-tree root" v-if="libraryTree">
      <Node v-for="(node, index) in libraryTree" :key="index" :node="node" />
    </ul>
  </div>
</template>

<script>
  import Node from '@/components/Node.vue';
  import { WIDGETS_NS } from '@/store/constants';

  export default {
    name: 'LibraryWidget',
    components: {
      Node,
    },
    scaifeConfig: {
      displayName: 'Library',
    },
    computed: {
      libraryTree() {
        return this.$store.getters[`${WIDGETS_NS}/libraryTree`];
      },
    },
  };
</script>

<style lang="scss">
  .library-widget {
    margin: 0 auto 0 2em;
    overflow: auto;
  }
  ul.node-tree {
    padding: 0;
    flex-wrap: nowrap;
    margin-left: 0.33em;
    &.root {
      margin: 0 0 0.33em 0;
    }
  }
</style>
