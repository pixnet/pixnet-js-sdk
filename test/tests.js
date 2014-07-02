module('pixnet', {
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

test( "extend function test", function() {
    expect(11);
    ok(pixnet, "pixnet");
    ok(pixnet._hasProp, "pixnet._hasProp");
    ok(pixnet._extends, "pixnet._extends");
    ok(pixnet._defaultXHROptions, "pixnet._defaultRequestOption");
    ok(pixnet._serialize, "pixnet._serialize");
    ok(pixnet._getUrlPara, "pixnet._getUrlPara");
    ok(pixnet._ajaxOpts, "pixnet._ajaxOpts");
    ok(pixnet._get, "pixnet._get");
    ok(pixnet._ajax, "pixnet._ajax");
    ok(pixnet._log, "pixnet._log");
    ok(pixnet._error, "pixnet._error");
});

test( "core function test", function() {
    expect(12);
    ok(pixnet.isLogin, "pixnet.isLogin");
    ok(pixnet.getData, "pixnet.getData");
    ok(pixnet.setSceret, "pixnet.setSceret");
    ok(pixnet.setKey, "pixnet.setKey");
    ok(pixnet.setTokens, "pixnet.setTokens");
    ok(pixnet.setCode, "pixnet.setCode");
    ok(pixnet.init, "pixnet.init");
    ok(pixnet.login, "pixnet.login");
    ok(pixnet.logout, "pixnet.logout");
    ok(pixnet.requestTokens, "pixnet.getTokens");
    ok(pixnet.refreshToken, "pixnet.refreshToken");
    ok(pixnet.apiInvalidGrantFunc, "pixnet.apiInvalidGrantFunc");
});

test( "pixnet 初始化測試", function() {
    expect(3);
    var data = pixnet.getData();
    equal(data.consumerKey ,    pixnet.getData('consumerKey'),    "consumerKey");
    equal(data.consumerSecret , pixnet.getData('consumerSecret'), "consumerSecret");
    equal(data.callbackUrl ,    pixnet.getData('callbackUrl'),    "callbackUrl");
});

test( "login 基本功能測試", function() {
    expect(9);
    var ans = pixnet.isLogin();

    equal(ans, true, 'Sure be login.');
    stop();
    pixnet.login(function() {
        var app = pixnet.getData();
        equal(pixnet.isLogin(), true, 'Sure be logined.');
        equal(app.code, localStorage['code'], 'code');
        equal(app.accessToken, localStorage['accessToken'], 'accessToken');
        equal(app.refreshToken, localStorage['refreshToken'], 'refreshToken');

        pixnet.logout(function() {
            equal(pixnet.isLogin(), false, 'Sure be logout.');
            ok(!localStorage['code'], 'free code');
            ok(!localStorage['accessToken'], 'free accessToken');
            ok(!localStorage['refreshToken'], 'free refreshToken');
            start();
        });
    });
});