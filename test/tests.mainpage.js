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


