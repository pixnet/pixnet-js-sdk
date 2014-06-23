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
