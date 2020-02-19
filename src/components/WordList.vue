<template>
  <aside class="word-list-container u-flex">
    <div slot="sticky">
      <p class="legend">
        Number in parentheses is frequency per 10k in this work.
      </p>
    </div>
    <div v-for="word in wordList" :key="word.text">
      <p>
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
  aside {
    flex-direction: column;
  }
</style>
