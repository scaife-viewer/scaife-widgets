<template v-if="urn">
  <nav class="paginator">
    <router-link
      v-if="urn"
      :key="urn.toString()"
      :to="{ path: 'reader', query: { urn: urn.toString() } }"
    >
      <Icon :name="icon" />
    </router-link>
  </nav>
</template>

<script>
  import Icon from '@/components/Icon.vue';

  export default {
    name: 'Paginator',
    props: ['urn', 'direction'],
    components: {
      Icon,
    },
    computed: {
      icon() {
        return `chevron-${this.direction}`;
      },
    },
  };
</script>

<style lang="scss" scoped>
  nav.paginator {
    min-width: 5em;
    width: auto;
    position: sticky;
    top: 2em;
    text-align: center;
    a {
      &:hover {
        color: $gray-800;
      }
      color: $gray-500;
    }
  }
</style>
