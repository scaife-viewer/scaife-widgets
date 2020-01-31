/* global describe, expect, it  */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import scaifeWidgets from '@/store';
import LibraryWidget from '@/widgets/LibraryWidget.vue';
import Node from '@/components/Node.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('LibraryWidget.vue', () => {
  it('Passes props and renders a Node tree.', () => {
    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store,
      },
    });
    const wrapper = shallowMount(LibraryWidget, {
      store,
      localVue,
      computed: {
        libraryTree() {
          return [{ some: 'data' }];
        },
      },
    });
    const container = wrapper.find('div');
    expect(container.classes()).toContain('library-widget');

    const root = wrapper.find('ul');
    expect(root.classes()).toStrictEqual(['node-tree', 'root']);

    expect(wrapper.find(Node).props()).toStrictEqual({
      node: { some: 'data' },
    });
  });
});
