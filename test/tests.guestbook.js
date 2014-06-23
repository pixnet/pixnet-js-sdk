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

asyncTest("reply", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.guestbook.reply(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.guestbook.artId, 'reply guestbook');
    });
});

asyncTest("setOpen", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.guestbook.setOpen(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.guestbook.artId);
    });
});

asyncTest("setClose", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.guestbook.setClose(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.guestbook.artId);
    });
});


