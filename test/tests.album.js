module('pixnet.album', {
    setup: function() {
        pixnet.init(pixapp.init);
    }
});

asyncTest("getAlbumMain", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.album.getAlbumMain(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        });
    });
});

asyncTest("getAlbumSetfolders", function() {
    expect(2);
    pixnet.login(function() {
        pixnet.album.getAlbumSetfolders(function(data) {
            console.log(data);
            equal(0, data.error, data.message);

            var ids = [];
            for (var i = data.setfolders.length; i--;) {
                ids.push(data.setfolders[i].id);
            }

            pixnet.album.sortSetFolders(function(data) {
                console.log(data);
                equal(true, pixnet.isArray(data.sets), data.message);
                start();
            }, ids.toString());

        }, pixapp.blog.userName);
    });
});
