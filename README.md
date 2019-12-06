# Scaife Widgets

[![npm version](https://badge.fury.io/js/%40scaife-viewer%2Fscaife-widgets.svg)](https://badge.fury.io/js/%40scaife-viewer%2Fscaife-widgets)
![](https://github.com/scaife-viewer/scaife-widgets/workflows/Node%20CI/badge.svg)

Module for building modular Scaife Viewer components.

## Getting Started

```sh
$ npm install @scaife-viewer/scaife-widgets
```

Import components like so:

```js
import {
  HelloWorld,
  Icon,
  Metadata,
  Paginator,
  TextSize,
  TextWidth,
  URN
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

Lint and fix files:

```sh
$ npm run lint
```
