module('pixnet.users', {
});

asyncTest("getAccount", function() {
    pixnet.login(function() {
        pixnet.users.getAccount(function(data) {
            equal(0, data.error, data.message);
            start();
        });
    });
});

asyncTest("getUser", function() {
    expect(1);
    pixnet.users.getUser(function(data) {
        equal(0, data.error, data.message);
        start();
    }, 'admin');
});