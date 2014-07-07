module('pixnet.users', {
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

asyncTest("getAccount", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.users.getAccount(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        });
    });
});

asyncTest("getUser", function() {
    expect(1);
    pixnet.users.getUser(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    }, pixapp.blog.userName);
});

asyncTest("getAnalyticsData", function() {
    expect(1);
    pixnet.users.getAnalyticsData(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    });
});