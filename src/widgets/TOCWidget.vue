<template>
  <div class="toc-widget u-widget u-flex" v-if="toc">
    <TOCHeader
      :toc="toc"
      :showURNs="showURNs"
      :showingRootToc="showingRootToc"
      :returnToRootPayload="returnToRootPayload"
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
    created() {
      this.fetchData();
    },
    watch: {
      $route: 'fetchData',
      defaultTocUrn: 'fetchData',
    },
    data() {
      return {
        toc: null,
        filtered: null,
        showURNs: false,
      };
    },
    computed: {
      context() {
        return this.$route.name;
      },
      metadata() {
        return this.$store.getters[`${WIDGETS_NS}/metadata`];
      },
      endpoint() {
        return this.$scaife.endpoints.tocEndpoint;
      },
      returnToRootPayload() {
        return this.context == 'tocs'
          ? { path: 'tocs' }
          : {query: { urn: this.$route.query.urn} };
      },
      showingRootToc() {
        if (this.context == 'tocs') {
          return !this.$route.query.urn;
        }
        if (this.$route.query.toc) {
          return this.$route.query.toc === this.defaultTocUrn ? true : false;
        }
        return this.defaultTocUrn
          ? this.url === this.getTocUrl(this.defaultTocUrn)
          : this.url === this.getTocUrl(this.rootTocUrn);
      },
      defaultTocUrn() {
        return this.metadata && this.metadata.defaultTocUrn
          ? this.metadata.defaultTocUrn
          : null;
      },
      rootTocUrn() {
        return 'urn:cite:scaife-viewer:toc.demo-root';
      },
      url() {
        if (this.$route.query.toc) {
          return this.getTocUrl(this.$route.query.toc);
        }
        if (this.context === 'reader') {
          return this.getTocUrl(this.defaultTocUrn || this.rootTocUrn);
        }
        return this.getTocUrl(this.$route.query.urn || this.rootTocUrn);
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
      toggleURNs() {
        this.showURNs = !this.showURNs;
      },
      filterData(data) {
        this.filtered = data;
      },
      fetchData() {
        fetch(this.url)
          .then(response => response.json())
          .then(data => {
            this.toc = data;
            this.filtered = null;
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.log(error.message);
          });
      },
      getTocUrl(tocUrn) {
        return `${this.endpoint}/tocs/${tocUrn.split(':').slice(-1)}.json`;
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
  .lookahead-container {
    align-items: center;
    margin-bottom: 0.66em;
    .form-group {
      width: 90%;
    }
  }
  .icon {
    color: black;
    margin-left: 0.66em;
    &.urn {
      cursor: pointer;
    }
  }
</style>
