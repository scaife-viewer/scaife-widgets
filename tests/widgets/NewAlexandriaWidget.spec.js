/* global jest, describe, expect, it  */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import qs from 'query-string';

import scaifeWidgets from '@/store';
import NewAlexandriaWidget from '@/widgets/NewAlexandriaWidget.vue';
import NewAlexandria from '@/components/NewAlexandria.vue';
import URN from '@/utils/URN';

const localVue = createLocalVue();
localVue.use(Vuex);

const endpoint = 'https://commentary-api.chs.harvard.edu/graphql';
const comments = [{ some: 'data' }];

describe('NewAlexandriaWidget.vue', () => {
  it('Catches a failed request and renders with empty comments.', async () => {
    global.fetch = jest.fn().mockRejectedValue({ status: 500 });

    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(NewAlexandriaWidget, {
      store,
      localVue,
      computed: {
        passage() {
          return new URN('urn:cts:greekLit:tlg0012.tlg001.msA:1.1');
        },
        params() {
          return qs.stringify({ query: 'some-params' });
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(global.fetch).toBeCalledWith(`${endpoint}?query=some-params`);

    const container = wrapper.find('div');
    expect(container.classes()).toContain('new-alexandria-widget');
    expect(wrapper.find(NewAlexandria).props()).toEqual({ comments: null });
  });

  it('Renders commentary using data from a remote request.', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue({ json: () => ({ data: { commentsOn: comments } }) });

    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(NewAlexandriaWidget, {
      store,
      localVue,
      computed: {
        passage() {
          return new URN('urn:cts:greekLit:tlg0012.tlg001.msA:1.1');
        },
        params() {
          return qs.stringify({ query: 'some-params' });
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(global.fetch).toBeCalledWith(`${endpoint}?query=some-params`);

    const container = wrapper.find('div');
    expect(container.classes()).toContain('new-alexandria-widget');
    expect(wrapper.find(NewAlexandria).props()).toEqual({ comments });
  });
});
