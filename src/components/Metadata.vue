<template>
  <aside class="metadata-container u-flex">
    <h3 class="work-title">{{ workTitle }}</h3>
  </aside>
</template>

<script>
  export default {
    name: 'Metadata',
    props: ['workTitle'],
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
