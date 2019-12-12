/* global describe, expect, it  */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

import PassageReferenceWidget from "@/widgets/PassageReferenceWidget.vue";
import scaifeWidgets from "@/store";
import URN from "@/utils/URN";
import mockRouter from "../mockRouter";

const localVue = createLocalVue();
const router = mockRouter.mock();

localVue.use(VueRouter);
localVue.use(Vuex);

describe("PassageReferenceWidget.vue", () => {
  it("pushes a new URN to the correct route", async () => {
    const store = new Vuex.Store({
      modules: {
        [scaifeWidgets.namespace]: scaifeWidgets.store
      }
    });

    const wrapper = shallowMount(PassageReferenceWidget, {
      localVue,
      router,
      store,
      computed: {
        passage() {
          return new URN("urn:cts:greekLit:tlg0012.tlg001.msA:1.2.3");
        }
      }
    });
    const input = wrapper.find("input");

    const urn = "urn:cts:greekLit:tlg0012.tlg001.msA:1.2.3.4-3.5";
    router.push({ path: "/reader", query: { urn } });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.path).toBe("/reader");
    expect(wrapper.vm.$route.query.urn).toBe(
      "urn:cts:greekLit:tlg0012.tlg001.msA:1.2.3.4-3.5"
    );

    input.element.value = "1.2";
    input.trigger("input");
    input.trigger("keyup.enter");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.path).toBe("/reader");
    expect(wrapper.vm.$route.query.urn).toBe(
      "urn:cts:greekLit:tlg0012.tlg001.msA:1.2"
    );
  });
});
