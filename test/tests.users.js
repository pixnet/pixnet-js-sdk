module('pixnet.users', {
    setup: function() {
        pixnet.init(pixapp.init);
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