module('pixnet.blog', {
    setup: function() {
        pixnet.init(pixapp.init);
    }
});

asyncTest("getInfo", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.blog.getInfo(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.blog.userName);
    });
});

asyncTest("categorie modify", function() {
    expect(3);
    pixnet.login(function() {
        pixnet.blog.createCategories(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            pixapp.blog.cateId = data.category.id;

            pixnet.blog.updateCategories(function(data) {
                console.log(data);
                equal(0, data.error, data.message);

                pixnet.blog.deleteCategories(function(data) {
                    console.log(data);
                    equal(0, data.error, data.message);
                    start();
                }, pixapp.blog.cateId);

            }, pixapp.blog.cateId, 'update cate name');

        }, pixapp.blog.cateName);
    });
});

asyncTest("categories", function() {
    expect(2);
    pixnet.login(function() {
        pixnet.blog.getCategories(function(data) {
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

            pixnet.blog.sortCategoriesTo(function(data) {
                console.log(data);
                equal(true, pixnet.isArray(data.categories), data.message);
                start();
            }, pixapp.blog.cateIds);

        }, pixapp.blog.userName);
    });
});

asyncTest("articles modify", function() {
    expect(3);
    pixnet.login(function() {
        pixnet.blog.createArticle(function(data) {
            console.log(data);
            equal(0, data.error, data.message);

            pixapp.blog.artId = data.article.id;

            pixnet.blog.updateArticle(function(data) {
                console.log(data);
                equal(0, data.error, data.message);

                pixnet.blog.deleteArticle(function(data) {
                    console.log(data);
                    equal(0, data.error, data.message);
                    start();

                }, pixapp.blog.artId);
            }, pixapp.blog.artId, {
                title: 'update title',
                body: '<h2>update body</h2>'
            });


        }, pixapp.blog.artTitle, pixapp.blog.artBody);
    });

});

asyncTest("articles", function() {
    expect(3);
    pixnet.login(function() {
        pixnet.blog.getAllArticles(function(data) {
            console.log(data);
            equal(0, data.error, data.message);

            pixapp.blog.artId = data.articles[0].id;

            pixnet.blog.getRelatedArticle(function(data) {
                console.log(data);
                equal(0, data.error, data.message);

                pixnet.blog.getArticle(function(data) {
                    console.log(data);
                    equal(0, data.error, data.message);
                    start();
                }, pixapp.blog.artId, pixapp.blog.userName);
            }, pixapp.blog.artId, pixapp.blog.userName);
        }, pixapp.blog.userName);
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

asyncTest("searchArticle", function() {
    expect(1);
    pixnet.blog.searchArticle(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    }, 'update', pixapp.blog.userName);
});

asyncTest("getComments", function() {
    expect(1);
    pixnet.blog.getComments(function(data) {
        console.log(data);
        equal(0, data.error, data.message);
        start();
    }, pixapp.blog.artId, pixapp.blog.userName);
});

asyncTest("createComment", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.blog.createComment(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
            pixapp.blog.commentId = data.comment.id;
        }, pixapp.blog.artId, 'this is a comment test', pixapp.blog.userName);
    });
});

asyncTest("getSingleComment", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.blog.getSingleComment(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.blog.commentId, pixapp.blog.userName);
    });
});

asyncTest("replyComment", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.blog.replyComment(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.blog.commentId, 'this is a reply message');
    });
});

asyncTest("setCommentOpen", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.blog.setCommentOpen(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.blog.commentId);
    });
});

asyncTest("setCommentClose", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.blog.setCommentClose(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.blog.commentId);
    });
});

asyncTest("markCommentSpam", function() {
    expect(1);
    pixnet.login(function() {
        pixnet.blog.markCommentSpam(function(data) {
            console.log(data);
            equal(0, data.error, data.message);
            start();
        }, pixapp.blog.commentId);
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
