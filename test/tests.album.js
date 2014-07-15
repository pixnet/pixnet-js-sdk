module('pixnet.album', {
    setup: function() {
        pixapp = pixapp || {};
        pixapp.album = pixapp.album || {};
        pixapp.album.setTitle = 'test album title';
        pixapp.album.setUpdateTitle = 'update album title';
        pixapp.album.setDisc = 'test etst etets e tstest';
        pixapp.album.setUpdateDisc = 'update update eteupdatets e update';
        pixapp.album.elementTitle = 'update element title';
        pixapp.album.faceUser = 'phpsdk';
        pixapp.album.lat_y = '25.0854062';
        pixapp.album.lat_x = '121.5615012';
        pixapp.album.commentBody = 'test comment';

        stop();
        var init = pixnet._extends({
            login: true,
            loginCallback: function() {
                pixnet.users.getAccount(function(data) {
                    pixapp.album.userName = data.account.name;
                    pixapp.album.isVip = data.account.is_vip;
                    start();
                });
            }
        }, pixapp.init);
        pixnet.init(init);
    }
});

asyncTest("getAlbumMain", function() {
    expect(1);
    pixnet.album.getAlbumMain(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    });
});

asyncTest("getElementCommentsNear", function() {
    expect(1);
    pixnet.album.getElementCommentsNear(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    }, pixapp.album.userName, pixapp.album.lat_y, pixapp.album.lon_x);
});

asyncTest("getAlbumSetsNear", function() {
    expect(1);
    pixnet.album.getAlbumSetsNear(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    }, pixapp.album.userName, pixapp.album.lat_y, pixapp.album.lon_x);
});

asyncTest("getAlbumFolders", function() {
    expect(1);
    pixnet.album.getAlbumFolders(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    }, pixapp.album.userName);
});

asyncTest("getComments", function() {
    expect(1);
    pixnet.album.getComments(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    }, pixapp.album.userName);
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

asyncTest("getAlbumSetfolders", function() {
    if (pixapp.album.isVip) {
        expect(6);
        pixnet.album.createAlbumFolder(function(data) {
            console.log(data);
            equal(0, data.error, data.message);

            pixapp.album.folderId = data.folder.id;

            pixnet.album.updateAlbumFolder(function(data) {
                console.log(data);
                equal(0, data.error, data.message);

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

                        pixnet.album.getAlbumFolder(function(data) {
                            console.log(data);
                            equal(0, data.error, data.message);

                            pixnet.album.deleteAlbumFolder(function(data) {
                                console.log(data);
                                equal(0, data.error, data.message);
                                start();
                            }, pixapp.album.folderId);
                        }, pixapp.album.folderId, pixapp.album.userName);
                    }, ids.toString());
                }, pixapp.album.userName);
            }, pixapp.album.folderId, 'update album', 'update update eteupdatets e update');
        }, 'test folder', 'folderfolderfolderfolderfolder');
    } else {
        expect(1);
        equal(0, pixapp.album.isVip, '此部份測試僅供 VIP 帳號測試。');
        start();
    }
});

asyncTest("album set and element modify", function() {
    pixnet.album.createAlbumSet(function(data) { // 建立相簿
        console.log(data);
        equal(0, data.error, data.message);

        pixapp.album.albumId = data.set.id;

        pixnet.album.updateAlbumSet(function(data) { // 更新相簿敘述
            console.log(data);
            equal(0, data.error, data.message);

            pixnet.album.getAlbumSet(function(data) { // 取得單一相簿
                console.log(data);
                equal(0, data.error, data.message);

                pixnet.album.getAlbumSets(function(data) { // 取得所有相簿
                    console.log(data);
                    equal(0, data.error, data.message);

                    var ids = [], parentId = "0";
                    if (data.sets.length) {
                        parentId = data.sets[0].parent_id;
                        pixapp.album.albumId = data.sets[0].id;
                    }
                    for (var i = data.sets.length; i--;) {
                        ids.push(data.sets[i].id);
                    }

                    pixnet.album.sortAlbumSets(function(data) { // 排序所有相簿
                        console.log(data);
                        equal(true, pixnet.isArray(data.sets), data.message);

                        var dataURL = "data:image/png;base64,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";

                        pixnet.album.createElement(function(data) { // 上傳相片
                            console.log(data);
                            equal(0, data.error, data.message);
                            pixapp.album.elementId = data.element.id;

                            pixnet.album.updateElement(function(data) { // 更新相片資訊
                                console.log(data);
                                equal(0, data.error, data.message);

                                pixnet.album.getAlbumSetElements(function(data) { // 取得單一相簿的所有相片或影片
                                    console.log(data);
                                    equal(0, data.error, data.message);

                                    pixnet.album.getAlbumElements(function(data) { // 同上
                                        console.log(data);
                                        equal(0, data.error, data.message);

                                        var ids = [];
                                        for (var i = data.elements.length; i--;) {
                                            ids.push(data.elements[i].id);
                                        }

                                        pixnet.album.getElement(function(data) { // 取得單一相片或影片
                                            console.log(data);
                                            equal(0, data.error, data.message);

                                            if (data.element.faces.tagged.length) {
                                                pixapp.album.face.id = data.element.faces.tagged[0].id;

                                                pixnet.album.deleteFace(function(data) {
                                                    console.log(data);
                                                    faceModify(callback(ids.toString()));
                                                }, pixapp.album.face.id);
                                            } else {
                                                faceModify(callback(ids.toString()));
                                            }
                                        }, pixapp.album.elementId, pixapp.album.userName, {
                                            access_token : pixnet.getData('accessToken')
                                        });
                                    }, pixapp.album.albumId, pixapp.album.userName, {
                                        access_token : pixnet.getData('accessToken')
                                    });
                                }, pixapp.album.albumId, pixapp.album.userName, {
                                    access_token : pixnet.getData('accessToken')
                                });
                            }, pixapp.album.elementId, {
                                title: pixapp.album.elementTitle
                            });
                        }, pixapp.album.albumId, dataURL, {
                            upload_method: 'base64'
                        });
                    }, parentId, ids.toString());
                }, pixapp.album.userName);
            }, pixapp.album.albumId, pixapp.album.userName, {
                access_token : pixnet.getData('accessToken')
            });
        }, pixapp.album.albumId, pixapp.album.setUpdateTitle, pixapp.album.setUpdateDisc, {
            permission: 0,
            cancomment: 1
        });
    }, pixapp.album.setTitle, pixapp.album.setDisc);

    var callback = function(ids) {
        return function() {
            pixnet.album.getElementComments(function(data) { // 取得此相片所有留言
                console.log(data);
                equal(0, data.error, data.message);

                pixnet.album.sortElement(function(data) { // 排序所有相片
                    console.log(data);
                    equal(true, pixnet.isArray(data.elements), data.message);

                    pixnet.album.getSetComments(function(data) { // getSetComments by setId
                        console.log(data);
                        equal(0, data.error, data.message);

                        pixnet.album.getSetComments(function(data) { // getSetComments by elementId
                            console.log(data);
                            equal(0, data.error, data.message);

                            pixnet.album.createSetComment(function(data) { // createSetComment
                                console.log(data);
                                equal(0, data.error, data.message);

                                pixapp.album.setCommentId = data.comment.id;

                                pixnet.album.markSetCommentSpam(function(data) { // markSetCommentSpam
                                    console.log(data);
                                    equal(0, data.error, data.message);

                                    pixnet.album.markSetCommentHam(function(data) { // markSetCommentHam
                                        console.log(data);
                                        equal(0, data.error, data.message);

                                        pixnet.album.createElementComment(function(data) { // 新增相片留言
                                            console.log(data);
                                            equal(0, data.error, data.message);

                                            pixapp.album.commentId = data.comment.id;
                                            pixnet.album.markElementCommentSpam(function(data) { // 設定相片留言為廣告
                                                console.log(data);
                                                equal(0, data.error, data.message);

                                                pixnet.album.markElementCommentHam(function(data) {  // 取消設定相片留言為廣告
                                                    console.log(data);
                                                    equal(0, data.error, data.message);

                                                    pixnet.album.deleteElementComment(function(data) {  // 刪除相片留言
                                                        console.log(data);
                                                        equal(0, data.error, data.message);

                                                        pixnet.album.deleteSetComment(function(data) { // 刪除相簿留言
                                                            console.log(data);
                                                            equal(0, data.error, data.message);

                                                            pixnet.album.deleteElement(function(data) { // 刪除相片
                                                                console.log(data);
                                                                equal(0, data.error, data.message);

                                                                pixnet.album.deleteAlbumSet(function(data) { // 刪除相簿
                                                                    console.log(data);
                                                                    equal(0, data.error, data.message);

                                                                    start();
                                                                }, pixapp.album.albumId);
                                                            }, pixapp.album.elementId);
                                                        }, pixapp.album.setCommentId);
                                                    }, pixapp.album.commentId);
                                                }, pixapp.album.commentId);
                                            }, pixapp.album.commentId);
                                        }, pixapp.album.elementId, pixapp.album.userName, 'test element comment.');
                                    }, pixapp.album.setCommentId);
                                }, pixapp.album.setCommentId, pixapp.album.userName);
                            }, pixapp.album.albumId, pixapp.album.userName, pixapp.album.commentBody);
                        }, pixapp.album.userName, {
                            element_id: pixapp.album.elementId
                        });
                    }, pixapp.album.userName, {
                        set_id: pixapp.album.albumId
                    });
                }, pixapp.album.albumId, ids);
            }, pixapp.album.elementId, pixapp.album.userName, {
                access_token : pixnet.getData('accessToken')
            });
        };
    };

    var faceModify = function(cb) {
        pixnet.album.createFace(function(data) {
            console.log(data);
            if (0 === data.error) {
                equal(0, data.error, data.message);
                pixapp.album.face = data.element.faces.tagged[0];
                pixnet.album.updateFace(function(data) {
                    console.log(data);
                    equal(0, data.error, data.message);
                    pixnet.album.deleteFace(function(data) {
                        console.log(data);
                        equal(0, data.error, data.message);

                        if (cb) {
                            cb();
                        } else {
                            start();
                        }
                    }, pixapp.album.face.id);
                }, pixapp.album.face.id, pixapp.album.face.user, pixapp.album.elementId, 10, 10, 10, 10);
            } else {
                equal("Permission denied, Friend only", data.message, '此帳號沒有好友，無法測試 face modify 相關測試，略過繼續。');
                if (cb) {
                    cb();
                } else {
                    start();
                }
            }
        }, pixapp.album.faceUser, pixapp.album.elementId, 5, 5, 5, 5);
    };
});