module('pixnet.users', {
    setup: function() {
        pixapp = pixapp || {};
        pixapp.user = pixapp.user || {};
        pixapp.user.newPassword = pixapp.user.userPassword + '_new';

        stop();
        var init = pixnet._extends({
            login: true,
            loginCallback: function() {
                pixnet.users.getAccount(function(data) {
                    pixapp.user.userName = data.account.name;
                    start();
                });
            }
        }, pixapp.init);
        pixnet.init(init);
    }
});

asyncTest("getAccount", function() {
    expect(1);
        pixnet.users.getAccount(function(data) {
            console.log('getAccount', data);
            equal(0, data.error, data.message);
            start();
        });
});

asyncTest("updateAccount", function (){
   expect(1);
    pixnet.users.updateAccount(function(data) {
        console.log('updateAccount', data);
        equal(0, data.error, data.message);
        start();
    }, pixapp.user.userPassword);

});

asyncTest("updatePassword", function (){
    expect(2);
    pixnet.users.updatePassword(function(data) {
        console.log('updatePassword', data);
        equal(0, data.error, data.message);
        // change password back
        pixnet.users.updatePassword(function(data) {
            console.log('updatePassword again', data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.user.newPassword, pixapp.user.userPassword);
    }, pixapp.user.userPassword, pixapp.user.newPassword);

});

asyncTest("getUser", function() {
    expect(1);
    pixnet.users.getUser(function(data) {
        console.log('getUser', data);
        equal(0, data.error, data.message);
        start();
    }, pixapp.user.userName);
});

asyncTest("getAnalyticsData", function() {
    expect(1);
    pixnet.users.getAnalyticsData(function(data) {
        console.log('getAnalyticsData', data);
        equal(0, data.error, data.message);
        start();
    });
});

asyncTest("getNotifications", function() {
    expect(1);
    pixnet.users.getNotifications(function(data) {
        console.log('getNotifications', data);
        equal(0, data.error, data.message);
        start();
    });
});

