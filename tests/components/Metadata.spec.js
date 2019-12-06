/* global describe, expect, it  */
import { shallowMount } from "@vue/test-utils";
import Metadata from "@/components/Metadata.vue";

describe("Metadata.vue", () => {
  it("it renders the work title", () => {
    const wrapper = shallowMount(Metadata, {
      context: { props: { workTitle: "Some Title" } }
    });

    expect(wrapper.html()).toBe('<h1 class="work-title">Some Title</h1>');
  });
});
