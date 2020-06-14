<script>
  import TOCWidget from '@/widgets/TOCWidget.vue';

  export default {
    name: 'TOCViewWidget',
    // @@@ we may want to use mixins or
    // https://github.com/kaorun343/vue-property-decorator
    extends: TOCWidget,
    scaifeConfig: {
      displayName: 'Table of Contents',
    },
    computed: {
      // always use rootTocUrn
      initialTocUrn() {
        return this.rootTocUrn;
      },
    },
    methods: {
      getItemPayload(urn) {
        if (this.isCiteUrn(urn)) {
          return {
            to: 'tocs',
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
    },
  };
</script>
