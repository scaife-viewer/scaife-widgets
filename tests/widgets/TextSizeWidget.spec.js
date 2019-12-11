/* global describe, expect, it  */
import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";

import TextSizeWidget from "@/widgets/TextSizeWidget.vue";
import scaifeWidgets from "@/store";
import { MODULE_NS, SET_TEXT_SIZE } from "@/store/constants";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("TextSizeWidget.vue", () => {
  const store = new Vuex.Store({
    modules: {
      [scaifeWidgets.namespace]: scaifeWidgets.store
    }
  });

  it("sets the correct default data", () => {
    const wrapper = shallowMount(TextSizeWidget, {
      store,
      localVue,
      stubs: {}
    });

    expect(wrapper.html()).toContain(
      '<div class="text-size-widget"><textsize-stub size="xs" value="md"></textsize-stub>'
    );
    expect(store.state[MODULE_NS].readerTextSize).toBe("md");
  });

  it('updates the "readerTextSize" appropriately', () => {
    const wrapper = shallowMount(TextSizeWidget, {
      store,
      localVue,
      stubs: {}
    });

    expect(wrapper.html()).toContain(
      '<div class="text-size-widget"><textsize-stub size="xs" value="md"></textsize-stub>'
    );
    expect(store.state[MODULE_NS].readerTextSize).toBe("md");
    store.dispatch(`${MODULE_NS}/${SET_TEXT_SIZE}`, { size: "sm" });
    expect(wrapper.html()).toContain(
      '<div class="text-size-widget"><textsize-stub size="xs" value="sm"></textsize-stub>'
    );
    expect(store.state[MODULE_NS].readerTextSize).toBe("sm");
    store.dispatch(`${MODULE_NS}/${SET_TEXT_SIZE}`, { size: "lg" });
    expect(wrapper.html()).toContain(
      '<div class="text-size-widget"><textsize-stub size="xs" value="lg"></textsize-stub>'
    );
    expect(store.state[MODULE_NS].readerTextSize).toBe("lg");
    store.dispatch(`${MODULE_NS}/${SET_TEXT_SIZE}`, { size: "xl" });
    expect(wrapper.html()).toContain(
      '<div class="text-size-widget"><textsize-stub size="xs" value="xl"></textsize-stub>'
    );
    expect(store.state[MODULE_NS].readerTextSize).toBe("xl");
    store.dispatch(`${MODULE_NS}/${SET_TEXT_SIZE}`, { size: "md" });
    expect(wrapper.html()).toContain(
      '<div class="text-size-widget"><textsize-stub size="xs" value="md"></textsize-stub>'
    );
    expect(store.state[MODULE_NS].readerTextSize).toBe("md");
  });
});
