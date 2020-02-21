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
    props: ['placeholder', 'lenses', 'data'],
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
      onClear() {
        this.query = '';
      },
      updateData() {
        this.results = this.filter(this.data);
        this.$emit('filter-data', this.results);
      },
      onInput() {
        debounce(e => {
          this.query = e.target.value;
        }, 500);
      },
      filter(data) {
        return {
          ...data,
          items: this.reduce(data.items),
        };
      },
      reduce(items) {
        return items.filter(item =>
          Object.values(this.lenses)
            .map(getter =>
              getter(item)
                .toLowerCase()
                .includes(this.query.toLowerCase()),
            )
            .some(Boolean),
        );
      },
    },
  };
</script>

<style lang="scss" scoped>
  .form-group {
    margin-bottom: 0.66em;
  }
</style>
