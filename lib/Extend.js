(function(global) {
"use strict";

// --- dependency module -----------------------------------
//{@dev
var Valid = global["Valid"] || require("uupaa.valid.js");
//}@dev

// --- local variable --------------------------------------
var _inNode = "process" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function Extend(base,       // @arg Object|Function base object.
                object,     // @arg Object          { "isArray: function, ... }
                override) { // @arg Boolean = false true is override.
//{@dev
    Valid(Valid.type(object,   "Object"),       Extend, "object");
    Valid(Valid.type(override, "Boolean|omit"), Extend, "override");
//}@dev

    for (var key in object) { // "isArray", "prototype", ...
        if (key === "prototype") {
            if ( !(key in base) ) { // base["prototype"] = {}
                base[key] = {};
            }
            for (var method in object[key]) {
                Extend_define(base[key], method, object[key][method], override);
            }
        } else {
            Extend_define(base, key, object[key], override);
        }
    }
}

Extend["repository"] = "https://github.com/uupaa/Extend.js";

Extend["tree"]   = Extend_tree;   // Extend.tree(base:Global|Object|Function, tree:Object, override:Boolean = false):void
Extend["define"] = Extend_define; // Extend.define(base:Global|Object|Function, key:String, value:Any, override:Boolean = false):void
Extend["mixin"]  = Extend_mixin;  // Extend.mixin(base:Global|Object|Function, extend:Object, override:Boolean = false):base

// --- implement -------------------------------------------
function Extend_tree(base,       // @arg Global|Object|Function  base object.
                     tree,       // @arg ExtendTreeObject        { "Array": { "isArray": function, ... }, ... }
                     override) { // @arg Boolean = false         true is override.
//{@dev
    Valid(Valid.type(tree, "Object"),           Extend, "tree");
    Valid(Valid.type(override, "Boolean|omit"), Extend, "override");
//}@dev

    for (var klass in tree) { // "Object", "Array", "String", ...
        if ( !(klass in base) ) {
            base[klass] = {};
        }
        Extend(base[klass], tree[klass], override);
    }
}

function Extend_define(base,       // @arg Global|Object|Function
                       key,        // @arg String
                       value,      // @arg Any
                       override) { // @arg Boolean = false
                                   // @desc Object.defineProperty wrapper
//{@dev
    Valid(Valid.type(key, "String"),            Extend.define, "key");
    Valid(Valid.type(override, "Boolean|omit"), Extend.define, "override");
//}@dev

    var defineProperty = Object["defineProperty"] || polyfill_defineProperty;

    if ( override || !(key in base) ) {
        defineProperty(base, key, {
            "configurable": true, // false is immutable
            "enumerable": false,  // false is invisible(for in loop)
            "writable": true,     // false is read-only
            "value": value
        });
    }
}

function Extend_mixin(base,       // @arg Global|Object|Function
                      extend,     // @arg Object
                      override) { // @arg Boolean = false
                                  // @ret Object|Function
                                  // @desc Mixin object.
//{@dev
    Valid(Valid.type(extend, "Object"),         Extend.mixin, "extend");
    Valid(Valid.type(override, "Boolean|omit"), Extend.mixin, "override");
//}@dev

    override = override || false;

    for (var key in extend) {
        if (override || !(key in base)) {
            base[key] = extend[key];
        }
    }
    return base;
}

//{@ie [IE8]
function polyfill_defineProperty(object,       // @arg Global|Object|Function
                                 prop,         // @arg String property name
                                 descriptor) { // @arg Object { writable, get, set, value, enumerable, configurable }
                                               // @ret Objec:
                                               // @desc polyfill Object.defineProperty
    if (object["nodeType"]) {
        if (Object["defineProperty"] && !Object["defineProperties"]) { // [IE8]
            return Object["defineProperty"](object, prop, descriptor); // call native api
        }
    }

    // data descriptor.
    if ("value" in descriptor) {
        object[prop] = descriptor["value"];
    }

    // accessor descriptor.
    if (descriptor["get"] && object["__defineGetter__"]) {
        object["__defineGetter__"](prop, descriptor["get"]);
    }
    if (descriptor["set"] && object["__defineSetter__"]) {
        object["__defineSetter__"](prop, descriptor["set"]);
    }
    return object;
}
//}@ie

// --- export ----------------------------------------------
if ("process" in global) {
    module["exports"] = Extend;
}
global["Extend" in global ? "Extend_" : "Extend"] = Extend; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

