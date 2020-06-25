<template>
  <div class="metadata-widget u-widget u-flex">
    <Metadata v-if="metadata" :metadata="metadata" />
  </div>
</template>

<script>
  import Metadata from '@/components/Metadata.vue';
  import { WIDGETS_NS } from '@/store/constants';

  export default {
    name: 'MetadataWidget',
    components: {
      Metadata,
    },
    scaifeConfig: {
      displayName: 'Metadata',
    },
    computed: {
      passage() {
        return this.$store.getters[`${WIDGETS_NS}/passage`];
      },
      metadata() {
        return {
          ...this.$store.getters[`${WIDGETS_NS}/metadata`],
          versionUrn: this.passage.version,
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  .metadata-widget {
    justify-content: flex-start;
    width: 100%;
  }
</style>

