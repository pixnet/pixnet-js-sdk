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
                equal('[object Array]', Object.prototype.toString.call(data.categories), data.message);
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

                pixnet.blog.getArticle(function(data) {
                    console.log(data);
                    equal(0, data.error, data.message);
                }, pixapp.blog.artId, pixapp.blog.userName);

                pixnet.blog.getRelatedArticle(function(data) {
                    console.log(data);
                    equal(0, data.error, data.message);
                    start();
                }, pixapp.blog.artId, pixapp.blog.userName);

        }, pixapp.blog.userName);
    });
});
