<template>
  <div class="new-alexandria-widget u-widget u-flex">
    <NewAlexandria :comments="comments" />
  </div>
</template>

<script>
  import qs from 'query-string';

  import NewAlexandria from '@/components/NewAlexandria.vue';
  import { WIDGETS_NS } from '@/store/constants';

  export default {
    name: 'NewAlexandriaWidget',
    scaifeConfig: {
      displayName: 'New Alexandria Commentary',
    },
    components: {
      NewAlexandria,
    },
    created() {
      this.fetchData(this.url);
    },
    data() {
      return {
        comments: null,
      };
    },
    watch: {
      passage: 'fetchData',
    },
    computed: {
      passage() {
        return this.$store.getters[`${WIDGETS_NS}/passage`];
      },
      endpoint() {
        return 'https://commentary-api.chs.harvard.edu/graphql';
      },
      params() {
        const query = `{
          commentsOn(urn: "${this.passage.absolute}") {
            _id
            updated
            latestRevision {
              title
              text
            }
            commenters {
              _id
              name
            }
          }
        }`;
        return qs.stringify({ query });
      },
      url() {
        return `${this.endpoint}?${this.params}`;
      },
    },
    methods: {
      fetchData(url) {
        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.comments = data.data.commentsOn;
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
  .new-alexandria-widget {
    width: 100%;
    img {
      max-width: 100%;
    }
  }
</style>
