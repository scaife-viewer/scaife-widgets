# Scaife Widgets

front-end component library for the Scaife Viewer ecosystem

[![npm version](https://badge.fury.io/js/%40scaife-viewer%2Fscaife-widgets.svg)](https://badge.fury.io/js/%40scaife-viewer%2Fscaife-widgets)
[![github actions](https://github.com/scaife-viewer/scaife-widgets/workflows/Node%20CI/badge.svg)](https://github.com/scaife-viewer/scaife-widgets/actions?query=workflow%3A%22Node+CI%22)

This repository is part of the [Scaife Viewer](https://scaife-viewer.org) project, an open-source ecosystem for building rich online reading environments.

## Citizens

Everything is a component in the Vue sense but we try to distinguish between:

1. **Components** - stateless, presentation-only components
1. **Widgets** - stateful, Vuex-backed components
1. **Stores** - Vuex state stores

## Getting Started

```sh
$ yarn add @scaife-viewer/scaife-widgets
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

## TextSizeWidget and TextWidthWidget

The `TextSizeWidget` and `TextWidthWidget` widgets must be coupled with a "reader" component along with the appropriate class: `text-${textSize}` or `text-width-${textWidth}`, respectively.

Example:

```html
<template>
  <div
    class="reader"
    :class="[`text-${textSize}`, `text-width-${textWidth}`]"
  >
    <!-- reader here -->
  </div>
</template>
```

## Development

Project setup:

```sh
$ yarn install
```

Compile and minify for production:

```sh
$ yarn build
```

Run unit tests:

```sh
$ yarn test
```

Lint:

```sh
$ yarn lint
```


## Develop `scaife-widgets` in parallel with a Scaife Viewer front end:

Within the `scaife-widgets` repo root directory:

```sh
$ yarn link
$ yarn watch
```

Within the Scaife Viewer front end directory:

```sh
$ yarn link "@scaife-viewer/scaife-widgets"
$ yarn serve
```

The `watch` script will re-build `scaife-widgets` when changes are made.

Since the module has been linked via `yarn link`, the front end's `serve` script will detect the changes and recompile the front end.

To revert to the canonical `scaife-widgets` installation within the Scaife Viewer front end:

```sh
yarn unlink "scaife-viewer/scaife-widgets"
yarn install --force
```
