<template v-if="siblings">
  <div class="passage-siblings-widget u-widget u-grid">
    <div
      class="grid-cell-square"
      v-for="sibling in siblings"
      :key="sibling.urn"
    >
      <a v-if="sibling.lcp === passage.lcp" class="active-sibling">
        {{ sibling.lcp }}
      </a>
      <router-link
        v-else
        :to="{ path: 'reader', query: { urn: `${sibling.urn}` } }"
      >
        {{ sibling.lcp }}
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
  }
  .passage-siblings-widget * {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.7rem;
    padding: 0.1rem 0.3rem;
  }
  .passage-siblings-widget a {
    border: none;
  }
  .active-sibling {
    font-weight: bold;
    color: $white;
    background: var(--scaife-brand-color, $gray-800);
  }
</style>
