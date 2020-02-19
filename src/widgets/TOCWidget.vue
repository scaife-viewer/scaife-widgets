<template>
  <div class="toc-widget u-widget u-flex">
    <TOC :toc="toc" v-if="toc" />
  </div>
</template>

<script>
  import TOC from '@/components/TOC.vue';
  import { WIDGETS_NS } from '@/store/constants';

  export default {
    name: 'TOCWidget',
    components: { TOC },
    scaifeConfig: {
      displayName: 'Table of Contents',
    },
    created() {
      this.fetchData(this.url);
    },
    watch: {
      $route: 'fetchData',
      defaultTocUrn: 'fetchData',
    },
    data() {
      return {
        toc: null,
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
      endpoint() {
        return this.$store.state[`${WIDGETS_NS}`].tocEndpoint;
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
      fetchData() {
        fetch(this.url)
          .then(response => response.json())
          .then(data => {
            this.toc = data;
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.error(error);
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
    justify-content: flex-start;
    width: 100%;
  }
</style>
