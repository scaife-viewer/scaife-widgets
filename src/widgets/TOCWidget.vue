<template>
  <div class="toc-widget u-widget u-flex">
    <TOC :toc="toc" v-if="toc" />
  </div>
</template>

<script>
  import TOC from '@/components/TOC.vue';

  export default {
    name: 'TOCWidget',
    components: { TOC },
    scaifeConfig: {
      displayName: 'Table of Contents',
    },
    created() {
      this.fetchData();
    },
    watch: {
      $route: 'fetchData',
    },
    data() {
      return {
        toc: null,
      };
    },
    computed: {
      endpoint() {
        return 'https://mini-stack-a-feature-se-j47yu0.herokuapp.com';
      },
      rootToc() {
        return `${this.endpoint}/tocs/toc.demo-root.json`;
      },
      url() {
        if (this.$route.name === 'reader') {
          // TODO: Some kind of version specific TOC lookup logic goes here.
          return `${this.endpoint}/tocs/toc.oaf-1.json`;
        }
        const urn = this.$route.query ? this.$route.query.urn : false;
        return urn
          ? `${this.endpoint}/tocs/${urn.split(':').slice(-1)}.json`
          : this.rootToc;
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
            throw new Error(error.message);
          });
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
