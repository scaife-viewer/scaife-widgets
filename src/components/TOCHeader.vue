<template>
  <div class="lookahead-container u-flex">
    <Lookahead
      :placeholder="placeholder"
      :reducer="reducer"
      :data="toc"
      @filter-data="data => $emit('filter-data', data)"
    />
    <Icon class="icon" name="home" v-if="showingRootToc" disabled />
    <router-link class="icon" :to="getRootTOCPayload()" v-else>
      <Icon name="home" />
    </router-link>
    <span @click.prevent="$emit('toggle-urns')">
      <Icon class="icon urn" name="eye" v-if="!showURNs" />
      <Icon class="icon urn" name="eye-slash" v-else />
    </span>
  </div>
</template>

<script>
  import Icon from '@/components/Icon.vue';
  import Lookahead from '@/components/Lookahead.vue';
  import reducers from '@/utils/reducers';

  export default {
    name: 'TOCHeader',
    props: ['toc', 'showURNs', 'showingRootToc', 'getRootTOCPayload'],
    components: {
      Icon,
      Lookahead,
    },
    computed: {
      reducer() {
        return reducers.tocReducer;
      },
      placeholder() {
        return 'Filter this table of contents...';
      },
    },
  };
</script>
