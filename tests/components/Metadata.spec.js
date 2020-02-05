/* global describe, expect, it  */
import { shallowMount } from '@vue/test-utils';
import Metadata from '@/components/Metadata.vue';

describe('Metadata.vue', () => {
  it('it renders the work title', () => {
    const wrapper = shallowMount(Metadata, {
      propsData: { workTitle: 'some title', workUrn: 'urn:cts:1:1.1:' },
    });

    expect(wrapper.html()).toContain('<h3 class="work-title">some title</h3>');
    expect(wrapper.html()).toContain('<tt class="work-urn">urn:cts:1:1.1:</tt>');
  });
});
