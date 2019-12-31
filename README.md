# Scaife Widgets

[![npm version](https://badge.fury.io/js/%40scaife-viewer%2Fscaife-widgets.svg)](https://badge.fury.io/js/%40scaife-viewer%2Fscaife-widgets)
[![github actions](https://github.com/scaife-viewer/scaife-widgets/workflows/Node%20CI/badge.svg)](https://github.com/scaife-viewer/scaife-widgets/actions?query=workflow%3A%22Node+CI%22)

Component library for building applications in the [Scaife Viewer](https://github.com/scaife-viewer) ecosystem.

## Citizens

Everything is a component in the Vue sense but we try to distinguish between:

1. **Components** - stateless, presentation-only components
1. **Widgets** - stateful, Vuex-backed components
1. **Stores** - Vuex state stores

## Getting Started

```sh
$ npm install @scaife-viewer/scaife-widgets
```

Import components and widgets like so:

```js
import {
  // components
  HelloWorld,
  Icon,
  Metadata,
  Paginator,
  TextSize,
  TextWidth,
  // widgets
  TextSizeWidget,
  TextWidthWidget,
  PassageAncestorsWidget,
  PassageChildrenWidget,
  PassageReferenceWidget
} from "@scaife-viewer/scaife-widgets";
```

Import css like so:

```js
<style src='@scaife-viewer/scaife-widgets/dist/scaife-widgets.css'></style>
```

Import utils like so:

```js
import { URN } from "@scaife-viewer/scaife-widgets";
```

Import constants like so:

```js
import WIDGETS_NS from "@scaife-viewer/scaife-widgets";
```

Import and initialize the store like so:

```js
import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import { scaifeWidgets } from "@scaife-viewer/scaife-widgets";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    [scaifeWidgets.namespace]: scaifeWidgets.store
  }
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount("#app");
```

> See [_example/sample](https://github.com/scaife-viewer/scaife-widgets/tree/master/_example/sample) for more examples.

## Development

Project setup:

```sh
$ npm install
```

Compile and minify for production:

```sh
$ npm run build
```

Run unit tests:

```sh
$ npm run test
```

Lint:

```sh
$ npm run lint
```
