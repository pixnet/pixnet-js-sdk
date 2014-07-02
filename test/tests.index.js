module('pixnet.index', {
    setup: function() {
        pixnet.init(pixapp.init);
        stop();
        pixnet.login(function() {
            pixnet.users.getAccount(function(data) {
                pixapp.blog.userName = data.account.name;
                start();
            });
        });
    }
});

asyncTest("rate", function() {
    expect(1);
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
    pixnet.login(function() {
        pixnet.index.now(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        });
    });
});
