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
      this.fetchData(this.url);
    },
    data() {
      return {
        toc: null,
      };
    },
    computed: {
      endpoint() {
        return 'https://sv-mini-atlas.herokuapp.com/tocs';
      },
      url() {
        // TODO: Temporary logic until the TOC API hardens.
        if (this.$route.name === 'reader') {
          // TODO: Some kind of version specific TOC lookup logic here.
          return `${this.endpoint}/toc.oaf-1.json`;
        }
        const rootToc = `${this.endpoint}/toc.demo-root.json`;
        const tocMap = {
          1: `${this.endpoint}/toc.oaf-1.json`,
          2: `${this.endpoint}/toc.crito-stephanus-jkt-1`,
        };
        return this.$route.query.id ? tocMap[this.$route.query.id] : rootToc;
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
    },
  };
</script>

<style lang="scss" scoped>
  .toc-widget {
    justify-content: flex-start;
    width: 100%;
  }
</style>
