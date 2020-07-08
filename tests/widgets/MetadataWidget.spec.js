/* global describe, expect, it  */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import scaifeWidgets from '@/store';
import URN from '@/utils/URN';
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
        passage() {
          return new URN('urn:cts:greekLit:tlg0012.tlg001.msA:1.2.3');
        },
        versionUrn() {
          return 'urn:cts:greekLit:tlg0012.tlg001.msA:';
        },
        metadata() {
          return { textGroupLabel: 'text group' };
        },
      },
    });
    const container = wrapper.find('div');
    expect(container.classes()).toContain('metadata-widget');

    expect(wrapper.find(Metadata).props()).toEqual({
      metadata: { textGroupLabel: 'text group' },
      versionUrn: 'urn:cts:greekLit:tlg0012.tlg001.msA:',
    });
  });
});
