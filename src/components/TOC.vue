<template>
  <aside class="toc-container u-flex">
    <h3>{{ toc.title }}</h3>
    <p>{{ toc.description }}</p>
    <ul>
      <li class="u-flex" v-for="(item, index) in toc.items" :key="index">
        <span class="ref">{{ index + 1 }}.</span>
        <div class="item u-flex">
          <router-link
            :to="{
              path: isCiteUrn(item.uri) ? 'tocs' : 'reader',
              query: { urn: item.uri },
            }"
          >
            {{ item.title }}
          </router-link>
          <span>
            <tt>{{ item.uri }}</tt>
          </span>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script>
  export default {
    name: 'TOC',
    props: ['toc'],
    methods: {
      isCiteUrn(urn) {
        return urn.startsWith('urn:cite:');
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
  p {
    margin: 0.66em 0;
  }
  ul {
    margin: 0;
    padding: 0;
    width: 100%;
  }
  li {
    align-items: baseline;
    margin-bottom: 0.33em;
    span.ref {
      font-size: 10pt;
      color: #69c;
      font-family: 'Noto Sans';
      text-align: right;
      min-width: 2em;
    }
  }
  .item {
    flex-wrap: wrap;
    width: 100%;
    > * {
      margin-left: 1em;
      flex-shrink: 0;
      flex: 1 0 48%;
    }
  }
</style>
