module('pixnet.index', {
    setup: function() {
        stop();
        var init = pixnet._extends({
            login: true,
            loginCallback: function() {
                start();
            }
        }, pixapp.init);
        pixnet.init(init);
    }
});

asyncTest("rate", function() {
    expect(1);
    pixnet.index.rate(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
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
