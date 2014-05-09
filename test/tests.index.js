module('pixnet.index', {
});

asyncTest("rate", function() {
    // anonymous
    pixnet.index.rate(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    }
    // Login
    pixnet.login(function() {
        pixnet.index.rate(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        });
    });
});

asyncTest("now", function() {
    expect(1);

    pixnet.index.now(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    });
});
