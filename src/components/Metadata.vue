<template>
  <dl class="metadata-container u-flex">
    <dt>Text Group:</dt>
    <dd>{{ metadata.textGroupLabel }}</dd>
    <dt>Work:</dt>
    <dd>{{ metadata.workLabel }}</dd>
    <dt>Version:</dt>
    <dd>{{ metadata.label }}</dd>
    <dt>Language:</dt>
    <dd>{{ metadata.humanLang }}</dd>
    <dt>URN:</dt>
    <dd>{{ versionUrn }}</dd>
  </dl>
</template>

<script>
  export default {
    name: 'Metadata',
    props: ['metadata', 'versionUrn'],
  };
</script>

<style lang="scss" scoped>
  .metadata-container {
    flex-direction: column;
    > * {
      font-size: 0.8em;
    }
  }
</style>
