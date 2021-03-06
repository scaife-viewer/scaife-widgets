/* global describe, expect, it  */
import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuex from 'vuex';

import PassageAncestorsWidget from '@/widgets/PassageAncestorsWidget.vue';
import scaifeWidgets from '@/store';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('PassageAncestorsWidget.vue', () => {
  it('renders nothing given no URNs', () => {
    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });

    const wrapper = mount(PassageAncestorsWidget, {
      localVue,
      store,
      computed: {
        ancestors() {
          return [];
        },
      },
    });

    expect(wrapper.html()).toBe(
      // eslint-disable-next-line max-len
      '<div class="passage-ancestors-widget u-widget"><ol class="ancestors"></ol></div>',
    );
  });

  it('renders a single ancestor from a single URN', () => {
    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });

    const wrapper = mount(PassageAncestorsWidget, {
      localVue,
      store,
      computed: {
        ancestors() {
          return [
            {
              ref: '1',
              urn: 'urn:cts:greekLit:tlg0012.tlg001.msA:1',
            },
          ];
        },
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    const routes = wrapper.findAll(RouterLinkStub);

    expect(routes.length).toBe(1);
    expect(wrapper.html()).toContain('1');
    expect(routes.at(0).props().to).toEqual({
      path: 'reader',
      query: {
        urn: 'urn:cts:greekLit:tlg0012.tlg001.msA:1',
      },
    });
  });

  it('renders multiple ancestors from multiple URNs', () => {
    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });

    const wrapper = mount(PassageAncestorsWidget, {
      localVue,
      store,
      computed: {
        ancestors() {
          return [
            {
              ref: '1',
              urn: 'urn:cts:greekLit:tlg0012.tlg001.msA:1',
            },
            {
              ref: '2',
              urn: 'urn:cts:greekLit:tlg0012.tlg001.msA:2',
            },
          ];
        },
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    const routes = wrapper.findAll(RouterLinkStub);

    expect(routes.length).toBe(2);
    expect(wrapper.html()).toContain('1');
    expect(routes.at(0).props().to).toEqual({
      path: 'reader',
      query: {
        urn: 'urn:cts:greekLit:tlg0012.tlg001.msA:1',
      },
    });
    expect(wrapper.html()).toContain('2');
    expect(routes.at(1).props().to).toEqual({
      path: 'reader',
      query: {
        urn: 'urn:cts:greekLit:tlg0012.tlg001.msA:2',
      },
    });
  });
});
