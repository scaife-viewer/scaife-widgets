<template v-if="ancestors">
  <div class="passage-ancestors-widget u-widget u-grid">
    <div
      class="grid-cell-square"
      v-for="ancestor in ancestors"
      :key="ancestor.absolute"
    >
      <router-link
        :key="`${ancestor.absolute}`"
        :to="{ path: 'reader', query: { urn: `${ancestor.absolute}` } }"
      >
        {{ ancestor.node }}
      </router-link>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag';
  import URN from '@/utils/URN';
  import { WIDGETS_NS } from '@/store/constants';

  export default {
    name: 'PassageAncestorsWidget',
    scaifeConfig: {
      displayName: 'Ancestors',
    },
    computed: {
      passage() {
        return this.$store.getters[`${WIDGETS_NS}/passage`];
      },
      gqlQuery() {
        return this.passage
          ? gql`
            {
              passageTextParts(reference: "${this.passage.absolute}") {
                metadata
              }
            }`
          : null;
      },
      ancestorsLens() {
        return this.gqlData.passageTextParts.metadata.ancestors;
      },
      ancestors() {
        return this.gqlData && this.ancestorsLens
          ? this.ancestorsLens.map(node => new URN(node.urn))
          : [];
      },
    },
  };
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none;
  }
  .passage-ancestors-widget {
    width: 100%;
    margin: 0 2em;
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(auto-fill, minmax(1.6em, 1fr));
    grid-gap: 0.0825em;
  }
  .passage-ancestors-widget * {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #e9ecef;
    font-size: 0.75rem;
  }
  .passage-ancestors-widget a {
    border: none;
  }
</style>
