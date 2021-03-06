(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- class / interfaces ----------------------------------
function Extend(base,       // @arg Object|Function - base object.
                object,     // @arg Object - { "isArray: function, ... }
                override) { // @arg Boolean = false - true is override.
//{@dev
    $valid($type(object,   "Object"),       Extend, "object");
    $valid($type(override, "Boolean|omit"), Extend, "override");
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

//{@dev
Extend["repository"] = "https://github.com/uupaa/Extend.js";
//}@dev

Extend["tree"]   = Extend_tree;   // Extend.tree(base:Global|Object|Function, tree:Object, override:Boolean = false):void
Extend["define"] = Extend_define; // Extend.define(base:Global|Object|Function, key:String, value:Any, override:Boolean = false):void
Extend["mixin"]  = Extend_mixin;  // Extend.mixin(base:Global|Object|Function, extend:Object, override:Boolean = false):base

// --- implements ------------------------------------------
function Extend_tree(base,       // @arg Global|Object|Function - base object.
                     tree,       // @arg ExtendTreeObject - { "Array": { "isArray": function, ... }, ... }
                     override) { // @arg Boolean = false - true is override.
//{@dev
    $valid($type(tree, "Object"),           Extend_tree, "tree");
    $valid($type(override, "Boolean|omit"), Extend_tree, "override");
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
    $valid($type(key, "String"),            Extend_define, "key");
    $valid($type(override, "Boolean|omit"), Extend_define, "override");
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
    $valid($type(extend, "Object"),         Extend_mixin, "extend");
    $valid($type(override, "Boolean|omit"), Extend_mixin, "override");
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
                                 prop,         // @arg String - property name
                                 descriptor) { // @arg Object - { writable, get, set, value, enumerable, configurable }
                                               // @ret Objec
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

// --- validate / assertions -------------------------------
//{@dev
function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
if ("process" in global) {
    module["exports"] = Extend;
}
global["Extend" in global ? "Extend_" : "Extend"] = Extend; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

