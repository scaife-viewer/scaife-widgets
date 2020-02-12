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
        return 'https://sv-mini-atlas.herokuapp.com';
      },
      rootToc() {
        return `${this.endpoint}/tocs/demo-root.json`;
      },
      url() {
        // TODO: Temporary (hack) logic until the TOC API hardens.
        if (this.$route.name === 'reader') {
          // TODO: Some kind of version specific TOC lookup logic here.
          return `${this.endpoint}/tocs/toc.oaf-1.json`;
        }
        const tocMap = {
          1: `${this.endpoint}/tocs/toc.oaf-1.json`,
          2: `${this.endpoint}/tocs/toc.crito-stephanus-jkt-1`,
        };
        return this.$route.query.id
          ? tocMap[this.$route.query.id]
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
