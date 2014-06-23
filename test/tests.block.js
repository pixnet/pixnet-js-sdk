module('pixnet.block', {
    setup: function() {
        pixnet.init(pixapp.init);
    }
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