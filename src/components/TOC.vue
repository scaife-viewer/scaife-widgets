<template>
  <aside class="toc-container">
    <h3>{{ toc.title }}</h3>
    <p class="u-legend">{{ toc.description }}</p>
    <div class="u-grid toc-grid" v-if="toc.items.length">
      <template v-for="(item, index) in toc.items">
        <span :key="`index-${index}`" class="ref">{{ index + 1 }}.</span>
        <div :key="`item-${index}`" class="item u-flex">
          <router-link :to="getTargetRoute(item.uri)">
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
      getReaderDescriptorObjSSVT(uri) {
        const passageUrn = this.isCiteUrn(uri) ? this.passage.absolute : uri;
        const path = `/reader/${passageUrn}/`;
        const queryParams = {
          ...this.$route.query,
        };
        if (this.isCiteUrn('uri')) {
          queryParams.toc = uri;
        }
        return {
          path: path,
          query: queryParams,
        };
      },
      getReaderDescriptorObj(uri) {
        const queryParams = { ...this.$route.query };
        if (this.isCiteUrn(uri)) {
          queryParams.toc = uri;
        } else {
          queryParams.urn = uri;
        }
        return { path: 'reader', query: queryParams };
      },
      getTargetRouteTocs(uri) {
        if (!this.isCiteUrn(uri)) {
          return this.getTargetRouteReader(uri);
        }
        return {
          path: 'tocs',
          query: {
            ...this.$route.query,
            urn: uri,
          },
        };
      },
      getTargetRouteReader(uri) {
        return this.readerKind === 'ssvt'
          ? this.getReaderDescriptorObjSSVT(uri)
          : this.getReaderDescriptorObj(uri);
      },
      getTargetRoute(uri) {
        return this.context === 'tocs'
          ? this.getTargetRouteTocs(uri)
          : this.getTargetRouteReader(uri);
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
