<template>
  <div class="word-list-widget u-widget u-flex">
    <WordList :wordList="wordList" v-if="wordList && wordList.length > 0" />
  </div>
</template>

<script>
  import WordList from '@/components/WordList.vue';
  import { WIDGETS_NS } from '@/store/constants';

  export default {
    name: 'WordListWidget',
    scaifeConfig: {
      displayName: 'Word List',
    },
    components: {
      WordList,
    },
    created() {
      if (this.enabled) {
        this.fetchData(this.url);
      }
    },
    data() {
      return {
        wordList: [],
      };
    },
    watch: {
      passage: 'fetchData',
    },
    computed: {
      enabled() {
        // TODO: Stubbed until metadata ingestion update.
        // return this.passage && this.metadata.lang === 'grc';
        return this.passage ? true : false;
      },
      metadata() {
        return this.$store.getters[`${WIDGETS_NS}/metadata`];
      },
      passage() {
        return this.$store.getters[`${WIDGETS_NS}/passage`];
      },
      endpoint() {
        return 'https://vocab.perseus.org/word-list';
      },
      url() {
        const params = 'page=all&amp;o=1';
        return this.passage ?
          `${this.endpoint}/${this.passage.absolute}/json/?${params}`
          : null;
      },
    },
    methods: {
      fetchData(url) {
        /* eslint-disable no-console */
        console.log(`WORD LIST ---> url passed in: ${JSON.stringify(url)}`);
        console.log(`WORD LIST ---> this.url is: ${JSON.stringify(this.url)}`);
        /* eslint-enable no-console */
        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.wordList = data.lemmas.map(lemma => ({
              text: lemma.lemma_text,
              shortdef: lemma.shortdef,
              frequency: lemma.work_frequency.toFixed(2),
            }));
          })
          .catch(error => {
            throw new Error(error.message);
          });
      },
    },
  };
</script>

<style lang="scss">
  .word-list-widget {
    width: 100%;
  }
</style>
