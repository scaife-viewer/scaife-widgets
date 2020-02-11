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
      url() {
        return 'https://sv-mini-atlas.herokuapp.com/tocs/toc.oaf-1.json';
      },
    },
    methods: {
      fetchData(url) {
        fetch(url)
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
