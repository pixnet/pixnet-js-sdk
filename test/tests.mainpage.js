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
