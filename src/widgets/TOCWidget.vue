<template>
  <div class="toc-widget u-widget u-flex">
    <Lookahead
      :placeholder="placeholder"
      :lenses="lenses"
      :data="toc"
      @filter-data="filterData"
    />
    <TOC :toc="filtered || toc" v-if="toc" />
  </div>
</template>

<script>
  import Lookahead from '@/components/Lookahead.vue';
  import TOC from '@/components/TOC.vue';
  import { WIDGETS_NS } from '@/store/constants';

  export default {
    name: 'TOCWidget',
    components: {
      Lookahead,
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
      };
    },
    computed: {
      metadata() {
        return this.$store.getters[`${WIDGETS_NS}/metadata`];
      },
      defaultTocUrn() {
        return this.metadata && this.metadata.defaultTocUrn
          ? this.metadata.defaultTocUrn
          : this.rootTocUrn;
      },
      placeholder() {
        return 'Search this table of contents...';
      },
      lenses() {
        return { getTitle: item => item.title, getUri: item => item.uri };
      },
      endpoint() {
        return this.$scaife.endpoints.tocEndpoint;
      },
      rootTocUrn() {
        return 'urn:cite:scaife-viewer:toc.demo-root';
      },
      rootTocUrl() {
        return this.getTocUrl(this.rootTocUrn);
      },
      url() {
        if (this.$route.name === 'reader') {
          return this.getTocUrl(this.defaultTocUrn);
        }
        const urn = this.$route.query.urn
          ? this.$route.query.urn
          : this.rootTocUrn;
        return this.getTocUrl(urn);
      },
    },
    methods: {
      filterData(data) {
        this.filtered = data;
      },
      fetchData() {
        fetch(this.url)
          .then(response => response.json())
          .then(data => {
            this.toc = data;
          })
          .catch(error => {
            throw new Error(error.message);
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
</style>
