<template>
  <div class="toc-widget u-widget u-flex" v-if="toc">
    <TOCHeader
      :toc="toc"
      :showURNs="showURNs"
      :showingRootToc="showingRootToc"
      :getRootTOCPayload="getRootTOCPayload"
      @filter-data="filterData"
      @toggle-urns="toggleURNs"
    />
    <TOC
      :toc="filtered || toc"
      :showURNs="showURNs"
      :getItemPayload="getItemPayload"
    />
  </div>
</template>

<script>
  import TOC from '@/components/TOC.vue';
  import TOCHeader from '@/components/TOCHeader.vue';
  import { WIDGETS_NS } from '@/store/constants';

  export default {
    name: 'TOCWidget',
    components: {
      TOCHeader,
      TOC,
    },
    scaifeConfig: {
      displayName: 'Table of Contents',
    },
    // determine which watchers we still need and when to invoke
    // watch: {
    //   $route: 'fetchData',
    //   defaultTocUrn: 'fetchData',
    // },
    data() {
      return {
        filtered: null,
        showURNs: false,
      };
    },
    computed: {
      gqlQuery() {
        return `
          {
            tocs(urn:  "${this.tocUrn}") {
              edges {
                node {
                  title
                  description
                  urn
                  entries {
                    edges {
                      node {
                        title
                        uri
                      }
                    }
                  }
                }
              }
            }
          }
        `;
      },
      toc() {
        if (!this.gqlData) {
          return null;
        }
        debugger;
        const toc = {
          ...this.gqlData.tocs.edges[0].node,
        };
        toc.items = toc.entries.edges.map(entry => entry.node);
        return toc;
      },
      metadata() {
        return this.$store.getters[`${WIDGETS_NS}/metadata`];
      },
      showingRootToc() {
        if (!this.$route.query.toc && this.initialTocUrn === this.rootTocUrn) {
          return true;
        }
        if (this.$route.query.toc === this.rootTocUrn) {
          return true;
        }
        return false;
      },
      defaultTocUrn() {
        return this.metadata && this.metadata.defaultTocUrn
          ? this.metadata.defaultTocUrn
          : null;
      },
      initialTocUrn() {
        return this.defaultTocUrn || this.rootTocUrn;
      },
      rootTocUrn() {
        // @@@ site level or dynamic from ATLAS
        return 'urn:cite:dsp-dar:toc.root';
      },
      tocUrn() {
        return this.$route.query.toc || this.initialTocUrn;
      },
    },
    methods: {
      isCiteUrn(urn) {
        return urn.startsWith('urn:cite:');
      },
      getItemPayload(urn) {
        if (this.isCiteUrn(urn)) {
          return {
            path: 'reader',
            query: {
              ...this.$route.query,
              toc: urn,
            },
          };
        }
        return {
          path: 'reader',
          query: {
            ...this.$route.query,
            urn: urn,
          },
        };
      },
      getRootTOCPayload() {
        const query = {
          ...this.$route.query,
          toc: this.rootTocUrn,
        };
        return { query };
      },
      toggleURNs() {
        this.showURNs = !this.showURNs;
      },
      filterData(data) {
        this.filtered = data;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .toc-widget {
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
  }
</style>
