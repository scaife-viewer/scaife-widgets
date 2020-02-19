<template>
  <aside class="word-list-container u-flex">
    <div slot="sticky">
      <p class="u-legend">
        Number in parentheses is frequency per 10k in this work.
      </p>
    </div>
    <div v-for="word in wordList" :key="word.text" class="word-list">
      <p class="u-flex">
        <span class="w">{{ word.text }}</span>
        <span class="df">{{ word.shortdef }}</span>
        <span v-if="word.frequency" class="fr">({{ word.frequency }})</span>
      </p>
    </div>
  </aside>
</template>

<script>
  export default {
    name: 'WordList',
    props: ['wordList'],
  };
</script>

<style lang="scss" scoped>
  @import '@/styles/_variables.scss';

  aside {
    flex-direction: column;
  }
  .word-list > p {
    font-size: 0.85rem;
    margin: 0.165em 0;
    span.w {
      font-weight: 700;
    }
    span.df {
      color: $gray-600;
      margin-left: auto;
      margin-right: 0.66em;
    }
  }
</style>
