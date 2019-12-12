/* global describe, expect, it  */
import Vuex from "vuex";
import { shallowMount, createLocalVue, mount } from "@vue/test-utils";

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

    const mountWrapper = mount(TextSizeWidget, {
      store,
      localVue
    });
    const xsSpan = mountWrapper.findAll("span").at(0);
    const smSpan = mountWrapper.findAll("span").at(1);
    const mdSpan = mountWrapper.findAll("span").at(2);
    const lgSpan = mountWrapper.findAll("span").at(3);
    const xlSpan = mountWrapper.findAll("span").at(4);

    xsSpan.trigger("click");
    expect(store.state[MODULE_NS].readerTextSize).toBe("xs");
    expect(store.state[MODULE_NS].readerTextWidth).toBe("normal");
    expect(mountWrapper.html()).toContain(
      'class="text-size-control text-xs selected">Αα</span>'
    );

    smSpan.trigger("click");
    expect(store.state[MODULE_NS].readerTextSize).toBe("sm");
    expect(store.state[MODULE_NS].readerTextWidth).toBe("normal");
    expect(mountWrapper.html()).toContain(
      'class="text-size-control text-sm selected">Αα</span>'
    );

    mdSpan.trigger("click");
    expect(store.state[MODULE_NS].readerTextSize).toBe("md");
    expect(store.state[MODULE_NS].readerTextWidth).toBe("normal");
    expect(mountWrapper.html()).toContain(
      'class="text-size-control text-md selected">Αα</span>'
    );

    lgSpan.trigger("click");
    expect(store.state[MODULE_NS].readerTextSize).toBe("lg");
    expect(store.state[MODULE_NS].readerTextWidth).toBe("normal");
    expect(mountWrapper.html()).toContain(
      'class="text-size-control text-lg selected">Αα</span>'
    );

    xlSpan.trigger("click");
    expect(store.state[MODULE_NS].readerTextSize).toBe("xl");
    expect(store.state[MODULE_NS].readerTextWidth).toBe("normal");
    expect(mountWrapper.html()).toContain(
      'class="text-size-control text-xl selected">Αα</span>'
    );
  });
});
