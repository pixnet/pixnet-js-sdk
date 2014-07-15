module('pixnet.block', {
    setup: function() {
        pixapp = pixapp || {};
        pixapp.block = pixapp.block || {};
        pixapp.block.friendName = 'phpsdk';

        stop();
        var init = pixnet._extends({
            login: true,
            loginCallback: function() {
                pixnet.friend.createSubscription(function(data) {
                    start();
                }, pixapp.block.friendName);
            }
        }, pixapp.init);
        pixnet.init(init);
    }
});

asyncTest("block modify", function() {
    expect(4);
    pixnet.block.createBlock(function(data) { // 新增黑名單
        console.log(data);
        equal(0, data.error, data.message);

        pixnet.block.getBlock(function(data) { // 取得黑名單
            console.log(data);
            equal(0, data.error, data.message);

            pixnet.block.deleteBlock(function(data) { // 刪除黑名單
                console.log(data);
                equal(0, data.error, data.message);

                pixnet.friend.deleteSubscription(function(data) { // 刪除朋友
                    console.log(data);
                    equal(0, data.error, data.message);

                    start();
                }, pixapp.block.friendName);
            }, pixapp.block.friendName);
        });
    }, pixapp.block.friendName);
});