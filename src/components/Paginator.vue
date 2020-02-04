<template v-if="urn">
  <nav class="paginator">
    <router-link
      v-if="urn"
      :key="urn.absolute"
      :to="{ path: 'reader', query: { urn: `${urn.absolute}` } }"
    >
      <Icon :name="icon" fixed-width />
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

<style scoped>
  nav.paginator {
    min-width: 5em;
    width: auto;
    position: sticky;
    top: 2em;
    text-align: center;
  }
</style>
