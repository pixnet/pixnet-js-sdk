module('pixnet.block', {
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

asyncTest("getBlock", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.block.getBlock(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        });
    });
});

asyncTest("createBlock", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.block.createBlock(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.friend.friendName);
    });
});

asyncTest("deleteBlock", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.block.deleteBlock(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.friend.friendName);
    });
});