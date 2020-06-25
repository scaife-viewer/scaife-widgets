<template v-if="children">
  <div class="passage-children-widget u-widget u-grid">
    <div class="grid-cell-square" v-for="child in children" :key="child.urn">
      <router-link :to="{ path: 'reader', query: { urn: `${child.urn}` } }">
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
              passageTextParts(reference: "${this.passage}") {
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
  }
  .passage-children-widget * {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.7rem;
    padding: 0.1rem 0.3rem;
  }
  .passage-children-widget a {
    border: none;
  }
</style>
