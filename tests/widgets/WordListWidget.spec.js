/* global jest, describe, expect, it */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import scaifeWidgets from '@/store';
import WordListWidget from '@/widgets/WordListWidget.vue';
import WordList from '@/components/WordList.vue';
import URN from '@/utils/URN';

const localVue = createLocalVue();
localVue.use(Vuex);

const endpoint = 'https://vocab.perseus.org';
const metadata = { lang: 'grc' };
const passage = new URN('urn:cts:greekLit:tlg0012.tlg001.msA:1.1');

describe('WordListWidget.vue', () => {
  it('Renders data from a remote request.', async () => {
    const lemmas = [
      { lemma_text: 'lemma1', shortdef: 'some def', work_frequency: 1.0 },
    ];
    global.fetch = jest.fn().mockResolvedValue({ json: () => ({ lemmas }) });

    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(WordListWidget, {
      store,
      localVue,
      computed: {
        metadata() {
          return metadata;
        },
        passage() {
          return passage;
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(global.fetch).toBeCalledWith(
      `${endpoint}/word-list/${passage.absolute}/json/?page=all&amp;o=1`,
    );
    const container = wrapper.find('div');
    expect(container.classes()).toContain('word-list-widget');
    expect(wrapper.find(WordList).props()).toStrictEqual({
      wordList: [{ text: 'lemma1', frequency: '1.00', shortdef: 'some def' }],
    });

    global.fetch.mockClear();
    delete global.fetch;
  });

  it('Parses a URL, catches a failed request, renders nothing.', async () => {
    global.fetch = jest.fn().mockRejectedValue({ status: 500 });

    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(WordListWidget, {
      store,
      localVue,
      computed: {
        metadata() {
          return metadata;
        },
        passage() {
          return passage;
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith(
      `${endpoint}/word-list/${passage.absolute}/json/?page=all&amp;o=1`,
    );

    const container = wrapper.find('div');
    expect(container.classes()).toContain('word-list-widget');
    expect(wrapper.find(WordList).exists()).toBeFalsy();

    global.fetch.mockClear();
    delete global.fetch;
  });

  it('Disables fetching and rendering if the language is incorrect.', () => {
    global.fetch = jest.fn();

    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(WordListWidget, {
      store,
      localVue,
      computed: {
        enabled() {
          return false;
        },
        metadata() {
          return { lang: 'eng' };
        },
        passage() {
          return passage;
        },
      },
    });

    expect(global.fetch).toBeCalledTimes(0);

    const container = wrapper.find('div');
    expect(container.classes()).toContain('word-list-widget');
    expect(wrapper.find(WordList).exists()).toBeFalsy();
  });
});
