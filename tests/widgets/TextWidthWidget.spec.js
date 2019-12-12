/* global describe, expect, it  */
import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";

import TextWidthWidget from "@/widgets/TextWidthWidget.vue";
import scaifeWidgets from "@/store";
import { MODULE_NS } from "@/store/constants";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("TextWidthWidget.vue", () => {
  it('updates the "textWidth" appropriately', () => {
    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store
      }
    });

    const wrapper = mount(TextWidthWidget, {
      store,
      localVue
    });
    const narrowSpan = wrapper.findAll("span").at(0);
    const normalSpan = wrapper.findAll("span").at(1);
    const wideSpan = wrapper.findAll("span").at(2);
    const fullSpan = wrapper.findAll("span").at(3);

    expect(store.state[MODULE_NS].readerTextWidth).toContain("normal");
    expect(narrowSpan.html()).toContain(
      'class="text-width-control">Narrow</span>'
    );
    expect(normalSpan.html()).toContain(
      'class="text-width-control active">Normal</span>'
    );
    expect(wideSpan.html()).toContain('class="text-width-control">Wide</span>');
    expect(fullSpan.html()).toContain('class="text-width-control">Full</span>');

    wideSpan.trigger("click");
    expect(store.state[MODULE_NS].readerTextWidth).toContain("wide");
    expect(narrowSpan.html()).toContain(
      'class="text-width-control">Narrow</span>'
    );
    expect(normalSpan.html()).toContain(
      'class="text-width-control">Normal</span>'
    );
    expect(wideSpan.html()).toContain(
      'class="text-width-control active">Wide</span>'
    );
    expect(fullSpan.html()).toContain('class="text-width-control">Full</span>');

    narrowSpan.trigger("click");
    expect(store.state[MODULE_NS].readerTextWidth).toContain("narrow");
    expect(narrowSpan.html()).toContain(
      'class="text-width-control active">Narrow</span>'
    );
    expect(normalSpan.html()).toContain(
      'class="text-width-control">Normal</span>'
    );
    expect(wideSpan.html()).toContain('class="text-width-control">Wide</span>');
    expect(fullSpan.html()).toContain('class="text-width-control">Full</span>');

    normalSpan.trigger("click");
    expect(store.state[MODULE_NS].readerTextWidth).toContain("normal");
    expect(narrowSpan.html()).toContain(
      'class="text-width-control">Narrow</span>'
    );
    expect(normalSpan.html()).toContain(
      'class="text-width-control active">Normal</span>'
    );
    expect(wideSpan.html()).toContain('class="text-width-control">Wide</span>');
    expect(fullSpan.html()).toContain('class="text-width-control">Full</span>');

    fullSpan.trigger("click");
    expect(store.state[MODULE_NS].readerTextWidth).toContain("full");
    expect(narrowSpan.html()).toContain(
      'class="text-width-control">Narrow</span>'
    );
    expect(normalSpan.html()).toContain(
      'class="text-width-control">Normal</span>'
    );
    expect(wideSpan.html()).toContain('class="text-width-control">Wide</span>');
    expect(fullSpan.html()).toContain(
      'class="text-width-control active">Full</span>'
    );
  });
});
