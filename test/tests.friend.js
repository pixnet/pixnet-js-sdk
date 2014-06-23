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

asyncTest("friendships modify", function() {
    expect(4);
    pixnet.login(function() {
        pixnet.friend.createGroup(function(data) {
            pixapp.friend.groupId = data.friend_group.id;

            pixnet.friend.createFriendship(function(data) {
                console.log(data);
                equal(0, data.error, data.message);

                pixnet.friend.appendFriendshipGroup(function(data) {
                    console.log(data);
                    equal(0, data.error, data.message);

                    pixnet.friend.removeFriendshipGroup(function(data) {
                        console.log(data);
                        equal(0, data.error, data.message);

                        pixnet.friend.deleteFriendship(function(data) {
                            console.log(data);
                            equal(0, data.error, data.message);
                            start();
                        }, pixapp.friend.friendName);
                    }, pixapp.friend.friendName, pixapp.friend.groupId);
                }, pixapp.friend.friendName, pixapp.friend.groupId);
            }, pixapp.friend.friendName);
        }, 'test group');
    });
});

asyncTest("getNews", function() {
    expect(1);
    pixnet.friend.getNews(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    });
});

asyncTest("getSubscriptions", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.friend.getSubscriptions(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        });
    });
});

asyncTest("subscriptions modify", function() {
    expect(2);
    pixnet.login(function() {
        pixnet.friend.createSubscription(function(data) {
            console.log(data);
            equal(0, data.error, data.message);

            pixnet.friend.deleteSubscription(function(data) {
                console.log(data);
                equal(0, data.error, data.message);
                start();
            }, pixapp.friend.friendName);
        }, pixapp.friend.friendName);
    });
});
