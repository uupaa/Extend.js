new Test().add([
        testExtend,
    ]).run().worker(function(err, test) {
        if (!err && typeof Extend_ !== "undefined") {
            var name = Test.swap(Extend, Extend_);

            new Test(test).run(function(err, test) {
                Test.undo(name);
            });
        }
    });

function testExtend(next) {

    if (true) {
        console.log("testExtend ok");
        next && next.pass();
    } else {
        console.log("testExtend ng");
        next && next.miss();
    }
}

