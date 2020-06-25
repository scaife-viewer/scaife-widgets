<template v-if="siblings">
  <div class="passage-siblings-widget u-widget u-grid">
    <div
      class="grid-cell-square"
      v-for="sibling in siblings"
      :key="sibling.urn"
    >
      <a v-if="sibling.lsb === passage.lsb" class="active-sibling">
        {{ sibling.lsb }}
      </a>
      <router-link
        v-else
        :to="{ path: 'reader', query: { urn: `${sibling.urn}` } }"
      >
        {{ sibling.lsb }}
      </router-link>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag';
  import { WIDGETS_NS } from '@/store/constants';

  export default {
    name: 'PassageSiblingsWidget',
    scaifeConfig: {
      displayName: 'Siblings',
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
      siblingsLens() {
        return this.gqlData.passageTextParts.metadata.siblings;
      },
      siblings() {
        return this.gqlData && this.siblingsLens
          ? this.siblingsLens.map(node => node)
          : [];
      },
    },
  };
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none;
  }
  .passage-siblings-widget {
    width: 100%;
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(auto-fill, minmax(1.6em, 1fr));
    grid-gap: 0.0825em;
  }
  .passage-siblings-widget * {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #e9ecef;
    font-size: 0.8rem;
  }
  .passage-siblings-widget a {
    border: none;
  }
  .active-sibling {
    font-weight: bold;
  }
</style>
