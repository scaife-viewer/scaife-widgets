/* global describe, expect, it  */
import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils';
import Node from '@/components/Node.vue';

describe('Node.vue', () => {
  it('It renders nodes without children.', () => {
    const node = {
      data: {
        urn: 'urn:cts:1:',
        kind: 'node',
        metadata: { label: 'urn:cts:1:' },
      },
      children: [],
    };
    const wrapper = shallowMount(Node, { propsData: { node } });

    expect(wrapper.html()).not.toContain('<span class="open-toggle"');
    expect(wrapper.html()).toContain(
      '<span class="node parent"><tt>urn:cts:1:</tt></span>',
    );
    expect(wrapper.html()).not.toContain('<a>');
    expect(wrapper.html()).not.toContain('<ul class="node-tree"');
  });

  it('It renders routable version nodes without children.', () => {
    const node = {
      data: {
        urn: 'urn:cts:1:1.1.1:',
        kind: 'version',
        metadata: {
          label: 'some title',
          firstPassageUrn: 'urn:cts:1:1.1.1:1',
        },
      },
      children: [],
    };
    const wrapper = shallowMount(Node, {
      propsData: { node },
      stubs: { RouterLink: RouterLinkStub },
    });

    expect(wrapper.html()).not.toContain('<span class="open-toggle"');
    expect(wrapper.html()).toContain('<span class="node version">');
    const route = wrapper.find('a');
    expect(route.text()).toBe('some title');
    expect(route.props('to')).toEqual({
      path: 'reader',
      query: {
        urn: 'urn:cts:1:1.1.1:1',
      },
    });
    expect(wrapper.html()).not.toContain('<ul class="node-tree"');
  });

  it('It does not render children when parent node not expanded.', () => {
    const node = {
      data: {
        urn: 'urn:cts:1:1.1:',
        kind: 'node',
        metadata: { label: 'urn:cts:1:1.1:' },
      },
      children: [
        {
          data: {
            urn: 'urn:cts:1:1.1.1:',
            kind: 'version',
            metadata: {
              label: 'some title',
              firstPassageUrn: 'urn:cts:1:1.1.1:1',
            },
          },
          children: [],
        },
      ],
    };
    const wrapper = shallowMount(Node, {
      propsData: { node },
      stubs: { RouterLink: RouterLinkStub },
    });

    const spans = wrapper.findAll('span');
    expect(spans.at(0).classes()).toEqual(['open-toggle']);
    expect(spans.at(1).classes()).toEqual(['node', 'parent']);
    const parent = wrapper.findAll('tt');
    expect(parent.length).toBe(1);
    expect(parent.at(0).text()).toBe('urn:cts:1:1.1:');

    const childList = wrapper.findAll('ul');
    expect(childList.length).toBe(0);
  });

  it('It renders all nodes when expanded.', async () => {
    const node = {
      data: {
        urn: 'urn:cts:1:1.1:',
        kind: 'node',
        metadata: { label: 'urn:cts:1:1.1:' },
      },
      children: [
        {
          data: {
            urn: 'urn:cts:1:1.1.1:',
            kind: 'version',
            metadata: {
              label: 'some title',
              firstPassageUrn: 'urn:cts:1:1.1.1:1',
            },
          },
          children: [],
        },
      ],
    };
    // Use a full mount here so we can see the recursion happen.
    const wrapper = mount(Node, {
      propsData: { node },
      stubs: { RouterLink: RouterLinkStub },
    });
    const toggle = wrapper.find('span');
    toggle.trigger('click');

    await wrapper.vm.$nextTick();

    const spans = wrapper.findAll('span');
    expect(spans.at(0).classes()).toEqual(['open-toggle']);
    expect(spans.at(1).classes()).toEqual(['node', 'parent']);
    const parent = wrapper.findAll('tt');
    expect(parent.length).toBe(1);
    expect(parent.at(0).text()).toBe('urn:cts:1:1.1:');

    const childList = wrapper.findAll('ul');
    expect(childList.length).toBe(1);
    expect(childList.at(0).classes()).toEqual(['node-tree']);
    expect(spans.at(2).classes()).toEqual(['node', 'version']);

    const route = wrapper.findAll('a');
    expect(route.length).toBe(1);
    expect(route.at(0).text()).toBe('some title');
    expect(route.at(0).props('to')).toEqual({
      path: 'reader',
      query: {
        urn: 'urn:cts:1:1.1.1:1',
      },
    });
  });
});
