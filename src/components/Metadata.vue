<template functional>
  <h1 class="work-title">{{ props.metadata.work_title }}</h1>
</template>

<script>
export default {
  name: "Metadata",
  props: {
    metadata: {
      required: true,
      type: Object
    }
  }
};
</script>

<style scoped>
h1.work-title {
  font-size: 1.75em;
  margin: 0;
}
</style>
