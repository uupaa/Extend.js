# Extend.js [![Build Status](https://travis-ci.org/uupaa/Extend.js.png)](http://travis-ci.org/uupaa/Extend.js)

[![npm](https://nodei.co/npm/uupaa.extend.js.png?downloads=true&stars=true)](https://nodei.co/npm/uupaa.extend.js/)

Mixin, Polyfill, Fallback functions.

## Document

- [Extend.js wiki](https://github.com/uupaa/Extend.js/wiki/Extend)
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))


## How to use

### Browser

```js
<script src="lib/Extend.js">
<script>
Extend.tree(global, {
     "Array": {
         "name": "Array",
         "isArray": Array_isArray,
         "prototype": {
             "forEach": Array_forEach
         }
     },
     "String": {
         "name": "String",
         "prototype": {
             "trim": String_trim
         }
     }
 });

Extend.define(Object, "keys", Object.keys);

Extend.mixin(Object, { "keys": Object.keys });

</script>
```

### WebWorkers

```js
importScripts("lib/Extend.js");
```

### Node.js

```js
var Extend = require("lib/Extend.js");
```

