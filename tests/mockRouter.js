import VueRouter from "vue-router";

const routes = [
  { path: "/", redirect: "reader" },
  { path: "/reader", component: { template: "<p>Stubbed</p>" }, name: "reader" }
];

export default {
  mock() {
    return new VueRouter({
      mode: "abstract",
      routes
    });
  }
};
