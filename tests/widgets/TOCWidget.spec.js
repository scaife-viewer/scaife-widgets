/* global jest, describe, expect, it  */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import scaifeWidgets from '@/store';
import TOCWidget from '@/widgets/TOCWidget.vue';
import TOC from '@/components/TOC.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const toc = {
  '@id': 'urn:cite:scaife-viewer:toc.1',
  title: 'Some Table of Contents',
  description: 'A test fixture for a table of contents.',
  items: [
    {
      title: 'Title 1',
      uri: 'urn:cts:1:1.1.1:1-2',
    },
    {
      title: 'Title 2',
      uri: 'urn:cts:1:1.1.2:1-2',
    },
  ],
};

describe('TOCWidget.vue', () => {
  it('Parses a URL, passes props and renders a TOC.', () => {
    const fetchData = jest.fn();

    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(TOCWidget, {
      store,
      localVue,
      methods: { fetchData },
    });
    wrapper.setData({ toc });

    expect(fetchData).toHaveBeenCalledWith(
      'https://sv-mini-atlas.herokuapp.com/tocs/toc.oaf-1.json',
    );

    const container = wrapper.find('div');
    expect(container.classes()).toContain('toc-widget');
    expect(wrapper.find(TOC).props()).toStrictEqual({ toc: toc });
  });
});
