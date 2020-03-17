/* global jest, describe, expect, it  */
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuex from 'vuex';

import scaifeWidgets from '@/store';
import TOCWidget from '@/widgets/TOCWidget.vue';
import TOC from '@/components/TOC.vue';
import Lookahead from '@/components/Lookahead.vue';
import URN from '@/utils/URN';

const localVue = createLocalVue();
localVue.use(Vuex);

const passage = new URN('urn:cts:1:1.1.3:1-2');
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

describe('TOCWidget.vue computed', () => {
  it('The TOC knows when it is showing the root TOC.', () => {
    const localThis = { context: 'tocs', $route: { path: 'tocs', query: {} } };
    expect(TOCWidget.computed.showingRootToc.call(localThis)).toBe(true);
  });

  it('The TOC knows when it is not showing the root TOC.', () => {
    const localThis = {
      context: 'tocs',
      $route: {
        path: 'tocs',
        query: { urn: 'urn:cite:scaife-viewer:toc.not-root-1' },
      },
    };
    expect(TOCWidget.computed.showingRootToc.call(localThis)).toBe(false);
  });

  it('The Reader knows the query and default TOCs are the same.', () => {
    const localThis = {
      context: 'reader',
      $route: {
        path: 'reader',
        query: { toc: 'urn:cite:scaife-viewer:toc.oaf-1' },
      },
      defaultTocUrn: 'urn:cite:scaife-viewer:toc.oaf-1',
    };
    expect(TOCWidget.computed.showingRootToc.call(localThis)).toBe(true);
  });

  it('The Reader knows the query and default TOCs are different.', () => {
    const localThis = {
      context: 'reader',
      $route: {
        path: 'reader',
        query: { toc: 'urn:cite:scaife-viewer:toc.not-default' },
      },
      defaultTocUrn: 'urn:cite:scaife-viewer:toc.oaf-1',
    };
    expect(TOCWidget.computed.showingRootToc.call(localThis)).toBe(false);
  });

  it('The Reader knows when it is showing the default TOC.', () => {
    const localThis = {
      context: 'reader',
      $route: { path: 'reader', query: {} },
      defaultTocUrn: 'urn:cite:scaife-viewer:toc.oaf-1',
      endpoint: 'example.com',
      getTocUrl: TOCWidget.methods.getTocUrl,
      url: 'example.com/tocs/toc.oaf-1.json',
    };
    expect(TOCWidget.computed.showingRootToc.call(localThis)).toBe(true);
  });

  it('The Reader knows when it is not showing the default TOC.', () => {
    const localThis = {
      context: 'reader',
      $route: { path: 'reader', query: {} },
      defaultTocUrn: 'urn:cite:scaife-viewer:toc.oaf-1',
      endpoint: 'example.com',
      getTocUrl: TOCWidget.methods.getTocUrl,
      url: 'example.com/tocs/toc.not-default.json',
    };
    expect(TOCWidget.computed.showingRootToc.call(localThis)).toBe(false);
  });

  it('The Reader knows when it is showing the root TOC.', () => {
    const localThis = {
      context: 'reader',
      $route: { path: 'reader', query: {} },
      endpoint: 'example.com',
      getTocUrl: TOCWidget.methods.getTocUrl,
      rootTocUrn: 'urn:cite:scaife-viewer:toc.demo-root',
      url: 'example.com/tocs/toc.demo-root.json',
    };
    expect(TOCWidget.computed.showingRootToc.call(localThis)).toBe(true);
  });

  it('The Reader knows when it is not showing the root TOC.', () => {
    const localThis = {
      context: 'reader',
      $route: { path: 'reader', query: {} },
      endpoint: 'example.com',
      getTocUrl: TOCWidget.methods.getTocUrl,
      rootTocUrn: 'urn:cite:scaife-viewer:toc.demo-root',
      url: 'example.com/tocs/toc.not-root.json',
    };
    expect(TOCWidget.computed.showingRootToc.call(localThis)).toBe(false);
  });
});

describe('TOCWidget.vue', () => {
  it('Parses a URL and catches a failed request.', async () => {
    const $route = { name: 'reader', query: {} };
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
      stubs: { RouterLink: RouterLinkStub },
      mocks: { $route, $scaife },
      computed: {
        passage() {
          return passage;
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(global.fetch).toBeCalledWith(`${endpoint}/tocs/toc.demo-root.json`);

    const container = wrapper.find('div.toc-widget');
    expect(container.exists()).toBeFalsy();
  });

  it('Parses a URL, fetches data and renders a reader TOC.', async () => {
    const $route = { name: 'reader', query: {} };
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
      stubs: { RouterLink: RouterLinkStub },
      mocks: { $route, $scaife },
      computed: {
        passage() {
          return passage;
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(global.fetch).toHaveBeenCalledWith(
      `${endpoint}/tocs/toc.demo-root.json`,
    );

    const container = wrapper.find('div');
    expect(container.classes()).toContain('toc-widget');
    expect(wrapper.find(TOC).props()).toEqual({
      toc,
      passage,
      context: 'reader',
      showURNs: false,
    });
  });

  it('Renders a lookahead on the reader.', () => {
    const fetchData = jest.fn();
    const $route = { name: 'tocs', query: {} };

    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(TOCWidget, {
      store,
      localVue,
      methods: { fetchData },
      stubs: { RouterLink: RouterLinkStub },
      mocks: { $route },
    });
    wrapper.setData({ toc });

    const lookahead = wrapper.find(Lookahead);
    expect(lookahead.exists()).toBeTruthy();
    expect(lookahead.props()).toEqual({
      data: toc,
      placeholder: 'Search this table of contents...',
      reducer: wrapper.vm.reducer,
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
      stubs: { RouterLink: RouterLinkStub },
      mocks: { $route, $scaife },
      computed: {
        passage() {
          return null;
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(global.fetch).toHaveBeenCalledWith(
      `${endpoint}/tocs/toc.demo-root.json`,
    );

    const container = wrapper.find('div');
    expect(container.classes()).toContain('toc-widget');
    expect(wrapper.find(TOC).props()).toEqual({
      toc,
      passage: null,
      context: 'tocs',
      showURNs: false,
    });
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
      stubs: { RouterLink: RouterLinkStub },
      mocks: { $route, $scaife },
      computed: {
        passage() {
          return null;
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(global.fetch).toHaveBeenCalledWith(
      `${endpoint}/tocs/toc.oaf-1.json`,
    );

    const container = wrapper.find('div');
    expect(container.classes()).toContain('toc-widget');
    expect(wrapper.find(TOC).props()).toEqual({
      toc,
      passage: null,
      context: 'tocs',
      showURNs: false,
    });
  });

  it('Renders a TOC from the route query payload, if present.', async () => {
    const $route = {
      name: 'reader',
      query: {
        urn: 'urn:cts:1:1.1.1:1-2',
        toc: 'urn:cite:scaife-viewer:toc.1',
      },
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
      stubs: { RouterLink: RouterLinkStub },
      mocks: { $route, $scaife },
      computed: {
        passage() {
          return passage;
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(global.fetch).toHaveBeenCalledWith(`${endpoint}/tocs/toc.1.json`);

    const container = wrapper.find('div');
    expect(container.classes()).toContain('toc-widget');
    expect(wrapper.find(TOC).props()).toEqual({
      toc,
      passage,
      context: 'reader',
      showURNs: false,
    });
  });
});
