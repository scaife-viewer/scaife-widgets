<template v-if="ancestors">
  <div class="passage-ancestors-widget u-widget">
    <ol class="ancestors">
      <li class="ancestor" v-for="ancestor in ancestors" :key="ancestor.urn">
        <router-link
          :key="ancestor.urn"
          :to="{ path: 'reader', query: { urn: ancestor.urn } }"
        >
          {{ ancestor.ref }}
        </router-link>
      </li>
    </ol>
  </div>
</template>

<script>
  import gql from 'graphql-tag';
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
              passageTextParts(reference: "${this.passage}") {
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
          ? this.ancestorsLens.map(node => node)
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
  }
  .passage-ancestors-widget * {
    display: flex;
    font-size: 0.75rem;
  }
  .passage-ancestors-widget a {
    border: none;
  }
  .ancestors {
    padding: 0;
    list-style: none;
  }
  .ancestor + .ancestor::before {
    display: inline-block;
    padding-right: 0.25rem;
    padding-left: 0.25rem;
    content: '>';
  }
</style>
