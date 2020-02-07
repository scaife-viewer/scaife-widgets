<template>
  <aside class="toc-container u-flex">
    <h3>{{ toc.title }}</h3>
    <p>{{ toc.description }}</p>
    <ul>
      <li class="u-flex" v-for="(item, index) in toc.items" :key="index">
        <span>{{ index + 1 }}.</span>
        <router-link :to="{ path: 'reader', query: { urn: item.uri } }">
          {{ item.title }}
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
  export default {
    name: 'TOC',
    props: ['toc'],
  };
</script>

<style lang="scss" scoped>
  .toc-container {
    align-items: flex-start;
    flex-direction: column;
  }
  p {
    margin: 0.66em 0;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    align-items: center;
    margin-bottom: 0.33em;
    span {
      font-size: 10pt;
      color: #69c;
      font-family: 'Noto Sans';
      text-align: right;
      min-width: 2em;
    }
    a {
      margin-left: 1em;
    }
  }
</style>
