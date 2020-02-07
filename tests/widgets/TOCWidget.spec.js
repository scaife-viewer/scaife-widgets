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
  it('Passes props and renders a TOC.', () => {
    // Mock out fetch.
    // TODO: Be on the lookout for a more convenient way to do this.
    const mockDataResponse = {};
    const mockJsonPromise = Promise.resolve(mockDataResponse);
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(TOCWidget, {
      store,
      localVue,
    });
    wrapper.setData({ toc: toc });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://sv-mini-atlas.herokuapp.com/tocs/toc.oaf-1.json',
    );

    const container = wrapper.find('div');
    expect(container.classes()).toContain('toc-widget');

    expect(wrapper.find(TOC).props()).toStrictEqual({ toc: toc });

    // Tear down.
    global.fetch.mockClear();
    delete global.fetch;
  });
});
