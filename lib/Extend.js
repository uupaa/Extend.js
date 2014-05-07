// @name: Extend.js
// @require: Valid.js
// @cutoff: @assert @node @ie

/*
Extend(global, {
    "Object": {
        "keys":     Object_keys,
        "freeze":   Object_freeze
    }
});

Extend.define(Object, "keys", Object_keys);

Extend.mixin(Object, { "keys": Object_keys });
 */

(function(global) {
"use strict";

// --- variable --------------------------------------------
//{@assert
var Valid = global["Valid"] || require("uupaa.valid.js");
//}@assert

var _inNode = "process" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function Extend(base,       // @arg Global/Object/Function: base object.
                extendTree, // @arg ExtendTreeObject: { "Object": { key: value, ... }, ... }
                override) { // @arg Boolean(= false): true is override.
                            // @help: Extend
//{@assert
    _if(!Valid.type(extendTree, "Object"),     Extend, "extendTree");
    _if(!Valid.type(override, "Boolean/omit"), Extend, "override");
//}@assert

    _extend(base, extendTree, override);
}

Extend["repository"] = "https://github.com/uupaa/Extend.js";

Extend["define"] = Extend_define; // Extend.define(base:Global/Object/Function, key:String,
                                  //               value:Any, override:Boolean = false):void
Extend["mixin"]  = Extend_mixin;  // Extend.mixin(base:Global/Object/Function,
                                  //              extend:Object, override:Boolean = false):base

// --- implement -------------------------------------------
function _extend(base, extendTree, override) {
    for (var klass in extendTree) { // "Object", "Array", "String", ...
        if ( !(klass in base) ) {
            base[klass] = {};
        }

        for (var prop in extendTree[klass]) { // "isArray", "prototype", ...
            if (prop === "prototype") {
                if ( !(prop in base[klass]) ) {
                    base[klass][prop] = {};
                }
                for (var key in extendTree[klass][prop]) {
                    Extend_define(base[klass][prop], key, extendTree[klass][prop][key], override);
                }
            } else {
                Extend_define(base[klass], prop, extendTree[klass][prop], override);
            }
        }
    }
}

function Extend_define(base,       // @arg Global/Object/Function:
                       key,        // @arg String:
                       value,      // @arg Any:
                       override) { // @arg Boolean(= false):
                                   // @help: Extend.define
                                   // @desc: Object.defineProperty wrapper
//{@assert
    _if(!Valid.type(key, "String"),            Extend.define, "key");
    _if(!Valid.type(override, "Boolean/omit"), Extend.define, "override");
//}@assert

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

function Extend_mixin(base,       // @arg Global/Object/Function: base object
                      extend,     // @arg Object: Object
                      override) { // @arg Boolean(= false):
                                  // @ret Object/Function:
                                  // @help: Extend.mixin
                                  // @desc: Mixin object.
//{@assert
    _if(!Valid.type(extend, "Object"),         Extend.mixin, "extend");
    _if(!Valid.type(override, "Boolean/omit"), Extend.mixin, "override");
//}@assert

    override = override || false;

    for (var key in extend) {
        if (override || !(key in base)) {
            base[key] = extend[key];
        }
    }
    return base;
}

//{@ie [IE8]
function polyfill_defineProperty(object,       // @arg Global/Object/Function:
                                 prop,         // @arg String: property name
                                 descriptor) { // @arg Hash: { writable, get, set, value, enumerable, configurable }
                                               // @ret Object:
                                               // @desc: polyfill Object.defineProperty
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


//{@assert
function _if(value, fn, hint) {
    if (value) {
        var msg = fn.name + " " + hint;

        console.error(Valid.stack(msg));
        if (global["Help"]) {
            global["Help"](fn, hint);
        }
        throw new Error(msg);
    }
}
//}@assert

// --- export ----------------------------------------------
//{@node
if (_inNode) {
    module["exports"] = Extend;
}
//}@node
if (global["Extend"]) {
    global["Extend_"] = Extend; // secondary
} else {
    global["Extend"]  = Extend; // primary
}

})((this || 0).self || global);

