<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    scaifeConfig: {
      displayName: 'Hello, World',
    },
    props: {
      msg: String,
    },
  };
</script>

<style lang="scss" scoped>
  .hello {
    color: red;
  }
</style>
