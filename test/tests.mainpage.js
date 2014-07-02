module('pixnet.mainpage', {
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

asyncTest("getBlogColumns", function() {
    expect(1);
    pixnet.mainpage.getBlogColumns(function(data) {
        console.log(data);
        equal(true, pixnet.isArray(data), data);
        start();
    });
});

asyncTest("getBlogColumnsCategories", function() {
    expect(1);
    pixnet.mainpage.getBlogColumnsCategories(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    });
});

asyncTest("getAlbumColumns", function() {
    expect(1);
    pixnet.mainpage.getAlbumColumns(function(data) {
        console.log(data);
        equal(true, pixnet.isArray(data), data);
        start();
    });
});

asyncTest("getArticlesByCategory [hot | 1]", function() {
    expect(1);
    pixnet.mainpage.getArticlesByCategory(function(data) {
        console.log(data);
        equal(true, pixnet.isArray(data), data);
        start();
    }, 'hot', 1);
});

asyncTest("getArticlesByCategory [latest | 2]", function() {
    expect(1);
    pixnet.mainpage.getArticlesByCategory(function(data) {
        console.log(data);
        equal(true, pixnet.isArray(data), data);
        start();
    }, 'latest', 2);
});

asyncTest("getArticlesByCategory [hot_weekly | 3]", function() {
    expect(1);
    pixnet.mainpage.getArticlesByCategory(function(data) {
        console.log(data);
        equal(true, pixnet.isArray(data), data);
        start();
    }, 'hot_weekly', 3);
});

asyncTest("getAlbumsByCategory [hot | 1]", function() {
    expect(1);
    pixnet.mainpage.getAlbumsByCategory(function(data) {
        console.log(data);
        equal(true, pixnet.isArray(data), data);
        start();
    }, 'hot', 1);
});

asyncTest("getAlbumsByCategory [latest | 2]", function() {
    expect(1);
    pixnet.mainpage.getAlbumsByCategory(function(data) {
        console.log(data);
        equal(true, pixnet.isArray(data), data);
        start();
    }, 'latest', 2);
});

asyncTest("getAlbumsByCategory [hot_weekly | 3]", function() {
    expect(1);
    pixnet.mainpage.getAlbumsByCategory(function(data) {
        console.log(data);
        equal(true, pixnet.isArray(data), data);
        start();
    }, 'hot_weekly', 3);
});

asyncTest("getVideos [hot | 1]", function() {
    expect(1);
    pixnet.mainpage.getVideos(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    }, 'hot', 1);
});

asyncTest("getVideos [latest | 2]", function() {
    expect(1);
    pixnet.mainpage.getVideos(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    }, 'latest', 2);
});

asyncTest("getVideos [hot_weekly | 3]", function() {
    expect(1);
    pixnet.mainpage.getVideos(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    }, 'hot_weekly', 3);
});