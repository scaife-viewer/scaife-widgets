/* global describe, expect, it  */
import { shallowMount } from '@vue/test-utils';
import WordList from '@/components/WordList.vue';

const wordList = [
  { text: 'lemma1', frequency: '1.00', shortdef: 'some def' },
  { text: 'lemma2', frequency: '2.00', shortdef: 'some def' },
];

describe('WordList.vue', () => {
  it('It renders a word list from the API.', () => {
    const selectedLemmas = null;
    const usedFallbackAPI = false;
    const wrapper = shallowMount(WordList, {
      propsData: { wordList, selectedLemmas, usedFallbackAPI },
    });

    const p = wrapper.findAll('p');
    expect(p.length).toBe(3);
    expect(p.at(0).text()).toBe(
      'Number in parentheses is frequency per 10k in this work.',
    );

    const spans = wrapper.findAll('span');
    expect(spans.length).toBe(6);
    expect(spans.at(0).text()).toBe('lemma1');
    expect(spans.at(1).text()).toBe('some def');
    expect(spans.at(2).text()).toBe('(1.00)');
    expect(spans.at(3).text()).toBe('lemma2');
    expect(spans.at(4).text()).toBe('some def');
    expect(spans.at(5).text()).toBe('(2.00)');
  });
});
