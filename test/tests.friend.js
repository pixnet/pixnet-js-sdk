module('pixnet.friend', {
    setup: function() {
        pixnet.init(pixapp.init);
    }
});

asyncTest("getGroups", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.friend.getGroups(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        });
    });
});
