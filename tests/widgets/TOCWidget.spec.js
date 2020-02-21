/* global jest, describe, expect, it  */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import scaifeWidgets from '@/store';
import TOCWidget from '@/widgets/TOCWidget.vue';
import TOC from '@/components/TOC.vue';
import Lookahead from '@/components/Lookahead.vue';

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
  it('Parses a URL and catches a failed request.', async () => {
    const $route = { name: 'reader' };
    const $scaife = { endpoints: { tocEndpoint: endpoint } };
    global.fetch = jest.fn().mockRejectedValue({ status: 500 });

    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(TOCWidget, {
      store,
      localVue,
      mocks: { $route, $scaife },
    });

    await wrapper.vm.$nextTick();

    expect(global.fetch).toBeCalledWith(`${endpoint}/tocs/toc.demo-root.json`);

    const container = wrapper.find('div');
    expect(container.classes()).toContain('toc-widget');
    expect(wrapper.find(TOC).exists()).toBeFalsy();
  });

  it('Parses a URL, fetches data and renders a reader TOC.', async () => {
    const $route = { name: 'reader' };
    const $scaife = { endpoints: { tocEndpoint: endpoint } };
    global.fetch = jest.fn().mockResolvedValue({ json: () => toc });

    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(TOCWidget, {
      store,
      localVue,
      mocks: { $route, $scaife },
    });

    await wrapper.vm.$nextTick();

    expect(global.fetch).toHaveBeenCalledWith(
      `${endpoint}/tocs/toc.demo-root.json`,
    );

    const container = wrapper.find('div');
    expect(container.classes()).toContain('toc-widget');
    expect(wrapper.find(TOC).props()).toEqual({ toc });
  });

  it('Renders a lookahead on the reader.', () => {
    const fetchData = jest.fn();
    const $route = { name: 'tocs' };
    const lenses = { getField: item => item.field };

    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(TOCWidget, {
      store,
      localVue,
      methods: { fetchData },
      computed: {
        lenses() {
          return lenses;
        },
      },
      mocks: { $route },
    });
    wrapper.setData({ toc });

    const lookahead = wrapper.find(Lookahead);
    expect(lookahead.exists()).toBeTruthy();
    expect(lookahead.props()).toEqual({
      lenses,
      data: toc,
      placeholder: 'Search this table of contents...',
    });
  });

  it('Renders the root TOC when no query is given', async () => {
    const $route = { name: 'tocs', query: {} };
    const $scaife = { endpoints: { tocEndpoint: endpoint } };
    global.fetch = jest.fn().mockResolvedValue({ json: () => toc });

    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(TOCWidget, {
      store,
      localVue,
      mocks: { $route, $scaife },
    });

    await wrapper.vm.$nextTick();

    expect(global.fetch).toHaveBeenCalledWith(
      `${endpoint}/tocs/toc.demo-root.json`,
    );

    const container = wrapper.find('div');
    expect(container.classes()).toContain('toc-widget');
    expect(wrapper.find(TOC).props()).toEqual({ toc });
  });

  it('Conditionally renders a TOC based on the route and query.', async () => {
    const $route = {
      name: 'tocs',
      query: { urn: 'urn:cite:scaife-viewer:toc.oaf-1' },
    };
    const $scaife = { endpoints: { tocEndpoint: endpoint } };
    global.fetch = jest.fn().mockResolvedValue({ json: () => toc });

    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(TOCWidget, {
      store,
      localVue,
      mocks: { $route, $scaife },
    });

    await wrapper.vm.$nextTick();

    expect(global.fetch).toHaveBeenCalledWith(
      `${endpoint}/tocs/toc.oaf-1.json`,
    );

    const container = wrapper.find('div');
    expect(container.classes()).toContain('toc-widget');
    expect(wrapper.find(TOC).props()).toEqual({ toc });
  });
});
