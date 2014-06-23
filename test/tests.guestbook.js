module('pixnet.guestbook', {
    setup: function() {
        pixnet.init(pixapp.init);
    }
});

asyncTest("getAll", function() {
    expect(1);
    pixnet.guestbook.getAll(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();

        pixapp.guestbook.artId = data.articles[0].id;
    }, pixapp.blog.userName);
});

asyncTest("getOne", function() {
    expect(1);
    pixnet.guestbook.getOne(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    }, pixapp.guestbook.artId, pixapp.blog.userName);
});



