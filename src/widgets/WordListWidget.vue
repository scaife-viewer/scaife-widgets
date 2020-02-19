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
        // return this.metadata.lang === 'grc';
        return true;
      },
      metadata() {
        return this.$store.getters[`${WIDGETS_NS}/metadata`];
      },
      passage() {
        return this.$store.getters[`${WIDGETS_NS}/passage`];
      },
      endpoint() {
        return 'https://vocab.perseus.org';
      },
      url() {
        const url = `${this.endpoint}/word-list/${this.passage.absolute}/json`;
        const params = 'page=all&amp;o=1';
        return `${url}/?${params}`;
      },
    },
    methods: {
      fetchData(url) {
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
            // eslint-disable-next-line no-console
            console.error(error);
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
