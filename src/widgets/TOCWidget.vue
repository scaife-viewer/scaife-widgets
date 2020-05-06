<template>
  <div class="toc-widget u-widget u-flex" v-if="toc">
    <div class="lookahead-container u-flex">
      <Lookahead
        :placeholder="placeholder"
        :reducer="reducer"
        :data="toc"
        @filter-data="filterData"
      />
      <Icon class="icon" name="home" v-if="showingRootToc" disabled />
      <router-link class="icon" :to="returnToRootPayload" v-else>
        <Icon name="home" />
      </router-link>
      <span @click.prevent="toggleURNs">
        <Icon class="icon urn" name="eye" v-if="!showURNs" />
        <Icon class="icon urn" name="eye-slash" v-else />
      </span>
    </div>
    <TOC
      :toc="filtered || toc"
      :context="context"
      :passage="passage"
      :showURNs="showURNs"
    />
  </div>
</template>

<script>
  import Icon from '@/components/Icon.vue';
  import Lookahead from '@/components/Lookahead.vue';
  import TOC from '@/components/TOC.vue';
  import { WIDGETS_NS } from '@/store/constants';
  import reducers from '@/utils/reducers';

  export default {
    name: 'TOCWidget',
    components: {
      Icon,
      Lookahead,
      TOC,
    },
    scaifeConfig: {
      displayName: 'Table of Contents',
    },
    // @@@ remove watchers in favor of tocUrn computed property
    // watch: {
    //   $route: 'fetchData',
    //   defaultTocUrn: 'fetchData',
    // },
    data() {
      return {
        readerKind: '',
        filtered: null,
        showURNs: false,
      };
    },
    computed: {
      context() {
        return this.$route.name;
      },
      placeholder() {
        return 'Search this table of contents...';
      },
      passage() {
        // @@@ we may need to tie this to leftUrn
        // return this.$store.getters[`${WIDGETS_NS}/passage`];
        return {
          absolute: this.$route.params.leftUrn,
        };
      },
      metadata() {
        return this.$store.getters[`${WIDGETS_NS}/metadata`];
      },
      reducer() {
        return reducers.tocReducer;
      },
      endpoint() {
        // @@@ cannot get the $scaife.endpoints option to work
        // at the moment.
        // return this.$scaife.endpoints.tocEndpoint;
        return '//localhost:8000/atlas/graphql/';
      },
      gqlQuery() {
        return `
          {
            tocs(urn:  "${this.tocUrn}") {
              edges {
                node {
                  title
                  description
                  urn
                  entries {
                    edges {
                      node {
                        title
                        uri
                      }
                    }
                  }
                }
              }
            }
          }
        `;
      },
      returnToRootPayload() {
        return this.context == 'tocs'
          ? { path: 'tocs' }
          : this.getReaderContextWithoutToc(this.passage.absolute);
      },
      showingRootToc() {
        if (this.context == 'tocs') {
          return !this.$route.query.urn;
        }
        if (this.$route.query.toc) {
          return this.$route.query.toc === this.defaultTocUrn ? true : false;
        }
        return this.defaultTocUrn
          ? this.url === this.getTocUrl(this.defaultTocUrn)
          : this.url === this.getTocUrl(this.rootTocUrn);
      },
      defaultTocUrn() {
        return this.metadata && this.metadata.defaultTocUrn
          ? this.metadata.defaultTocUrn
          : null;
      },
      rootTocUrn() {
        // @@@ site level or dynamic from ATLAS
        return 'urn:cite:dsp-dar:toc.root';
      },
      tocUrn() {
        // @@@ refactor similar to what we're doing with getTocUrl
        const tocUrn =
          this.context === 'tocs'
            ? this.$route.query.urn
            : this.$route.query.toc;
        return tocUrn ? tocUrn : this.defaultTocUrn || this.rootTocUrn;
      },
      url() {
        if (this.$route.query.toc) {
          return this.getTocUrl(this.$route.query.toc);
        }
        if (this.context === 'reader') {
          return this.getTocUrl(this.defaultTocUrn || this.rootTocUrn);
        }
        return this.getTocUrl(this.$route.query.urn || this.rootTocUrn);
      },
      toc() {
        if (!this.gqlData) {
          return null;
        }
        const toc = {
          ...this.gqlData.tocs.edges[0].node,
        };
        toc.items = toc.entries.edges.map(entry => entry.node);
        return toc;
      },
    },
    methods: {
      toggleURNs() {
        this.showURNs = !this.showURNs;
      },
      filterData(data) {
        this.filtered = data;
      },
      // fetchData() {
      //   // fetch(this.url)
      //   //   .then(response => response.json())
      //   //   .then(data => {
      //   //     this.toc = data;
      //   //     this.filtered = null;
      //   //   })
      //   //   .catch(error => {
      //   //     // eslint-disable-next-line no-console
      //   //     console.log(error.message);
      //   //   });
      // },
      getTocUrl(tocUrn) {
        return `${this.endpoint}/tocs/${tocUrn.split(':').slice(-1)}.json`;
      },
      getReaderContextWithoutToc(passageUrn) {
        if (this.readerKind === 'ssvt') {
          return {
            path: `/reader/${passageUrn}/`,
          };
        }
        return {
          path: 'reader',
          query: { urn: passageUrn },
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  .toc-widget {
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
  }
  .lookahead-container {
    align-items: center;
    margin-bottom: 0.66em;
    .form-group {
      width: 90%;
    }
  }
  .icon {
    color: black;
    margin-left: 0.66em;
    &.urn {
      cursor: pointer;
    }
  }
</style>
