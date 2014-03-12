Extend.js
=========

Mixin, Polyfill, Fallback functions.

# Document

https://github.com/uupaa/Extend.js/wiki/Extend

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

# for Developers

1. Install development dependency tools

    ```sh
    $ brew install closure-compiler
    $ brew install node
    $ npm install -g plato
    ```

2. Clone Repository and Install

    ```sh
    $ git clone git@github.com:uupaa/Extend.js.git
    $ cd Extend.js
    $ npm install
    ```

3. Build and Minify

    `$ npm run build`

4. Test

    `$ npm run test`

5. Lint

    `$ npm run lint`


