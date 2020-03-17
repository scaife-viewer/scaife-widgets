/* global describe, expect, it  */
import { shallowMount, RouterLinkStub } from '@vue/test-utils';

import TOC from '@/components/TOC.vue';
import URN from '@/utils/URN';

const passage = new URN('urn:cts:1:1.1.3:1-2');
const toc = {
  '@id': 'urn:cite:scaife-viewer:toc.1',
  title: 'Some Table of Contents',
  description: 'A test fixture for a table of contents.',
  items: [
    {
      title: 'Title 1',
      uri: 'urn:cite:scaife-viewer:1.1:',
    },
    {
      title: 'Title 2',
      uri: 'urn:cts:1:1.1.2:1-2',
    },
  ],
};

describe('TOC.vue', () => {
  it('It renders a toc on a Reader with URNs.', () => {
    const $route = { name: 'reader', query: {} };
    const wrapper = shallowMount(TOC, {
      propsData: { toc, passage, context: 'reader', showURNs: true },
      stubs: { RouterLink: RouterLinkStub },
      mocks: { $route },
    });

    const header = wrapper.find('h3');
    expect(header.text()).toEqual('Some Table of Contents');

    const legend = wrapper.find('p');
    expect(legend.text()).toEqual('A test fixture for a table of contents.');

    const refs = wrapper.findAll('span.ref');
    expect(refs.length).toBe(2);
    expect(refs.at(0).text()).toBe('1.');
    expect(refs.at(1).text()).toBe('2.');

    const titles = wrapper.findAll('a');
    expect(titles.length).toBe(2);
    expect(titles.at(0).text()).toBe('Title 1');
    expect(titles.at(0).props('to')).toEqual({
      path: 'reader',
      query: {
        urn: 'urn:cts:1:1.1.3:1-2',
        toc: 'urn:cite:scaife-viewer:1.1:',
      },
    });
    expect(titles.at(1).text()).toBe('Title 2');
    expect(titles.at(1).props('to')).toEqual({
      path: 'reader',
      query: { urn: 'urn:cts:1:1.1.2:1-2' },
    });

    const urns = wrapper.findAll('tt');
    expect(urns.length).toBe(2);
    expect(urns.at(0).text()).toBe('urn:cite:scaife-viewer:1.1:');
    expect(urns.at(1).text()).toBe('urn:cts:1:1.1.2:1-2');
  });

  it('It renders a toc on a Reader without URNs.', () => {
    const $route = { name: 'reader', query: {} };
    const wrapper = shallowMount(TOC, {
      propsData: { toc, passage, context: 'reader', showURNs: false },
      stubs: { RouterLink: RouterLinkStub },
      mocks: { $route },
    });

    const header = wrapper.find('h3');
    expect(header.text()).toEqual('Some Table of Contents');

    const legend = wrapper.find('p');
    expect(legend.text()).toEqual('A test fixture for a table of contents.');

    const refs = wrapper.findAll('span.ref');
    expect(refs.length).toBe(2);
    expect(refs.at(0).text()).toBe('1.');
    expect(refs.at(1).text()).toBe('2.');

    const titles = wrapper.findAll('a');
    expect(titles.length).toBe(2);
    expect(titles.at(0).text()).toBe('Title 1');
    expect(titles.at(0).props('to')).toEqual({
      path: 'reader',
      query: {
        urn: 'urn:cts:1:1.1.3:1-2',
        toc: 'urn:cite:scaife-viewer:1.1:',
      },
    });
    expect(titles.at(1).text()).toBe('Title 2');
    expect(titles.at(1).props('to')).toEqual({
      path: 'reader',
      query: { urn: 'urn:cts:1:1.1.2:1-2' },
    });

    const urns = wrapper.findAll('tt');
    expect(urns.length).toBe(0);
  });

  it('Identifies URNs correctly.', () => {
    const $route = { name: 'reader', query: {} };
    const wrapper = shallowMount(TOC, {
      propsData: { toc, passage, context: 'reader' },
      stubs: { RouterLink: RouterLinkStub },
      mocks: { $route },
    });

    expect(wrapper.vm.isCiteUrn('urn:cite:scaife-viewer:1.1:')).toBe(true);
    expect(wrapper.vm.isCiteUrn('urn:cts:1:1.1.2:1-2')).toBe(false);
  });

  it('Parses a CTS payload correctly in a reader context.', () => {
    const $route = { name: 'reader', query: {} };
    const wrapper = shallowMount(TOC, {
      propsData: { toc, passage, context: 'reader' },
      stubs: { RouterLink: RouterLinkStub },
      mocks: { $route },
    });

    const urn = 'urn:cts:1:1.1.2:1-2';
    expect(wrapper.vm.getPayload(urn)).toEqual({
      path: 'reader',
      query: { urn },
    });
  });

  it('Parses a CTS payload and preserves a TOC query parameter.', () => {
    const $route = {
      name: 'reader',
      query: { toc: 'urn:cite:scaife-viewer:1.1:' },
    };
    const wrapper = shallowMount(TOC, {
      propsData: { toc, passage, context: 'reader' },
      stubs: { RouterLink: RouterLinkStub },
      mocks: { $route },
    });

    const urn = 'urn:cts:1:1.1.2:1-2';
    expect(wrapper.vm.getPayload(urn)).toEqual({
      path: 'reader',
      query: { urn, toc: 'urn:cite:scaife-viewer:1.1:' },
    });
  });

  it('Parses a CITE payload correctly in a reader context.', () => {
    const $route = { name: 'reader', query: {} };
    const wrapper = shallowMount(TOC, {
      propsData: { toc, passage, context: 'reader' },
      stubs: { RouterLink: RouterLinkStub },
      mocks: { $route },
    });

    const urn = 'urn:cite:scaife-viewer:1.1:';
    expect(wrapper.vm.getPayload(urn)).toEqual({
      path: 'reader',
      query: { urn: passage.absolute, toc: urn },
    });
  });

  it('Parses a CTS payload correctly in a TOCs context.', () => {
    const $route = { name: 'tocs', query: {} };
    const wrapper = shallowMount(TOC, {
      propsData: { toc, passage, context: 'tocs' },
      stubs: { RouterLink: RouterLinkStub },
      mocks: { $route },
    });

    const urn = 'urn:cts:1:1.1.2:1-2';
    expect(wrapper.vm.getPayload(urn)).toEqual({
      path: 'reader',
      query: { urn },
    });
  });

  it('Parses a CITE payload correctly in a TOCs context.', () => {
    const $route = { name: 'tocs', query: {} };
    const wrapper = shallowMount(TOC, {
      propsData: { toc, passage, context: 'tocs' },
      stubs: { RouterLink: RouterLinkStub },
      mocks: { $route },
    });

    const urn = 'urn:cite:scaife-viewer:1.1.1:';
    expect(wrapper.vm.getPayload(urn)).toEqual({
      path: 'tocs',
      query: { urn },
    });
  });
});
