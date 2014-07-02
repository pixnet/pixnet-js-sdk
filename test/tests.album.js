module('pixnet.album', {
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
asyncTest("album set modify", function() {
    expect(4);
    pixnet.login(function() {
        pixnet.album.createAlbumSet(function(data) {
            console.log(data);
            equal(0, data.error, data.message);

            pixapp.album.albumId = data.set.id;

            pixnet.album.updateAlbumSet(function(data) {
                console.log(data);
                equal(0, data.error, data.message);

                pixnet.album.getAlbumSet(function(data) {
                    console.log(data);
                    equal(0, data.error, data.message);

                    pixnet.album.deleteAlbumSet(function(data) {
                        console.log(data);
                        equal(0, data.error, data.message);
                        start();
                    }, pixapp.album.albumId);
                }, pixapp.album.albumId, pixapp.blog.userName, {
                    access_token : pixnet.getData('accessToken')
                });
            }, pixapp.album.albumId, 'update album', 'update update eteupdatets e update');

        }, 'test album', 'test etst etets e tstest');
    });
});


asyncTest("getAlbumSetsNear", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.album.getAlbumSetsNear(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.blog.userName, pixapp.album.lat_y, pixapp.album.lon_x);
    });
});

asyncTest("getSetComments by setId", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.album.getSetComments(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.blog.userName, {
            set_id: pixapp.album.albumIdHasEls
        });
    });
});


asyncTest("createSetComment", function() {
    expect(2);
    pixnet.login(function() {
        pixnet.album.createSetComment(function(data) {
            console.log(data);
            equal(0, data.error, data.message);

            pixnet.album.deleteSetComment(function(data) {
                console.log(data);
                equal(0, data.error, data.message);
                start();
            }, data.comment.id);
        }, pixapp.album.albumIdHasEls, pixapp.blog.userName, 'test comment');
    });
});

asyncTest("markSetCommentSpam", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.album.markSetCommentSpam(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.album.setCommentId, pixapp.blog.userName);
    });
});

asyncTest("markSetCommentHam", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.album.markSetCommentHam(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.album.setCommentId);
    });
});

asyncTest("getComments", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.album.getComments(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.blog.userName);
    });
});

asyncTest("element comment modify", function() {
    expect(4);
    pixnet.login(function() {
        pixnet.album.createElementComment(function(data) {
            console.log(data);
            equal(0, data.error, data.message);

            pixapp.album.commentId = data.comment.id;
            pixnet.album.markElementCommentSpam(function(data) {
                console.log(data);
                equal(0, data.error, data.message);
                pixnet.album.markElementCommentHam(function(data) {
                    console.log(data);
                    equal(0, data.error, data.message);
                    pixnet.album.deleteElementComment(function(data) {
                        console.log(data);
                        equal(0, data.error, data.message);
                        start();
                    }, pixapp.album.commentId);
                }, pixapp.album.commentId);
            }, pixapp.album.commentId);
        }, pixapp.album.elementId, pixapp.blog.userName, 'test element comment.');
    });
});

asyncTest("face modify", function() {
    expect(3);
    pixnet.login(function() {
        pixnet.album.createFace(function(data) {
            console.log(data);
            equal(0, data.error, data.message);

            if (data.element) {
                pixapp.album.face = data.element.faces.tagged[0];
            }

            pixnet.album.updateFace(function(data) {
                console.log(data);
                equal(0, data.error, data.message);
                pixnet.album.deleteFace(function(data) {
                    console.log(data);
                    equal(0, data.error, data.message);
                    start();
                }, pixapp.album.face.id);
            }, pixapp.album.face.id, pixapp.album.face.user, pixapp.album.elementId, 10, 10, 10, 10);
        }, pixapp.album.face.user, pixapp.album.elementId, 100, 100, 100, 100);
    });
});

asyncTest("getConfig", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.album.getConfig(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        });
    });
});

asyncTest("getSiteCategories", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.album.getSiteCategories(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        });
    });
});