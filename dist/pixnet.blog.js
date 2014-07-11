// Generated by CoffeeScript 1.7.1
(function() {
  var PixBlog;

  PixBlog = (function() {
    function PixBlog() {}

    PixBlog.prototype.getInfo = function(callback, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get('https://emma.pixnet.cc/blog', pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixBlog.prototype.updateInfo = function(callback, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post('https://emma.pixnet.cc/blog', {
        data: data,
        done: (function(_this) {
          return function(data) {
            if (callback) {
              return callback(data);
            }
          };
        })(this),
        fail: (function(_this) {
          return function(data) {
            return pixnet.apiInvalidGrantFunc(function() {
              return _this.updateInfo.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixBlog.prototype.getCategories = function(callback, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get('https://emma.pixnet.cc/blog/categories', pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixBlog.prototype.createCategories = function(callback, name, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        name: name,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post('https://emma.pixnet.cc/blog/categories', {
        data: data,
        done: (function(_this) {
          return function(data) {
            if (callback) {
              return callback(data);
            }
          };
        })(this),
        fail: (function(_this) {
          return function(data) {
            return pixnet.apiInvalidGrantFunc(function() {
              return _this.createBlogCategories.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixBlog.prototype.updateCategories = function(callback, id, name, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        name: name,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/blog/categories/" + id, {
        data: data,
        done: (function(_this) {
          return function(data) {
            if (callback) {
              return callback(data);
            }
          };
        })(this),
        fail: (function(_this) {
          return function(data) {
            return pixnet.apiInvalidGrantFunc(function() {
              return _this.updateCategories.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixBlog.prototype.deleteCategories = function(callback, id, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._delete("https://emma.pixnet.cc/blog/categories/" + id, {
        data: data,
        done: (function(_this) {
          return function(data) {
            if (callback) {
              return callback(data);
            }
          };
        })(this),
        fail: (function(_this) {
          return function(data) {
            return pixnet.apiInvalidGrantFunc(function() {
              return _this.deleteBlogCategories.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixBlog.prototype.sortCategoriesTo = function(callback, ids, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      if (typeof ids !== 'string') {
        ids = ids.toString();
      }
      data = {
        ids: ids,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/blog/categories/position", {
        data: data,
        done: (function(_this) {
          return function(data) {
            if (callback) {
              return callback(data);
            }
          };
        })(this),
        fail: (function(_this) {
          return function(data) {
            return pixnet.apiInvalidGrantFunc(function() {
              return _this.sortCategoriesTo.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixBlog.prototype.getAllArticles = function(callback, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get('https://emma.pixnet.cc/blog/articles', pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixBlog.prototype.getArticle = function(callback, id, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/blog/articles/" + id, pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixBlog.prototype.getRelatedArticle = function(callback, id, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/blog/articles/" + id + "/related", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixBlog.prototype.createArticle = function(callback, title, body, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        title: title,
        body: body,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post('https://emma.pixnet.cc/blog/articles', {
        data: data,
        done: (function(_this) {
          return function(data) {
            if (callback) {
              return callback(data);
            }
          };
        })(this),
        fail: (function(_this) {
          return function(data) {
            return pixnet.apiInvalidGrantFunc(function() {
              return _this.createArticle.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixBlog.prototype.updateArticle = function(callback, id, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/blog/articles/" + id, {
        data: data,
        done: (function(_this) {
          return function(data) {
            if (callback) {
              return callback(data);
            }
          };
        })(this),
        fail: (function(_this) {
          return function(data) {
            return pixnet.apiInvalidGrantFunc(function() {
              return _this.updateArticle.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixBlog.prototype.deleteArticle = function(callback, id, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._delete("https://emma.pixnet.cc/blog/articles/" + id, {
        data: data,
        done: (function(_this) {
          return function(data) {
            if (callback) {
              return callback(data);
            }
          };
        })(this),
        fail: (function(_this) {
          return function(data) {
            return pixnet.apiInvalidGrantFunc(function() {
              return _this.deleteArticle.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixBlog.prototype.getLatestArticle = function(callback, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/blog/articles/latest", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixBlog.prototype.getHotArticle = function(callback, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/blog/articles/hot", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixBlog.prototype.searchArticle = function(callback, keyWord, userName, optionData) {
      var data;
      data = {
        key: keyWord,
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/blog/articles/search", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixBlog.prototype.getComments = function(callback, id, userName, optionData) {
      var data;
      data = {
        user: userName,
        article_id: id
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/blog/comments", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixBlog.prototype.createComment = function(callback, articleId, body, userName, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        article_id: articleId,
        body: body,
        user: userName,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post('https://emma.pixnet.cc/blog/comments', {
        data: data,
        done: (function(_this) {
          return function(data) {
            if (callback) {
              return callback(data);
            }
          };
        })(this),
        fail: (function(_this) {
          return function(data) {
            return pixnet.apiInvalidGrantFunc(function() {
              return _this.createComment.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixBlog.prototype.getSingleComment = function(callback, id, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/blog/comments/" + id, pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixBlog.prototype.replyComment = function(callback, id, body, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        body: body,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/blog/comments/" + id + "/reply", {
        data: data,
        done: (function(_this) {
          return function(data) {
            if (callback) {
              return callback(data);
            }
          };
        })(this),
        fail: (function(_this) {
          return function(data) {
            return pixnet.apiInvalidGrantFunc(function() {
              return _this.replyComment.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixBlog.prototype.setCommentOpen = function(callback, id, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/blog/comments/" + id + "/open", {
        data: data,
        done: (function(_this) {
          return function(data) {
            if (callback) {
              return callback(data);
            }
          };
        })(this),
        fail: (function(_this) {
          return function(data) {
            return pixnet.apiInvalidGrantFunc(function() {
              return _this.setCommentOpen.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixBlog.prototype.setCommentClose = function(callback, id, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/blog/comments/" + id + "/close", {
        data: data,
        done: (function(_this) {
          return function(data) {
            if (callback) {
              return callback(data);
            }
          };
        })(this),
        fail: (function(_this) {
          return function(data) {
            return pixnet.apiInvalidGrantFunc(function() {
              return _this.setCommentClose.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixBlog.prototype.markCommentSpam = function(callback, id, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/blog/comments/" + id + "/mark_spam", {
        data: data,
        done: (function(_this) {
          return function(data) {
            if (callback) {
              return callback(data);
            }
          };
        })(this),
        fail: (function(_this) {
          return function(data) {
            return pixnet.apiInvalidGrantFunc(function() {
              return _this.markCommentSpam.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixBlog.prototype.markCommentHam = function(callback, id, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/blog/comments/" + id + "/mark_ham", {
        data: data,
        done: (function(_this) {
          return function(data) {
            if (callback) {
              return callback(data);
            }
          };
        })(this),
        fail: (function(_this) {
          return function(data) {
            return pixnet.apiInvalidGrantFunc(function() {
              return _this.markCommentSpam.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixBlog.prototype.deleteComment = function(callback, id, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._delete("https://emma.pixnet.cc/blog/comments/" + id, {
        data: data,
        done: (function(_this) {
          return function(data) {
            if (callback) {
              return callback(data);
            }
          };
        })(this),
        fail: (function(_this) {
          return function(data) {
            return pixnet.apiInvalidGrantFunc(function() {
              return _this.deleteComment.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixBlog.prototype.getLatestComment = function(callback, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/blog/comments/latest", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixBlog.prototype.getSiteCategories = function(callback, optionData) {
      var data;
      data = {};
      data = pixnet._extends(data, optionData);
      pixnet._get('https://emma.pixnet.cc/blog/site_categories', pixnet._defaultXHROptions(data, callback));
      return this;
    };

    return PixBlog;

  })();

  pixnet.blog = new PixBlog();

}).call(this);
