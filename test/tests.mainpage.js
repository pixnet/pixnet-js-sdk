module('pixnet.mainpage', {
    setup: function() {
        pixnet.init(pixapp.init);
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
