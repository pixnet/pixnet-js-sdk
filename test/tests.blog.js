module('pixnet.blog', {
    setup: function() {
        pixapp = pixapp || {};
        pixapp.blog = pixapp.blog || {};
        pixapp.blog.cateName = 'test cate name';
        pixapp.blog.updateCateName = 'test update cate name';
        pixapp.blog.artTitle = 'test article title';
        pixapp.blog.artBody = 'test article body';
        pixapp.blog.updateArtTitle = 'test update article title';
        pixapp.blog.updateArtBody = 'test update article body';
        pixapp.blog.commentBody = 'this is a comment test';
        pixapp.blog.commentReplyBody = 'this is a reply message';
        pixapp.blog.searchKey = 'update';
        stop();
        var init = pixnet._extends({
            login: true,
            loginCallback: function() {
                pixnet.users.getAccount(function(data) {
                    pixapp.blog.userName = data.account.name;
                    start();
                });
            }
        }, pixapp.init);
        pixnet.init(init);
    }
});

asyncTest("getInfo", function() {
    expect(1);
    pixnet.blog.getInfo(function(data) {
        console.log('getInfo', data);
        equal(0, data.error, data.message);
        start();
    }, pixapp.blog.userName);
});

asyncTest("updateInfo", function () {
    expect(1);
    pixnet.blog.updateInfo(function (data) {
        console.log('updateInfo', data);
        equal(0, data.error, data.message);
        start();
    });
});

asyncTest("categorie modify", function() {
    expect(5);
    pixnet.blog.createCategories(function(data) { // 先新增一個類別
        console.log(data);
        equal(0, data.error, data.message);
        pixapp.blog.cateId = data.category.id;

        pixnet.blog.getCategories(function(data) { // 有類別後，取得所有類別
            console.log(data);
            equal(0, data.error, data.message);

            var tmpArr = [];
            for (var i = data.categories.length; i--;) {
                if (0 === data.categories[i].id) {
                    continue;
                }
                tmpArr.push(data.categories[i].id);
            }
            pixapp.blog.cateIds = tmpArr;
            pixnet.blog.sortCategoriesTo(function(data) { // 類別排序
                console.log(data);
                equal(true, pixnet.isArray(data.categories), data.message);
                pixnet.blog.updateCategories(function(data) { // 更新類別
                    console.log(data);
                    equal(0, data.error, data.message);
                    pixnet.blog.deleteCategories(function(data) { // 最後刪除類別
                        console.log(data);
                        equal(0, data.error, data.message);
                        start();
                    }, pixapp.blog.cateId);
                }, pixapp.blog.cateId, pixapp.blog.updateCateName);
            }, pixapp.blog.cateIds);
        }, pixapp.blog.userName);
    }, pixapp.blog.cateName);
});

asyncTest("article and comment modify", function() {
    expect(16);
    pixnet.login(function() {
        pixnet.blog.createArticle(function(data) { // 新增文章
            console.log(data);
            equal(0, data.error, data.message);

            pixapp.blog.artId = data.article.id;

            pixnet.blog.updateArticle(function(data) { // 更新文章
                console.log(data);
                equal(0, data.error, data.message);

                pixnet.blog.getAllArticles(function(data) { // 取得所有文章
                    console.log(data);
                    equal(0, data.error, data.message);

                    pixapp.blog.artId = data.articles[0].id;

                    pixnet.blog.getRelatedArticle(function(data) { // 取得相關文章
                        console.log(data);
                        equal(0, data.error, data.message);

                        pixnet.blog.getArticle(function(data) { // 取得單一文章
                            console.log(data);
                            equal(0, data.error, data.message);

                            pixnet.blog.createComment(function(data) { // 從文章建立留言
                                console.log(data);
                                equal(0, data.error, data.message);

                                pixnet.blog.getComments(function(data) { // 取得留言
                                    console.log(data);
                                    equal(0, data.error, data.message);

                                    pixnet.blog.getSingleComment(function(data) { // 取得單一留言
                                        console.log(data);
                                        equal(0, data.error, data.message);

                                        pixnet.blog.replyComment(function(data) { // 回覆留言
                                            console.log(data);
                                            equal(0, data.error, data.message);

                                            pixnet.blog.setCommentOpen(function(data) { // 設定公開
                                                console.log(data);
                                                equal(0, data.error, data.message);

                                                pixnet.blog.setCommentClose(function(data) { // 設定隱藏
                                                    console.log(data);
                                                    equal(0, data.error, data.message);

                                                    pixnet.blog.markCommentSpam(function(data) { // 標為垃圾
                                                        console.log(data);
                                                        equal(0, data.error, data.message);

                                                        pixnet.blog.markCommentHam(function(data) { // 取消標垃圾
                                                            console.log(data);
                                                            equal(0, data.error, data.message);

                                                            pixnet.blog.deleteComment(function(data) { // 刪除留言
                                                                console.log(data);
                                                                equal(0, data.error, data.message);

                                                                pixnet.blog.searchArticle(function(data) { // 搜尋文章
                                                                    console.log(data);
                                                                    equal(0, data.error, data.message);

                                                                    pixnet.blog.deleteArticle(function(data) { // 刪除文章
                                                                        console.log(data);
                                                                        equal(0, data.error, data.message);

                                                                        start();
                                                                    }, pixapp.blog.artId);
                                                                }, pixapp.blog.searchKey, pixapp.blog.userName);
                                                            }, pixapp.blog.commentId);
                                                        }, pixapp.blog.commentId);
                                                    }, pixapp.blog.commentId);
                                                }, pixapp.blog.commentId);
                                            }, pixapp.blog.commentId);
                                        }, pixapp.blog.commentId, pixapp.blog.commentReplyBody);
                                    }, pixapp.blog.commentId, pixapp.blog.userName);
                                }, pixapp.blog.artId, pixapp.blog.userName);
                                pixapp.blog.commentId = data.comment.id;
                            }, pixapp.blog.artId, pixapp.blog.commentBody, pixapp.blog.userName);
                        }, pixapp.blog.artId, pixapp.blog.userName);
                    }, pixapp.blog.artId, pixapp.blog.userName);
                }, pixapp.blog.userName);
            }, pixapp.blog.artId, {
                title: pixapp.blog.updateArtTitle,
                body: pixapp.blog.updateArtBody
            });
        }, pixapp.blog.artTitle, pixapp.blog.artBody);
    });
});

asyncTest("getLatestArticle", function() {
    expect(1);
    pixnet.blog.getLatestArticle(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    }, pixapp.blog.userName);
});

asyncTest("getHotArticle", function() {
    expect(1);
    pixnet.blog.getHotArticle(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    }, pixapp.blog.userName);
});

asyncTest("getLatestComment", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.blog.getLatestComment(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.blog.userName);
    });
});

asyncTest("getSiteCategories", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.blog.getSiteCategories(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.blog.userName);
    });
});

asyncTest("getSuggestedTags", function() {
    expect(1);
    pixnet.blog.getSuggestedTags(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    }, pixapp.blog.userName);
});