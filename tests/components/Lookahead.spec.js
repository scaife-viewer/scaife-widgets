/* global describe, expect, it  */
import { shallowMount } from '@vue/test-utils';

import Lookahead from '@/components/Lookahead.vue';
import reducers from '@/utils/reducers';

const placeholder = 'Some placeholder';

describe('Lookahead.vue', () => {
  describe('Composing with TOC logic', () => {
    const reducer = reducers.tocReducer;
    const data = {
      '@id': 'urn:cite:scaife-viewer:toc.1',
      title: 'Some Table of Contents',
      items: [
        {
          title: 'Foo',
          uri: 'urn:cts:1:1.1.1:1-2',
        },
        {
          title: 'Bar',
          uri: 'urn:cts:1:1.1.2:1-2',
        },
      ],
    };

    it('Renders an empty input field.', () => {
      const wrapper = shallowMount(Lookahead, {
        propsData: { placeholder, reducer, data },
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
        propsData: { placeholder, reducer, data },
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
          },
        ],
      });
    });

    it('Filters data across multiple fields.', async () => {
      const wrapper = shallowMount(Lookahead, {
        propsData: { placeholder, reducer, data },
      });

      expect(wrapper.vm.query).toBe('');
      expect(wrapper.vm.results).toBe(null);

      const input = wrapper.find('input');
      input.element.value = '2:1-2';
      input.trigger('input');

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.query).toBe('2:1-2');
      expect(wrapper.vm.results.items.length).toBe(1);
      expect(wrapper.vm.results).toEqual({
        '@id': 'urn:cite:scaife-viewer:toc.1',
        title: 'Some Table of Contents',
        items: [
          {
            title: 'Bar',
            uri: 'urn:cts:1:1.1.2:1-2',
          },
        ],
      });
    });
  });
});
