<template functional>
  <h1 class="work-title">{{ props.workTitle }}</h1>
</template>

<script>
export default {
  name: "Metadata",
  props: {
    workTitle: {
      required: true,
      type: String
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
