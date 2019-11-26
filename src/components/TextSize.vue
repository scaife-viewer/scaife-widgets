<template>
  <span
    class="text-size-control"
    :class="[`text-${size}`, { selected }]"
    @click.prevent="$emit('input', size)"
    >Αα</span
  >
</template>

<script>
export default {
  name: "TextSize",
  props: ["value", "size"],
  computed: {
    selected() {
      return this.value === this.size;
    }
  }
};
</script>

<style scoped>
.text-size-control {
  cursor: pointer;
  font-family: "Noto Serif";
  color: #adb5bd;
}
text-size-control.selected {
  color: #343a40;
}
</style>
