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

asyncTest("getAlbumSets", function() {
    expect(2);
    pixnet.login(function() {
        pixnet.album.getAlbumSets(function(data) {
            console.log(data);
            equal(0, data.error, data.message);

            var ids = [], parentId = "0";
            if (data.sets.length) {
                parentId = data.sets[0].parent_id;
            }
            for (var i = data.sets.length; i--;) {
                ids.push(data.sets[i].id);
            }

            pixnet.album.sortAlbumSets(function(data) {
                console.log(data);
                equal(true, pixnet.isArray(data.sets), data.message);
                start();
            }, parentId, ids.toString());

        }, pixapp.blog.userName);
    });
});

asyncTest("getAlbumSetElements", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.album.getAlbumSetElements(function(data) {
            console.log(data);
            equal(0, data.error, data.message);

            start();
        }, pixapp.album.albumId, pixapp.blog.userName, {
            access_token : pixnet.getData('accessToken')
        });
    });
});

asyncTest("getAlbumElements, Comments, one element, and sort", function() {
    expect(4);
    pixnet.login(function() {
        pixnet.album.getAlbumElements(function(data) {
            console.log(data);
            equal(0, data.error, data.message);

            var ids = [];
            for (var i = data.elements.length; i--;) {
                ids.push(data.elements[i].id);
            }

            pixapp.album.elementId = data.elements[0].id;
            pixnet.album.getElement(function(data) {
                console.log(data);
                equal(0, data.error, data.message);

                pixnet.album.getElementComments(function(data) {
                    console.log(data);
                    equal(0, data.error, data.message);

                    pixnet.album.sortElement(function(data) {
                        console.log(data);
                        equal(true, pixnet.isArray(data.elements), data.message);
                        start();
                    }, pixapp.album.albumIdHasEls, ids);

                }, pixapp.album.elementId, pixapp.blog.userName, {
                    access_token : pixnet.getData('accessToken')
                });
            }, pixapp.album.elementId, pixapp.blog.userName, {
                access_token : pixnet.getData('accessToken')
            });
        }, pixapp.album.albumIdHasEls, pixapp.blog.userName, {
            access_token : pixnet.getData('accessToken')
        });
    });
});

asyncTest("getElementCommentsNear", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.album.getElementCommentsNear(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.blog.userName, pixapp.album.lat_y, pixapp.album.lon_x);
    });
});
