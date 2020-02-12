<template>
  <aside class="metadata-container u-flex">
    <h3 class="work-title">{{ metadata.workTitle }}</h3>
    <tt class="work-urn">{{ metadata.workUrn }}</tt>
  </aside>
</template>

<script>
  export default {
    name: 'Metadata',
    props: ['metadata'],
  };
</script>

<style lang="scss" scoped>
  .metadata-container {
    flex-direction: column;
    > * {
      margin: 0 0 0.33em 0;
    }
  }
</style>
