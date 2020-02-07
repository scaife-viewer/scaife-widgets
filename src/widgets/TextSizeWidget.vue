<template>
  <div class="text-size-widget u-widget">
    <TextSize :value="textSize" @input="changeTextSize" size="xs" />{{ ' ' }}
    <TextSize :value="textSize" @input="changeTextSize" size="sm" />{{ ' ' }}
    <TextSize :value="textSize" @input="changeTextSize" size="md" />{{ ' ' }}
    <TextSize :value="textSize" @input="changeTextSize" size="lg" />{{ ' ' }}
    <TextSize :value="textSize" @input="changeTextSize" size="xl" />
  </div>
</template>

<script>
  import TextSize from '@/components/TextSize.vue';
  import { WIDGETS_NS, SET_TEXT_SIZE, SET_TEXT_WIDTH } from '@/store/constants';

  export default {
    name: 'TextSizeWidget',
    components: { TextSize },
    scaifeConfig: {
      displayName: 'Text Size',
    },
    computed: {
      textSize() {
        return this.$store.getters[`${WIDGETS_NS}/readerTextSize`];
      },
    },
    methods: {
      changeTextSize(size) {
        this.$store.dispatch(`${WIDGETS_NS}/${SET_TEXT_SIZE}`, { size });
        this.$store.dispatch(`${WIDGETS_NS}/${SET_TEXT_WIDTH}`, {
          width: 'normal',
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .text-size-widget {
    margin: 0 2em;
    flex: 1;
  }
</style>
