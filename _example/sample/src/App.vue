<template>
  <div id="app">
    <HelloWorld msg="hi!"></HelloWorld>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { HelloWorld } from "@scaife-viewer/scaife-widgets";

  export default {
    name: 'app',
    components: {
      HelloWorld
    }
  }
</script>
