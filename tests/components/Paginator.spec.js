/* global describe, expect, it  */
import { shallowMount, RouterLinkStub, mount } from '@vue/test-utils';

import URN from '@/utils/URN';
import Paginator from '@/components/Paginator.vue';

describe('Paginator.vue', () => {
  it('renders nothing when not passed a URN', () => {
    const wrapper = shallowMount(Paginator, {
      propsData: { urn: null, direction: 'left' },
    });

    expect(wrapper.html()).toBe('<nav class="paginator"><!----></nav>');
  });

  it.each([
    ['left', 'chevron-left'],
    ['right', 'chevron-right'],
  ])('it renders URNs and chevrons', async (direction, expected) => {
    const urn = new URN('urn:cts:greekLit:tlg0012.tlg001.msA:1.1');
    const wrapper = shallowMount(Paginator, {
      propsData: { urn, direction },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    expect(wrapper.find(RouterLinkStub).props().to).toEqual({
      path: 'reader',
      query: {
        urn: 'urn:cts:greekLit:tlg0012.tlg001.msA:1.1',
      },
    });
    expect(wrapper.html()).toContain(
      // eslint-disable-next-line max-len
      `<nav class="paginator"><a><icon-stub name="${expected}"></icon-stub></a></nav>`,
    );
  });

  it('it renders URNs and chevrons', () => {
    const urn = new URN('urn:cts:greekLit:tlg0012.tlg001.msA:1.1');
    const wrapper = mount(Paginator, {
      propsData: { urn, direction: 'left' },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    expect(wrapper.html()).toBe(
      '<nav class="paginator"><a><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-chevron-left fa-w-10 fa-fw"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" class=""></path></svg></a></nav>',
    );
  });
});
