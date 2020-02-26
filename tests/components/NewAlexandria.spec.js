/* global describe, expect, it  */
import { shallowMount } from '@vue/test-utils';
import NewAlexandria from '@/components/NewAlexandria.vue';

// TODO: Get a full stub response for this.
const comments = [
  {
    latestRevision: { title: 'title 1', text: '<p>some text</p>' },
    commenters: [{ name: 'some name' }],
  },
  {
    latestRevision: { title: 'title 2', text: '<p>more text</p>' },
    commenters: [{ name: 'another name' }],
  },
];

describe('NewAlexandria.vue', () => {
  it('It renders a no comments block.', () => {
    const wrapper = shallowMount(NewAlexandria, {
      propsData: { comments: [] },
    });

    const p = wrapper.find('p');
    expect(p.text()).toBe('No comments found.');
  });

  it('It renders comments.', () => {
    const wrapper = shallowMount(NewAlexandria, {
      propsData: { comments },
    });

    const titles = wrapper.findAll('h4');
    expect(titles.at(0).text()).toBe('title 1');
    expect(titles.at(1).text()).toBe('title 2');

    const names = wrapper.findAll('h5');
    expect(names.at(0).text()).toBe('some name');
    expect(names.at(1).text()).toBe('another name');

    const text = wrapper.findAll('p');
    expect(text.length).toBe(2);
    expect(text.at(0).html()).toBe('<p>some text</p>');
    expect(text.at(1).html()).toBe('<p>more text</p>');
  });
});
