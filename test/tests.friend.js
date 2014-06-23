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

asyncTest("group modify", function() {
    expect(3);
    pixnet.login(function() {
        pixnet.friend.createGroup(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            pixapp.friend.groupId = data.friend_group.id;

            pixnet.friend.updateGroup(function(data) {
                console.log(data);
                equal(0, data.error, data.message);
            }, pixapp.friend.groupId, 'update group');

            pixnet.friend.deleteGroup(function(data) {
                console.log(data);
                equal(0, data.error, data.message);
                start();
            }, pixapp.friend.groupId);
        }, 'test group');
    });
});

asyncTest("getFriendships", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.friend.getFriendships(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        });
    });
});
