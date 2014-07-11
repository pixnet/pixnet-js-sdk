// Generated by CoffeeScript 1.7.1
(function() {
  var PixMainpage;

  PixMainpage = (function() {
    function PixMainpage() {}

    PixMainpage.prototype.getBlogColumns = function(callback, optionData) {
      var category, data;
      category = (optionData != null ? optionData.categoryId : void 0) ? "/" + optionData.categoryId : "";
      data = {};
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/mainpage/blog/columns" + category, pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixMainpage.prototype.getBlogColumnsCategories = function(callback, optionData) {
      var data;
      data = {};
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/mainpage/blog/columns/categories", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixMainpage.prototype.getAlbumColumns = function(callback, optionData) {
      var data;
      data = {};
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/mainpage/album/columns", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixMainpage.prototype.getArticlesByCategory = function(callback, type, categoryId, optionData) {
      var data;
      data = {};
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/mainpage/blog/categories/" + type + "/" + categoryId, pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixMainpage.prototype.getAlbumsByCategory = function(callback, type, categoryId, optionData) {
      var data;
      data = {};
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/mainpage/album/categories/" + type + "/" + categoryId, pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixMainpage.prototype.getVideos = function(callback, type, categoryId, optionData) {
      var data;
      data = {};
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/mainpage/album/video/" + type, pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixMainpage.prototype.getAlbumBestSelected = function(callback, optionData) {
      var data;
      data = {};
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/mainpage/album/best_selected", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    return PixMainpage;

  })();

  pixnet.mainpage = new PixMainpage();

}).call(this);
