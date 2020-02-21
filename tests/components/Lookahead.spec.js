/* global describe, expect, it  */
import { shallowMount, RouterLinkStub } from '@vue/test-utils';

import Lookahead from '@/components/Lookahead.vue';

const placeholder = 'Some placeholder';

const data = {
  '@id': 'urn:cite:scaife-viewer:toc.1',
  title: 'Some Table of Contents',
  items: [
    {
      title: 'Foo',
      uri: 'urn:cts:1:1.1.1:1-2',
      nested: {
        field: 'Some value',
      },
    },
    {
      title: 'Bar',
      uri: 'urn:cts:1:1.1.2:1-2',
      nested: {
        field: 'Another value',
      },
    },
  ],
};

const lenses = {
  getTitle: item => item.title,
  getField: item => item.nested.field,
};

describe('Lookahead.vue', () => {
  it('Renders an empty input field.', () => {
    const wrapper = shallowMount(Lookahead, {
      propsData: { placeholder, lenses, data },
    });

    const input = wrapper.find('input');
    expect(input.exists()).toBeTruthy();
    expect(input.element.placeholder).toEqual('Some placeholder');
    expect(input.element.value).toBe('');
    expect(wrapper.vm.query).toBe('');
    expect(wrapper.vm.results).toBe(null);
  });

  it('Filters data by term ignoring case.', async () => {
    const wrapper = shallowMount(Lookahead, {
      propsData: { placeholder, lenses, data },
    });

    expect(wrapper.vm.query).toBe('');
    expect(wrapper.vm.results).toBe(null);

    const input = wrapper.find('input');
    input.element.value = 'foo';
    input.trigger('input');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.query).toBe('foo');
    expect(wrapper.vm.results.items.length).toBe(1);
    expect(wrapper.vm.results).toEqual({
      '@id': 'urn:cite:scaife-viewer:toc.1',
      title: 'Some Table of Contents',
      items: [
        {
          title: 'Foo',
          uri: 'urn:cts:1:1.1.1:1-2',
          nested: { field: 'Some value' },
        },
      ],
    });
  });

  it('Filters data across multiple fields.', async () => {
    const wrapper = shallowMount(Lookahead, {
      propsData: { placeholder, lenses, data },
    });

    expect(wrapper.vm.query).toBe('');
    expect(wrapper.vm.results).toBe(null);

    const input = wrapper.find('input');
    input.element.value = 'another';
    input.trigger('input');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.query).toBe('another');
    expect(wrapper.vm.results.items.length).toBe(1);
    expect(wrapper.vm.results).toEqual({
      '@id': 'urn:cite:scaife-viewer:toc.1',
      title: 'Some Table of Contents',
      items: [
        {
          title: 'Bar',
          uri: 'urn:cts:1:1.1.2:1-2',
          nested: {
            field: 'Another value',
          },
        },
      ],
    });
  });
});
