var ModuleTestExtend = (function(global) {

return new Test("Extend", {
        disable:    false,
        browser:    true,
        worker:     true,
        node:       true,
        button:     true,
        both:       true,
    }).add([
        testExtend,
        testExtend_override,
        testExtend_define,
        testExtend_define_override,
        testExtend_mixin,
    ]).run().clone();

function testExtend(next) {
    var NOP = function() {};
    var baseObject = {};
    var extendTreeObject = {
            Object: {
                keys: Object.keys,
                freeze: Object.freeze
            },
            Array: {
                isArray: Array.isArray
            }
        };

    Extend(baseObject, extendTreeObject);

    if (baseObject.Object.keys   === Object.keys &&
        baseObject.Object.freeze === Object.freeze &&
        baseObject.Array.isArray === Array.isArray) {

        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testExtend_override(next) {

    var NOP  = function() {};
    var NOP2 = function() {};
    var baseObject = {};
    var extendTreeObject = {
            Object: {
                keys: Object.keys,
                freeze: Object.freeze
            },
            Array: {
                isArray: Array.isArray
            }
        };

    Extend(baseObject, extendTreeObject);

    var extendTreeObject2 = {
            Object: {
                keys: NOP2,
                freeze: NOP2
            },
            Array: {
                isArray: NOP2
            }
        };
    Extend(baseObject, extendTreeObject2, true); // override

    if (baseObject.Object.keys   === NOP2 &&
        baseObject.Object.freeze === NOP2 &&
        baseObject.Array.isArray === NOP2) {

        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testExtend_define(next) {

    var NOP = function() {};
    var baseObject = {};
    var extendTreeObject = {
            Object: {
                keys: Object.keys,
                freeze: Object.freeze
            },
            Array: {
                isArray: Array.isArray
            }
        };

    Extend.define(baseObject, "keys", Object.keys);
    Extend.define(baseObject, "freeze", Object.freeze);
    Extend.define(baseObject, "isArray", Array.isArray);

    if (Object.keys(baseObject).join() === "" && // enumerable false
        baseObject.keys === Object.keys &&
        baseObject.freeze === Object.freeze &&
        baseObject.isArray === Array.isArray) {

        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testExtend_define_override(next) {

    var NOP = function() {};
    var baseObject = {};

    Extend.define(baseObject, "keys", Object.keys);
    Extend.define(baseObject, "freeze", Object.freeze);
    Extend.define(baseObject, "isArray", Array.isArray);

    Extend.define(baseObject, "keys", NOP, true); // override
    Extend.define(baseObject, "freeze", NOP, true); // override
    Extend.define(baseObject, "isArray", NOP, true); // override

    if (Object.keys(baseObject).join() === "" && // enumerable false
        baseObject.keys === NOP) {

        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testExtend_mixin(next) {

    var NOP = function() {};
    var baseObject = {};

    Extend.mixin(baseObject, {
        a: 123,
        b: 123
    });
    Extend.mixin(baseObject, {
        a: 1,
        c: 3
    });
    Extend.mixin(baseObject, {
        a: 1,
        b: 2
    }, true); // override


    if (Object.keys(baseObject).join() === "a,b,c" &&
        baseObject.a === 1 &&
        baseObject.b === 2 &&
        baseObject.c === 3) {

        next && next.pass();
    } else {
        next && next.miss();
    }
}

})((this || 0).self || global);

