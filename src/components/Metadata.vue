<template>
  <div class="metadata-container u-flex">
    <div class="metadata-row">
      <div class="label">Text Group:</div>
      <div class="value">{{ metadata.textGroupLabel }}</div>
    </div>
    <div class="metadata-row">
      <div class="label">Work:</div>
      <div class="value">{{ metadata.workLabel }}</div>
    </div>
    <div class="metadata-row">
      <div class="label">Version:</div>
      <div class="value">{{ metadata.label }}</div>
    </div>
    <div class="metadata-row">
      <div class="label">Language:</div>
      <div class="value">{{ metadata.humanLang }}</div>
    </div>
    <div class="metadata-row">
      <div class="label">URN:</div>
      <tt class="version-urn">{{ versionUrn }}</tt>
    </div>
  </div>
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
      font-size: 14px;
    }
    .metadata-row {
      > .label {
        color: $gray-600;
      }
      > .value {
        font-family: $font-family-serif;
      }
      > .version-urn,
      .value {
        margin-top: 0.25em;
      }
      flex-flow: row nowrap;
      margin: 0.5em 0;
    }
  }
</style>
