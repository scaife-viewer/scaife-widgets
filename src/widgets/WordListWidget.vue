<template>
  <div class="word-list-widget u-widget u-flex">
    <WordList
      :wordList="wordList"
      :selectedLemmas="selectedLemmas"
      :usedFallbackAPI="usedFallbackAPI"
      v-if="wordList && wordList.length > 0"
    />
  </div>
</template>

<script>
  import qs from 'query-string';

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
        usedFallbackAPI: false,
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
      selectedLemmas() {
        return this.$store.getters[`${WIDGETS_NS}/selectedLemmas`];
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
      fallbackUrl() {
        const params = qs.stringify({ l: this.selectedLemmas });
        return `${this.endpoint}/lemma/json?${params}`;
      },
      url() {
        const url = `${this.endpoint}/word-list/${this.passage.absolute}/json`;
        const params = 'page=all&amp;o=1';
        return `${url}/?${params}`;
      },
    },
    methods: {
      fetchFallbackData(url) {
        // TODO: Removed json trailing / here...
        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.usedFallbackAPI = true;
            this.wordList = data.lemmas;
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.error(error);
          });
      },
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
            if (error.status === 404) {
              if (this.selectedLemmas && this.selectedLemmas.length > 0) {
                this.fetchFallbackData(this.fallbackUrl);
              } else {
                // eslint-disable-next-line no-console
                console.error(error);
              }
            }
          });
      },
    },
  };
</script>

<style lang="scss"></style>
