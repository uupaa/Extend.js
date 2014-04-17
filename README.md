=========
Extend.js
=========

![](https://travis-ci.org/uupaa/Extend.js.png)

Mixin, Polyfill, Fallback functions.

# Document

- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [Extend.js wiki](https://github.com/uupaa/Extend.js/wiki/Extend)


# How to use

```js
<script src="lib/Extend.js">
<script>
// for Browser

// ExtendTreeObject example:

Extend(global, {
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
     }
 });

</script>
```

```js
// for WebWorkers
importScripts("lib/Extend.js");

...
```

```js
// for Node.js
var Extend = require("lib/Extend.js");

...
```

