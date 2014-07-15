module('pixnet.guestbook', {
    setup: function() {
        pixapp = pixapp || {};
        pixapp.guestbook = pixapp.guestbook || {};
        pixapp.guestbook.title = 'create guestbook title';
        pixapp.guestbook.body = 'body guestbook';
        pixapp.guestbook.replyBody = 'reply guestbook';

        stop();
        var init = pixnet._extends({
            login: true,
            loginCallback: function() {
                pixnet.users.getAccount(function(data) {
                    pixapp.guestbook.userName = data.account.name;
                    start();
                });
            }
        }, pixapp.init);
        pixnet.init(init);
    }
});

asyncTest("guest book test case", function() {
    expect(9);
    pixnet.guestbook.create(function(data) {
        console.log(data);
        equal(0, data.error, data.message);

        pixnet.guestbook.getAll(function(data) {
            console.log(data);
            equal(0, data.error, data.message);

            pixapp.guestbook.artId = data.articles[0].id;

            pixnet.guestbook.getOne(function(data) {
                console.log(data);
                equal(0, data.error, data.message);

                pixnet.guestbook.reply(function(data) {
                    console.log(data);
                    equal(0, data.error, data.message);

                    pixnet.guestbook.setOpen(function(data) {
                        console.log(data);
                        equal(0, data.error, data.message);

                        pixnet.guestbook.setClose(function(data) {
                            console.log(data);
                            equal(0, data.error, data.message);

                            pixnet.guestbook.markSpam(function(data) {
                                console.log(data);
                                equal(0, data.error, data.message);

                                pixnet.guestbook.markHam(function(data) {
                                    console.log(data);
                                    equal(0, data.error, data.message);

                                    pixnet.guestbook.delete(function(data) {
                                        console.log(data);
                                        equal(0, data.error, data.message);
                                        start();
                                    }, pixapp.guestbook.artId);
                                }, pixapp.guestbook.artId);
                            }, pixapp.guestbook.artId);
                        }, pixapp.guestbook.artId);
                    }, pixapp.guestbook.artId);
                }, pixapp.guestbook.artId, pixapp.guestbook.replyBody);
            }, pixapp.guestbook.artId, pixapp.guestbook.userName);
        }, pixapp.guestbook.userName);
    }, pixapp.guestbook.title, pixapp.guestbook.body, pixapp.guestbook.userName);
});