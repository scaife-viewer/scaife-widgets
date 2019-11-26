<template>
  <div id="app">
    <HelloWorld msg="hi!"></HelloWorld>
    <Metadata :metadata="{work_title: 'Test'}" />
    <Reader :lines="lines" :textSize="textSize" :textWidth="textWidth" />
    <TextSize :value="textSize" @input="changeTextSize" size="xs" />{{ " " }}
    <TextWidth :value="textWidth" @input="changeTextWidth" width="narrow" />
  </div>
</template>

<script>
  import Vue from "vue"
  import { HelloWorld } from "@scaife-viewer/scaife-widgets";
  import { Metadata } from "@scaife-viewer/scaife-widgets";
  import { Reader } from "@scaife-viewer/scaife-widgets";
  import { TextSize } from "@scaife-viewer/scaife-widgets";
  import { TextWidth } from "@scaife-viewer/scaife-widgets";

  export default {
    name: "app",
    components: {
      HelloWorld,
      Metadata,
      Reader,
      TextSize,
      TextWidth
    },
    computed: {
      textSize() {
        return "md"
      },
      textWidth() {
        return "normal"
      },
      lines() {
        return [
          { label: "1", textContent: "Some text" },
          { label: "2", textContent: "More text" }
        ];
      }
    },
    methods: {
      changeTextSize(size) {
        console.log(size);
      },
      changeTextWidth(width) {
        console.log(width)
      }
    }
  }
</script>

<style src="@scaife-viewer/scaife-widgets/dist/scaife-widgets.css"></style>
