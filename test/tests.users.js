module('pixnet.users', {
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
    }, pixapp.blog.userName);
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

asyncTest("createMIBAccount", function (){
    if (!pixapp.mib.testing) {
        expect(0);
        start();
    } else {
        expect(1);
        pixnet.users.getMIBAccount(function (data) {
            // 當測試者已經測試過了，就不用再測試了
            if (data.mib.applied === 0) {
                var base64Image = 'data:image/gif;base64,R0lGODdhMgAyAOMAAMzMzJaWlsXFxbGxsb6+vre3t5ycnKOjo6qqqgAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAMgAyAAAEhRDISau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru9878uCwSf4IgQEHiOyFWhKCgZDQTIwBA6SZsBVOAIEgcJgCwgMoE9vSwkwapEIg1DCXnuNBMESAMW21SxsYAMEcwGFZHUsAlZTUGYSCAFSEoxhP5iZmpucnZ6foKGio6SlpqeoHxEAOw==',
                    needData = {
                        id_number: pixapp.mib.id_number,
                        email: pixapp.mib.email,
                        cellphone: pixapp.mib.cellphone,
                        mail_address: pixapp.mib.mail_address,
                        domicile: pixapp.mib.domicile,
                        enable_video_ad: pixapp.mib.enable_video_ad,
                        name: pixapp.mib.name,
                        id_image_front: base64Image,
                        id_image_back: base64Image
                    },
                    options = {
                        upload_method: 'base64'
                    };
                pixnet.users.createMIBAccount(function (data) {
                    console.log('createMIBAccount', data);
                    equal(0, data.error, data.message);
                    start();
                }, needData, options);
            } else {
                //假如側試過了， checking
                equal(0, data.error, data.message);
                start();
            }
        });
    }
});

asyncTest("getMIBAccount", function() {
    expect(1);
    pixnet.users.getMIBAccount(function(data) {
        console.log('getMIBAccount', data);
        equal(0, data.error, data.message);
        start();
    });
});

asyncTest("getMIBPositionData", function() {
    expect(2);
    pixnet.users.getMIBAccount(function(data) {
        equal(0, data.error, data.message);
        var positions = data.mib.blog.positions,
            posId = 0;
        if (positions.article.length != 0 ) {
            posId = positions.article[0].id;
        } else if (positions.blog.length != 0) {
            posId = positions.blog[0].id;
        } else if (positions.other.length != 0) {
            posId = positions.other[0].id;
        }
        pixnet.users.getMIBPositionData(function(data) {
            console.log('getMIBPositionData', data);
            equal(0, data.error, data.message);
            start();
        }, posId);
    });
});

asyncTest("updateMIBPositionData", function (){
    expect(2);
    pixnet.users.getMIBAccount(function(data) {
        equal(0, data.error, data.message);
        var positions = data.mib.blog.positions,
            posId = 0;
        if (positions.article.length != 0 ) {
            posId = positions.article[0].id;
        } else if (positions.blog.length != 0) {
            posId = positions.blog[0].id;
        } else if (positions.other.length != 0) {
            posId = positions.other[0].id;
        }
        pixnet.users.updateMIBPositionData(function(data) {
            console.log('updateMIBPositionData', data);
            equal(0, data.error, data.message);
            start();
        }, posId, 1, 1);
    });
});


