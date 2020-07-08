/* global describe, expect, it  */
import { shallowMount } from '@vue/test-utils';
import Metadata from '@/components/Metadata.vue';

describe('Metadata.vue', () => {
  it('it renders the text group label', () => {
    const wrapper = shallowMount(Metadata, {
      propsData: {
        metadata: { textGroupLabel: 'text group' },
        versionUrn: 'urn:cts:greekLit:tlg0012.tlg001.msA:',
      },
    });

    expect(wrapper.html()).toContain('<div class="value">text group</div>');
    expect(wrapper.html()).toContain(
      '<tt class="version-urn">urn:cts:greekLit:tlg0012.tlg001.msA:</tt>',
    );
  });
});
