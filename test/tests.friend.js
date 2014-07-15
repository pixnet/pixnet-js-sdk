module('pixnet.friend', {
    setup: function() {
        pixapp = pixapp || {};
        pixapp.friend = pixapp.friend || {};
        pixapp.friend.friendName = 'phpsdk';
        pixapp.friend.groupName = 'test group';
        pixapp.friend.groupUpdateName = 'test update group';
        pixapp.friend.subName = 'test subscription group';
        pixapp.friend.subUpdateName = 'update subscription group';

        stop();
        var init = pixnet._extends({
            login: true,
            loginCallback: function() {
                pixnet.users.getAccount(function(data) {
                    pixnet.friend.userName = data.account.name;
                    start();
                });
            }
        }, pixapp.init);
        pixnet.init(init);
    }
});

asyncTest("getGroups", function() {
    expect(1);
    pixnet.friend.getGroups(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    });
});

asyncTest("group and friendship modify", function() {
    expect(7);
    pixnet.friend.createGroup(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
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

                        pixnet.friend.updateGroup(function(data) {
                            console.log(data);
                            equal(0, data.error, data.message);

                            pixnet.friend.deleteGroup(function(data) {
                                console.log(data);
                                equal(0, data.error, data.message);
                                start();
                            }, pixapp.friend.groupId);
                        }, pixapp.friend.groupId, pixapp.friend.groupUpdateName);
                    }, pixapp.friend.friendName);
                }, pixapp.friend.friendName, pixapp.friend.groupId);
            }, pixapp.friend.friendName, pixapp.friend.groupId);
        }, pixapp.friend.friendName);
    }, pixapp.friend.groupName);
});

asyncTest("getFriendships", function() {
    expect(1);
        pixnet.friend.getFriendships(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
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

asyncTest("Subscriptions", function() {
    expect(10);
        pixnet.friend.getSubscriptions(function(data) {
            console.log(data);

            equal(0, data.error, data.message);
            if (data.subscriptions && data.subscriptions.length) {
                pixapp.friend.subscriptionId = data.subscriptions[0].user.name;

                pixnet.friend.deleteSubscription(function(data) {
                    console.log(data);
                    subscriptionTestCase();
                }, pixapp.friend.friendName);
            } else {
                subscriptionTestCase();
            }

        });
});

var subscriptionTestCase = function() {
    pixnet.friend.createSubscription(function(data) {
        console.log(data);
        equal(0, data.error, data.message);

        pixnet.friend.createSubscriptionGroup(function(data) {
            console.log(data);
            equal(0, data.error, data.message);

            pixapp.friend.subscriptionId = data.subscription_group.id;
            pixnet.friend.updateSubscriptionGroup(function(data) {
                console.log(data);
                equal(0, data.error, data.message);

                pixnet.friend.getSubscriptionGroup(function(data) {
                    console.log(data);
                    equal(0, data.error, data.message);

                    var ids = [];
                    for (var i = data.subscription_groups.length; i--;) {
                        ids.push(data.subscription_groups[i].id);
                    }

                    pixnet.friend.sortSubscriptionGroupTo(function(data) {
                        console.log(data);
                        equal(true, pixnet.isArray(data.subscription_groups), data);

                        pixnet.friend.joinSubscriptionGroup(function(data) {
                            console.log(data);
                            equal(0, data.error, data.message);

                            pixnet.friend.leaveSubscriptionGroup(function(data) {
                                console.log(data);
                                equal(0, data.error, data.message);

                                pixnet.friend.deleteSubscriptionGroup(function(data) {
                                    console.log(data);
                                    equal(0, data.error, data.message);

                                    pixnet.friend.deleteSubscription(function(data) {
                                        console.log(data);
                                        equal(0, data.error, data.message);

                                        start();
                                    }, pixapp.friend.friendName);
                                }, pixapp.friend.subscriptionId);
                            }, pixapp.friend.friendName, ids.toString());
                        }, pixapp.friend.friendName, ids.toString());
                    }, ids.toString());
                });
            }, pixapp.friend.subscriptionId, pixapp.friend.subUpdateName);
        }, pixapp.friend.subName);
    }, pixapp.friend.friendName);
};
