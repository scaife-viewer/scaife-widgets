<template>
  <div
    class="reader"
    :class="['text', `text-${textSize}`, `text-width-${textWidth}`]"
  >
    <div
      class="line u-flex"
      v-for="(line, index) in lines"
      :key="`${index}-${line.label}`"
    >
      <div class="line-ref">{{ line.label }}</div>
      <div class="line-text" v-html="line.textContent"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reader",
  props: ["lines", "textSize", "textWidth"]
};
</script>

<style scoped>
.u-flex {
  display: flex;
}
.reader {
  flex-direction: column;
}
.text {
  font-family: "Noto Serif";
  margin: 1em 0;
}
.text.text-xs {
  line-height: 1.5;
}
.text.text-sm {
  line-height: 1.6;
}
.text.text-md {
  line-height: 1.7;
}
.text.text-lg {
  line-height: 1.8;
}
.text.text-xl {
  line-height: 1.9;
}
.text.line {
  display: flex;
  align-items: center;
}
.text.line.line-ref {
  font-size: 10pt;
  color: #69c;
  font-family: "Noto Sans";
  flex-basis: 4.5em;
  text-align: right;
}
.text.line.line-text {
  margin-left: 1em;
}
.widget-sidebar.text {
  font-size: 14px;
  line-height: 1.6;
}
.text-xs {
  font-size: 12px;
}
.text-sm {
  font-size: 14px;
}
.text-md {
  font-size: 16px;
}
.text-lg {
  font-size: 20px;
}
.text-xl {
  font-size: 24px;
}
.text-width-narrow {
  max-width: 40%;
}
.text-width-normal {
  max-width: 60%;
}
.text-width-wide {
  max-width: 80%;
}
.text-width-full {
  max-width: 100%;
}
</style>
