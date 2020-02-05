<template>
  <div class="metadata-widget u-widget u-flex">
    <Metadata v-if="metadata" :workTitle="workTitle" :workUrn="workUrn" />
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
      metadata() {
        return this.$store.getters[`${WIDGETS_NS}/metadata`];
      },
      workTitle() {
        return this.metadata.workTitle;
      },
      workUrn() {
        return this.metadata.workUrn;
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
