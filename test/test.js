new Test().add([
        testExtend,
    ]).run().worker(function(err, test) {
        if (!err) {
            var undo = Test.swap(Extend, Extend_);

            new Test(test).run(function(err, test) {
                undo = Test.undo(undo);
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

