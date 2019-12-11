<template>
  <div id="app">
    <HelloWorld msg="hi!"></HelloWorld>
    <Icon name="chevron-left" fixed-width />
    <Metadata workTitle="test" />
    <Paginator :urn="previous" direction="left" />
    <TextSize :value="textSize" @input="changeTextSize" size="xs" />{{ " " }}
    <TextWidth :value="textWidth" @input="changeTextWidth" width="narrow" />
    <TextSizeWidget />
    <TextWidthWidget />
  </div>
</template>

<script>
import {
  HelloWorld,
  Icon,
  Metadata,
  Paginator,
  TextSize,
  TextWidth,
  URN,
  TextSizeWidget,
  TextWidthWidget
} from "@scaife-viewer/scaife-widgets";
export default {
  name: "app",
  components: {
    HelloWorld,
    Icon,
    Metadata,
    Paginator,
    TextSize,
    TextWidth,
    TextSizeWidget,
    TextWidthWidget
  },
  computed: {
    textSize() {
      return "md";
    },
    textWidth() {
      return "normal";
    },
    previous() {
      return new URN("urn:cts:greekLit:tlg0012.tlg001.msA:1.1");
    }
  },
  methods: {
    changeTextSize(size) {
      console.log(size);
    },
    changeTextWidth(width) {
      console.log(width);
    }
  }
};
</script>

<style src="@scaife-viewer/scaife-widgets/dist/scaife-widgets.css"></style>
