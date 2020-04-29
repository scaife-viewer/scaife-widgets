<template v-if="children">
  <div class="passage-children-widget u-widget u-grid">
    <div
      class="grid-cell-square"
      v-for="child in children"
      :key="child.urn"
    >
      <router-link
        :to="{ path: 'reader', query: { urn: `${child.urn}` } }"
      >
        {{ child.lsb }}
      </router-link>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag';
  import { WIDGETS_NS } from '@/store/constants';

  export default {
    name: 'PassageChildrenWidget',
    scaifeConfig: {
      displayName: 'Children',
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
      childrenLens() {
        return this.gqlData.passageTextParts.metadata.children;
      },
      children() {
        return this.gqlData && this.childrenLens
          ? this.childrenLens.map(node => node)
          : [];
      },
    },
  };
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none;
  }
  .passage-children-widget {
    width: 100%;
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(auto-fill, minmax(1.6em, 1fr));
    grid-gap: 0.0825em;
  }
  .passage-children-widget * {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #e9ecef;
    font-size: 0.8rem;
  }
  .passage-children-widget a {
    border: none;
  }
</style>
