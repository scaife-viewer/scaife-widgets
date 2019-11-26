<template>
  <span
    :class="['text-width-control', { active }]"
    @click.prevent="$emit('input', width)"
    >{{ text }}</span
  >
</template>

<script>
export default {
  name: "TextWidth",
  props: ["value", "width"],
  computed: {
    active() {
      return this.value === this.width;
    },
    text() {
      return this.width.charAt(0).toUpperCase() + this.width.slice(1);
    }
  }
};
</script>

<style scoped>
.text-width-control {
  font-family: "Noto Serif";
  cursor: pointer;
  color: #adb5bd;
  font-size: 14px;
  padding-right: 5px;
}
.text-width-control.active {
  color: #000;
}
</style>
