import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import { scaifeWidgets } from "@scaife-viewer/scaife-widgets";
import MODULE_NS from "@scaife-viewer/scaife-widgets";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    [MODULE_NS]: scaifeWidgets.store
  }
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount("#app");
