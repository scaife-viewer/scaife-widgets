/* global describe, expect, it  */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import scaifeWidgets from '@/store';
import MetadataWidget from '@/widgets/MetadataWidget.vue';
import Metadata from '@/components/Metadata.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('MetadataWidget.vue', () => {
  it('Passes props and renders Metadata.', () => {
    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(MetadataWidget, {
      store,
      localVue,
      computed: {
        metadata() {
          return { workTitle: 'some title' };
        },
      },
    });
    const container = wrapper.find('div');
    expect(container.classes()).toContain('metadata-widget');

    expect(wrapper.find(Metadata).props()).toStrictEqual({
      workTitle: 'some title',
    });
  });
});
