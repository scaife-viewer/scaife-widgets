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
const selectedLemmas = null;

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
        selectedLemmas() {
          return selectedLemmas;
        },
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
      selectedLemmas,
      usedFallbackAPI: false,
      wordList: [{ text: 'lemma1', frequency: '1.00', shortdef: 'some def' }],
    });

    global.fetch.mockClear();
    delete global.fetch;
  });

  it('Halts on failures other than 404.', async () => {
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
        selectedLemmas() {
          return selectedLemmas;
        },
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

  it('Halts on 404 if no lemmas are selected.', async () => {
    global.fetch = jest.fn().mockRejectedValue({ status: 404 });

    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(WordListWidget, {
      store,
      localVue,
      computed: {
        selectedLemmas() {
          return selectedLemmas;
        },
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
      `${endpoint}/word-list/${passage.absolute}/json?page=all&amp;o=1`,
    );

    const container = wrapper.find('div');
    expect(container.classes()).toContain('word-list-widget');
    expect(wrapper.find(WordList).exists()).toBeFalsy();

    global.fetch.mockClear();
    delete global.fetch;
  });

  it('Renders fallback data if 404 but with lemmas selected.', async () => {
    const selectedLemmas = ['lemma2'];
    const lemmas = [
      { text: 'lemma2', shortdef: 'some def', frequency: "2.0" },
    ];
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce({ status: 404 })
      .mockResolvedValue({ json: () => ({ lemmas }) });

    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(WordListWidget, {
      store,
      localVue,
      computed: {
        selectedLemmas() {
          return selectedLemmas;
        },
        metadata() {
          return metadata;
        },
        passage() {
          return passage;
        },
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(global.fetch).toBeCalledTimes(2);
    expect(global.fetch).toBeCalledWith(
      `${endpoint}/word-list/${passage.absolute}/json?page=all&amp;o=1`,
    );
    expect(global.fetch).toBeCalledWith(`${endpoint}/lemma/json?l=lemma2`);

    const container = wrapper.find('div');
    expect(container.classes()).toContain('word-list-widget');
    expect(wrapper.find(WordList).props()).toStrictEqual({
      selectedLemmas,
      usedFallbackAPI: true,
      wordList: [{ text: 'lemma2', frequency: '2.0', shortdef: 'some def' }],
    });

    global.fetch.mockClear();
    delete global.fetch;
  });
});
