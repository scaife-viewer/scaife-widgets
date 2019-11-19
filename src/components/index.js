import Vue from "vue";
import HelloWorld from "./HelloWorld.vue";

const Components = {
  HelloWorld
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
