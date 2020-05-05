<template>
  <aside class="toc-container">
    <h3>{{ toc.title }}</h3>
    <p class="u-legend">{{ toc.description }}</p>
    <div class="u-grid toc-grid" v-if="toc.items.length">
      <template v-for="(item, index) in toc.items">
        <span :key="`index-${index}`" class="ref">{{ index + 1 }}.</span>
        <div :key="`item-${index}`" class="item u-flex">
          <router-link :to="getPayload(item.uri)">
            {{ item.title }}
          </router-link>
          <span v-if="showURNs">
            <tt>{{ item.uri }}</tt>
          </span>
        </div>
      </template>
    </div>
    <h4 v-else>No results.</h4>
  </aside>
</template>

<script>
  export default {
    name: 'TOC',
    data: function() {
      return {
        // @@@ ssvt or scaife-skeleton, passed via $scaife
        readerKind: '',
      };
    },
    props: ['toc', 'context', 'passage', 'showURNs'],
    methods: {
      isCiteUrn(urn) {
        return urn.startsWith('urn:cite:');
      },
      getTocsContextPayload(tocUrn) {
        return { path: 'tocs', query: { tocUrn } };
      },
      getReaderContextWithToc(passageUrn, tocUrn) {
        if (this.readerKind === 'ssvt') {
          return {
            path: `/reader/${passageUrn}/`,
            query: { toc: tocUrn },
          };
        }
        return {
          path: 'reader',
          query: { urn: passageUrn, toc: tocUrn },
        };
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
      getReaderContextPayload(urn, tocUrn) {
        return tocUrn
          ? this.getReaderContextWithToc(urn, tocUrn)
          : this.getReaderContextWithoutToc(urn);
      },
      getPayload(urn) {
        // @@@ support top level tocs endpoint
        if (this.isCiteUrn(urn)) {
          return this.context === 'tocs'
            ? this.getTocsContextPayload(urn)
            : this.getReaderContextPayload(this.passage.absolute, urn);
        }
        return this.getReaderContextPayload(urn, this.$route.query.toc);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .toc-container {
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
  }
  .toc-grid {
    align-items: baseline;
    grid-template-columns: auto 9.25fr;
    grid-column-gap: 1em;
    > * {
      margin-bottom: 0.33em;
    }
  }
  p {
    margin: 0.66em 0;
  }
  span.ref {
    font-size: 10pt;
    color: #69c;
    font-family: 'Noto Sans';
    text-align: left;
  }
  .item {
    flex-direction: column;
  }
</style>
