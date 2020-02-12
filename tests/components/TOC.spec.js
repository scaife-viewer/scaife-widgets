/* global describe, expect, it  */
import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import TOC from '@/components/TOC.vue';

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

describe('TOC.vue', () => {
  it('It renders a toc.', () => {
    const wrapper = shallowMount(TOC, {
      propsData: { toc },
      stubs: { RouterLink: RouterLinkStub },
    });

    expect(wrapper.html()).toContain('<h3>Some Table of Contents</h3>');
    expect(wrapper.html()).toContain(
      '<p>A test fixture for a table of contents.</p>',
    );

    const indexes = wrapper.findAll('span');
    expect(indexes.length).toBe(2);
    expect(indexes.at(0).text()).toBe('1.');
    expect(indexes.at(1).text()).toBe('2.');

    const titles = wrapper.findAll('a');
    expect(titles.length).toBe(2);
    expect(titles.at(0).text()).toBe('Title 1');
    expect(titles.at(0).props('to')).toStrictEqual({
      path: 'reader',
      query: { urn: 'urn:cts:1:1.1.1:1-2' },
    });
    expect(titles.at(1).text()).toBe('Title 2');
    expect(titles.at(1).props('to')).toStrictEqual({
      path: 'reader',
      query: { urn: 'urn:cts:1:1.1.2:1-2' },
    });
  });
});
