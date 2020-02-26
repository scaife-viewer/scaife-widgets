<template>
  <div class="form-group">
    <div class="input-group u-flex">
      <input
        type="search"
        class="form-control"
        v-model="query"
        :placeholder="placeholder"
        @input="onInput"
      />
    </div>
  </div>
</template>

<script>
  import debounce from 'lodash.debounce';

  export default {
    props: ['placeholder', 'reducer', 'data'],
    data() {
      return {
        query: '',
        results: null,
      };
    },
    watch: {
      query: 'updateData',
    },
    methods: {
      updateData() {
        this.results = this.reducer(this.data, this.query);
        this.$emit('filter-data', this.results);
      },
      onInput() {
        debounce(e => {
          this.query = e.target.value;
        }, 500);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .form-group {
    margin-bottom: 0.66em;
  }
</style>
