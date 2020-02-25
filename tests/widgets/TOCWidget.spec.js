/* global jest, describe, expect, it  */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import scaifeWidgets from '@/store';
import TOCWidget from '@/widgets/TOCWidget.vue';
import TOC from '@/components/TOC.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const endpoint = 'https://mini-stack-a-feature-se-j47yu0.herokuapp.com';
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
  it('Parses a URL, passes props and renders a TOC on the reader.', () => {
    const fetchData = jest.fn();
    const $route = { name: 'reader' };

    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(TOCWidget, {
      store,
      localVue,
      methods: { fetchData },
      mocks: { $route },
    });
    wrapper.setData({ toc });

    expect(fetchData).toHaveBeenCalledWith(`${endpoint}/tocs/toc.demo-root.json`);

    const container = wrapper.find('div');
    expect(container.classes()).toContain('toc-widget');
    expect(wrapper.find(TOC).props()).toStrictEqual({ toc: toc });
  });

  it('Renders the root TOC when no query is given', () => {
    const fetchData = jest.fn();
    const $route = { name: 'tocs', query: { urn: '' } };

    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(TOCWidget, {
      store,
      localVue,
      methods: { fetchData },
      mocks: { $route },
    });
    wrapper.setData({ toc });

    expect(fetchData).toHaveBeenCalledWith(
      `${endpoint}/tocs/toc.demo-root.json`,
    );

    const container = wrapper.find('div');
    expect(container.classes()).toContain('toc-widget');
    expect(wrapper.find(TOC).props()).toStrictEqual({ toc: toc });
  });

  it('Conditionally renders a TOC based on the route and query.', () => {
    const fetchData = jest.fn();
    const $route = {
      name: 'tocs',
      query: { urn: 'urn:cite:scaife-viewer:toc.oaf-1' },
    };

    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(TOCWidget, {
      store,
      localVue,
      methods: { fetchData },
      mocks: { $route },
    });
    wrapper.setData({ toc });

    expect(fetchData).toHaveBeenCalledWith(`${endpoint}/tocs/toc.oaf-1.json`);

    const container = wrapper.find('div');
    expect(container.classes()).toContain('toc-widget');
    expect(wrapper.find(TOC).props()).toStrictEqual({ toc: toc });
  });
});
