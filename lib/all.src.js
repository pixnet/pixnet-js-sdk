
/*
自幹工具區
 */

(function() {
  var Container, NoJquery, PixConsole, Pixnet, SuperClass, moduleKeywords,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  NoJquery = (function() {
    function NoJquery() {
      this._ajax = __bind(this._ajax, this);
      this._upload = __bind(this._upload, this);
      this._post = __bind(this._post, this);
      this._delete = __bind(this._delete, this);
      this._get = __bind(this._get, this);
      this._getUrlPara = __bind(this._getUrlPara, this);
      this._serialize = __bind(this._serialize, this);
    }

    NoJquery.prototype._getDoc = function(frame) {
      var doc, err;
      try {
        if (frame.contentWindow) {
          doc = frame.contentWindow.document;
        }
      } catch (_error) {
        err = _error;
        this._log('cannot get iframe.contentWindow document: ' + err);
      }
      if (doc) {
        return doc;
      }
      try {
        doc = frame.contentDocument ? frame.contentDocument : frame.document;
      } catch (_error) {
        err = _error;
        this._log('cannot get iframe.contentDocument: ' + err);
        doc = frame.document;
      }
      return doc;
    };

    NoJquery.prototype._hasProp = {}.hasOwnProperty;

    NoJquery.prototype._extends = function(child, parent) {
      var key;
      if (!parent) {
        parent = {};
      }
      for (key in parent) {
        if (!__hasProp.call(parent, key)) continue;
        child[key] = parent[key];
      }
      return child;
    };

    NoJquery.prototype._defaultXHROptions = function(data, callback) {
      return {
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
            if (callback) {
              return callback(data);
            }
          };
        })(this)
      };
    };

    NoJquery.prototype._serialize = function(data) {
      var dataString, key, val;
      dataString = '';
      if (typeof data === 'object') {
        for (key in data) {
          if (!__hasProp.call(data, key)) continue;
          val = data[key];
          if (dataString === '') {
            dataString += "?" + key + "=" + val;
          } else {
            dataString += "&" + key + "=" + val;
          }
        }
      }
      return dataString;
    };

    NoJquery.prototype._getUrlPara = function(name) {
      var item, para, params, url, _i, _len;
      url = window.location.search;
      if (-1 !== url.indexOf("?")) {
        params = url.split("?")[1].split("&");
        for (_i = 0, _len = params.length; _i < _len; _i++) {
          item = params[_i];
          para = item.split("=");
          if (para[0] === name) {
            return para[1];
          } else {
            return void 0;
          }
        }
      } else {
        return void 0;
      }
    };

    NoJquery.prototype._ajaxOpts = {
      type: 'GET',
      url: '',
      data: {},
      dataType: 'json',
      charset: 'UTF-8',
      enctype: 'application/x-www-form-urlencoded'
    };

    NoJquery.prototype._get = function(url, opts) {
      if (opts.data.access_token && !url.match(/^https/)) {
        url = url.replace(/^http\:\/\//, "https://");
      }
      opts.type = 'GET';
      opts.url = url;
      opts.data = opts.data || {};
      opts.data['format'] = 'json';
      return this._ajax(opts);
    };

    NoJquery.prototype._delete = function(url, opts) {
      opts.type = 'POST';
      opts.url = url;
      opts.data = opts.data || {};
      opts.data['_method'] = 'delete';
      opts.data['format'] = 'json';
      return this._ajax(opts);
    };

    NoJquery.prototype._post = function(url, opts) {
      opts.type = 'POST';
      opts.url = url;
      opts.data = opts.data || {};
      opts.data['format'] = 'json';
      return this._ajax(opts);
    };

    NoJquery.prototype._upload = function(url, opts) {
      opts.type = 'UPLOAD';
      opts.url = url;
      opts.data = opts.data || {};
      opts.data['format'] = 'json';
      return this._ajax(opts);
    };

    NoJquery.prototype._ajax = function(opts) {
      var contenType, dataType, done, fail, key, params, request, val, _ref, _ref1;
      opts = this._extends(this._ajaxOpts, opts);
      if ((_ref = opts.data.pretty_print) === 1 || _ref === "1") {
        dataType = "text";
      } else {
        dataType = opts.dataType;
      }
      if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
      } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      }
      contenType = "" + opts.enctype + "; charset=" + opts.charset;
      switch (opts.type) {
        case 'GET':
        case 'DELETE':
          opts.url += this._serialize(opts.data);
          params = "";
          break;
        case 'POST':
        case 'PUT':
          params = this._serialize(opts.data).substr(1);
          break;
        case 'UPLOAD':
          opts.type = 'POST';
          params = new FormData();
          _ref1 = opts.data;
          for (key in _ref1) {
            if (!__hasProp.call(_ref1, key)) continue;
            val = _ref1[key];
            params.append(key, val);
          }
          contenType = null;
          break;
        default:
          params = "";
      }
      done = opts.done || opts.success || function() {};
      fail = opts.fail || opts.error || function() {};
      request.open(opts.type, opts.url);
      if (contenType) {
        request.setRequestHeader('Content-Type', contenType);
      }
      request.onload = function() {
        var resp;
        if (request.status >= 200 && request.status < 400) {
          resp = request.responseText;
          if (dataType === 'json') {
            resp = JSON.parse(resp);
          }
          if (typeof done === 'function') {
            return done(resp);
          }
        } else {
          resp = request.responseText;
          if (typeof fail === 'function') {
            return fail(resp);
          }
        }
      };
      request.send(params);
      return request;
    };

    return NoJquery;

  })();


  /*
  訊息回報區
   */

  PixConsole = (function() {
    function PixConsole() {}

    PixConsole.prototype._procStop = false;

    PixConsole.prototype._log = function(msg) {
      return console.log("Pixnet Log: ", msg);
    };

    PixConsole.prototype._error = function(msg, keepGoing) {
      console.error("Pixnet Error: ", msg);
      return this._procStop = !keepGoing;
    };

    return PixConsole;

  })();


  /*
  緩衝繼承區
   */

  moduleKeywords = ['included', 'extended'];

  SuperClass = (function() {
    function SuperClass() {}

    SuperClass.include = function(obj) {
      var included, key, value, _ref;
      if (!obj) {
        throw 'include(obj) requires obj';
      }
      _ref = obj.prototype;
      for (key in _ref) {
        value = _ref[key];
        if (__indexOf.call(moduleKeywords, key) < 0) {
          this.prototype[key] = value;
        }
      }
      included = obj.included;
      if (included) {
        included.apply(this);
      }
      return this;
    };

    return SuperClass;

  })();

  Container = (function(_super) {
    __extends(Container, _super);

    function Container() {
      return Container.__super__.constructor.apply(this, arguments);
    }

    Container.include(PixConsole);

    Container.include(NoJquery);

    return Container;

  })(SuperClass);


  /*
  Core
   */

  Pixnet = (function(_super) {
    __extends(Pixnet, _super);

    function Pixnet() {
      this.apiInvalidGrantFunc = __bind(this.apiInvalidGrantFunc, this);
      this.refreshToken = __bind(this.refreshToken, this);
      this.requestTokens = __bind(this.requestTokens, this);
      this.logout = __bind(this.logout, this);
      this.getAuthorizeUrl = __bind(this.getAuthorizeUrl, this);
      this.login = __bind(this.login, this);
      this.setCode = __bind(this.setCode, this);
      this.setTokens = __bind(this.setTokens, this);
      this.setKey = __bind(this.setKey, this);
      this.setSecret = __bind(this.setSecret, this);
      this.getData = __bind(this.getData, this);
      this.isLogin = __bind(this.isLogin, this);
      return Pixnet.__super__.constructor.apply(this, arguments);
    }

    Pixnet.prototype.data = {
      app: {
        code: '',
        consumerKey: '',
        consumerSecret: '',
        callbackUrl: '',
        accessToken: '',
        refreshToken: '',
        isLogin: false,
        loginOpts: {
          type: 'onepage',
          popwin: void 0
        }
      }
    };

    Pixnet.prototype.isArray = function(arr) {
      if ("[object Array]" === Object.prototype.toString.call(arr)) {
        return true;
      } else {
        return false;
      }
    };

    Pixnet.prototype.isLogin = function() {
      return this.data.app.isLogin;
    };

    Pixnet.prototype.getData = function(field) {
      if (field) {
        return this.data.app[field];
      } else {
        return this.data.app;
      }
    };

    Pixnet.prototype.setSecret = function(secret) {
      this.data.app.consumerSecret = secret;
      return this;
    };

    Pixnet.prototype.setKey = function(key) {
      this.data.app.consumerKey = key;
      return this;
    };

    Pixnet.prototype.setTokens = function(accessToken, refreshToken) {
      this.data.app.accessToken = accessToken;
      this.data.app.refreshToken = refreshToken;
      localStorage["" + this.data.app.consumerKey + "accessToken"] = accessToken;
      localStorage["" + this.data.app.consumerKey + "refreshToken"] = refreshToken;
      return this;
    };

    Pixnet.prototype.setCode = function(code) {
      this.data.app.code = code;
      return this;
    };

    Pixnet.prototype.init = function(options) {
      var keyChecker;
      keyChecker = function(key) {
        return !!((key != null ? key.match(/[a-z0-9]{32}/) : void 0) && key.length === 32);
      };
      if (options.consumerKey) {
        this.data.app.consumerKey = options.consumerKey;
      }
      if (options.consumerSecret) {
        this.data.app.consumerSecret = options.consumerSecret;
      }
      if (options.callbackUrl) {
        this.data.app.callbackUrl = options.callbackUrl;
      }
      if (!keyChecker(this.data.app.consumerKey)) {
        this._error('consumerKey format is wrong');
      }
      if (!keyChecker(this.data.app.consumerSecret)) {
        this._error('consumerSecret format is wrong');
      }
      if (this._procStop) {
        return;
      }
      if (options.login === true) {
        this.login(options.loginCallback, this.data.app.loginOpts);
      }
      return this;
    };

    Pixnet.prototype.login = function(callback, opts) {
      var callbackUrl, consumerKey, url;
      opts = opts || {};
      if (localStorage["" + this.data.app.consumerKey + "accessToken"]) {
        this.setCode(localStorage["" + this.data.app.consumerKey + "code"]);
        this.setTokens(localStorage["" + this.data.app.consumerKey + "accessToken"], localStorage["" + this.data.app.consumerKey + "refreshToken"]);
        this.data.app.isLogin = true;
        if (callback) {
          callback.call(this, this.data.app);
        }
      } else {
        opts = this._extends(this.data.app.loginOpts, opts);
        callbackUrl = opts.callbackUrl || this.data.app.callbackUrl;
        consumerKey = this.data.app.consumerKey;
        if (!callbackUrl) {
          this._error('callbackUrl is not defined');
        }
        if (!consumerKey) {
          this._error('consumerKey is not defined');
        }
        if (this._procStop) {
          return;
        }
        if (this._getUrlPara('code') && opts.type !== 'custom') {
          this.setCode(this._getUrlPara('code'));
          if (opts.onGetCode) {
            opts.onGetCode.call(this, this.data.app);
          }
          this.requestTokens(callback, this.data.app);
        } else {
          url = this.getAuthorizeUrl(callbackUrl, consumerKey);
          switch (opts.type) {
            case 'custom':
              if (!opts.custom) {
                this._error('You must set a custom function for getting code from oauth2');
              }
              opts.custom.apply(this, arguments);
              break;
            case 'popwin':
              this.data.app.loginOpts.popwin = window.open(url, 'getCodeWindow');
              break;
            default:
              location.href = url;
          }
        }
      }
      return this;
    };

    Pixnet.prototype.getAuthorizeUrl = function(callbackUrl, consumerKey) {
      return "https://emma.pixnet.cc/oauth2/authorize?redirect_uri=" + callbackUrl + "&client_id=" + consumerKey + "&response_type=code";
    };

    Pixnet.prototype.logout = function(callback) {
      this.setCode('');
      this.setTokens('', '');
      this.data.app.isLogin = false;
      if (callback) {
        callback();
      }
      return this;
    };

    Pixnet.prototype.requestTokens = function(callback, data) {
      data = this._extends(this.data.app, data);
      if (!data.consumerSecret) {
        this._error('consumerSecret is not defined');
      }
      return this._get('https://emma.pixnet.cc/oauth2/grant', {
        data: {
          redirect_uri: data.callbackUrl,
          client_id: data.consumerKey,
          client_secret: data.consumerSecret,
          code: data.code,
          grant_type: "authorization_code"
        },
        done: (function(_this) {
          return function(response) {
            _this.setTokens(response.access_token, response.refresh_token);
            _this.data.app.isLogin = true;
            if (callback) {
              return callback.call(_this, response);
            }
          };
        })(this),
        fail: (function(_this) {
          return function(rep) {
            var response;
            if (data && typeof rep === "string") {
              response = JSON.parse(rep);
            } else {
              response = rep;
            }
            if (response.error === 'invalid_grant') {
              return _this.refreshToken(callback);
            } else {
              if (callback) {
                return callback.call(_this, response);
              }
            }
          };
        })(this)
      });
    };

    Pixnet.prototype.refreshToken = function(callback, opts) {
      var data;
      data = this._extends(this.data.app, {});
      if (!data.refreshToken) {
        this._error('refreshToken is not defined');
      }
      if (!data.consumerKey) {
        this._error('consumerKey is not defined');
      }
      if (!data.consumerSecret) {
        this._error('consumerSecret is not defined');
      }
      if (this._procStop) {
        return;
      }
      return this._get('https://emma.pixnet.cc/oauth2/grant', {
        data: {
          refresh_token: data.refreshToken,
          client_id: data.consumerKey,
          client_secret: data.consumerSecret,
          grant_type: "refresh_token"
        },
        done: (function(_this) {
          return function(response) {
            _this.setTokens(response.access_token, response.refresh_token);
            _this.data.app.isLogin = true;
            if (callback) {
              return callback.call(_this, response);
            }
          };
        })(this),
        fail: (function(_this) {
          return function(rep) {
            var response;
            if (data && typeof rep === "string") {
              response = JSON.parse(rep);
            } else {
              response = rep;
            }
            if (response.error === 'invalid_grant') {
              _this.setCode('');
              opts = _this._extends(data, {
                type: 'custom',
                custom: function() {
                  return location.href = _this.getAuthorizeUrl(data.callbackUrl, data.consumerKey);
                }
              });
              return _this.login(callback, opts);
            } else {
              if (callback) {
                return callback.call(_this, response);
              }
            }
          };
        })(this)
      });
    };

    Pixnet.prototype.apiInvalidGrantFunc = function(callback, data, args) {
      var response;
      if (data && typeof data === "string") {
        response = JSON.parse(data);
      } else {
        response = data;
      }
      if (response.error === 'invalid_grant') {
        return this.refreshToken(callback);
      } else {
        args[0].call(this, response);
        return this._error(response.message);
      }
    };

    return Pixnet;

  })(Container);

  window.pixnet = new Pixnet();

}).call(this);

(function() {
  var PixAlbum;

  PixAlbum = (function() {
    function PixAlbum() {}

    PixAlbum.prototype.getAlbumMain = function(callback, optionData) {
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
      pixnet._get('https://emma.pixnet.cc/album/main', {
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
              return _this.getAlbumMain.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.getAlbumSetfolders = function(callback, userName, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        user: userName,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._get('https://emma.pixnet.cc/album/setfolders', {
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
              return _this.getAlbumSets.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.sortSetFolders = function(callback, ids, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        ids: ids,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post('https://emma.pixnet.cc/album/setfolders/position', {
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
              return _this.sortSetFolders.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.getAlbumSets = function(callback, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("http://emma.pixnet.cc/album/sets", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixAlbum.prototype.getAlbumSet = function(callback, id, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("http://emma.pixnet.cc/album/sets/" + id, pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixAlbum.prototype.getAlbumSetElements = function(callback, setId, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("http://emma.pixnet.cc/album/sets/" + setId, pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixAlbum.prototype.getAlbumSetComments = function(callback, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("http://emma.pixnet.cc/album/set_comments", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixAlbum.prototype.createAlbumSet = function(callback, title, description, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        title: title,
        description: description,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post('https://emma.pixnet.cc/album/sets', {
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
              return _this.createAlbumSet.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.updateAlbumSet = function(callback, id, title, description, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        title: title,
        description: description,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/album/sets/" + id, {
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
              return _this.updateAlbumSet.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.deleteAlbumSet = function(callback, id, optionData) {
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
      pixnet._delete("https://emma.pixnet.cc/album/sets/" + id, {
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
              return _this.deleteAlbumSet.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.sortAlbumSets = function(callback, parentId, ids, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        parent_id: parentId,
        ids: ids,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/album/sets/position", {
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
              return _this.sortAlbumSets.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.getAlbumSetsNear = function(callback, userName, lat_y, lon_x, optionData) {
      var data;
      data = {
        user: userName,
        lat: lat_y,
        lon: lon_x
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("http://emma.pixnet.cc/album/sets/nearby", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixAlbum.prototype.getAlbumFolders = function(callback, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("http://emma.pixnet.cc/album/folders", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixAlbum.prototype.getAlbumFolder = function(callback, id, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("http://emma.pixnet.cc/album/folders/" + id, pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixAlbum.prototype.getAlbumFolderSets = function(callback, id, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("http://emma.pixnet.cc/album/folders/" + id + "/sets", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixAlbum.prototype.createAlbumFolder = function(callback, title, description, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        title: title,
        description: description,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post('https://emma.pixnet.cc/album/folders', {
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
              return _this.createAlbumFolder.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.updateAlbumFolder = function(callback, id, title, description, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        title: title,
        description: description,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/album/folders/" + id, {
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
              return _this.updateAlbumFolder.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.deleteAlbumFolder = function(callback, id, optionData) {
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
      pixnet._delete("https://emma.pixnet.cc/album/folders/" + id, {
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
              return _this.deleteAlbumFolder.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.getAlbumElements = function(callback, setId, userName, optionData) {
      var data;
      data = {
        user: userName,
        set_id: setId
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("http://emma.pixnet.cc/album/elements", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixAlbum.prototype.getElement = function(callback, elementId, userName, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        user: userName,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._get("https://emma.pixnet.cc/album/elements/" + elementId, {
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
              return _this.getElement.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.getElementComments = function(callback, elementId, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("http://emma.pixnet.cc/album/elements/" + elementId + "/comments", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixAlbum.prototype.createElement = function(callback, setId, uploadFile, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        set_id: setId,
        upload_file: uploadFile,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      if (data.upload_method === "base64") {
        data.upload_file = uploadFile.replace('data:image/png;base64,', '');
      }
      pixnet._upload("https://emma.pixnet.cc/album/elements", {
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
              return _this.createElement.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.updateElement = function(callback, id, optionData) {
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
      pixnet._post("https://emma.pixnet.cc/album/elements/" + id, {
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
              return _this.updateElement.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.deleteElement = function(callback, id, optionData) {
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
      pixnet._delete("https://emma.pixnet.cc/album/elements/" + id, {
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
              return _this.deleteElementt.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.sortElement = function(callback, setId, ids, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        set_id: setId,
        ids: ids,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/album/elements/position", {
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
              return _this.sortElement.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.getElementCommentsNear = function(callback, userName, lat_y, lon_x, optionData) {
      var data;
      data = {
        user: userName,
        lat: lat_y,
        lon: lon_x
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("http://emma.pixnet.cc/album/elements/nearby", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixAlbum.prototype.getSetComments = function(callback, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("http://emma.pixnet.cc/album/set_comments", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixAlbum.prototype.getSetComment = function(callback, id, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("http://emma.pixnet.cc/album/set_comments/" + id, pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixAlbum.prototype.createSetComment = function(callback, setId, userName, body, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        set_id: setId,
        user: userName,
        body: body,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/album/set_comments", {
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
              return _this.createSetComments.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.markSetCommentSpam = function(callback, id, optionData) {
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
      pixnet._post("https://emma.pixnet.cc/album/set_comments/" + id + "/mark_spam", {
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

    PixAlbum.prototype.markSetCommentHam = function(callback, id, optionData) {
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
      pixnet._post("https://emma.pixnet.cc/album/set_comments/" + id + "/mark_ham", {
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

    PixAlbum.prototype.deleteSetComment = function(callback, id, optionData) {
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
      pixnet._delete("https://emma.pixnet.cc/album/set_comments/" + id, {
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
              return _this.deleteSetComment.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.getComments = function(callback, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("http://emma.pixnet.cc/album/comments", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixAlbum.prototype.getComment = function(callback, id, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("http://emma.pixnet.cc/album/comments/" + id, pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixAlbum.prototype.createElementComment = function(callback, elementId, userName, body, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        element_id: elementId,
        user: userName,
        body: body,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/album/comments", {
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
              return _this.createElementComments.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.markElementCommentSpam = function(callback, commentId, optionData) {
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
      pixnet._post("https://emma.pixnet.cc/album/comments/" + commentId + "/mark_spam", {
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
              return _this.markElementCommentSpam.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.markElementCommentHam = function(callback, commentId, optionData) {
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
      pixnet._post("https://emma.pixnet.cc/album/comments/" + commentId + "/mark_ham", {
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
              return _this.markElementCommentSpam.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.deleteElementComment = function(callback, commentId, optionData) {
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
      pixnet._delete("https://emma.pixnet.cc/album/comments/" + commentId, {
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
              return _this.deleteElementComment.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.createFace = function(callback, userName, elementId, posX, posY, width, height, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        user: userName,
        element_id: elementId,
        x: posX,
        y: posY,
        w: width,
        h: height,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/album/faces", {
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
              return _this.createFace.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.updateFace = function(callback, faceId, userName, elementId, posX, posY, width, height, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        user: userName,
        element_id: elementId,
        x: posX,
        y: posY,
        w: width,
        h: height,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/album/faces/" + faceId, {
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
              return _this.updateFace.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.deleteFace = function(callback, faceId, optionData) {
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
      pixnet._delete("https://emma.pixnet.cc/album/faces/" + faceId, {
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
              return _this.deleteFace.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.getConfig = function(callback, optionData) {
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
      pixnet._get("https://emma.pixnet.cc/album/config", {
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
              return _this.getConfig.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixAlbum.prototype.getSiteCategories = function(callback, optionData) {
      var data;
      data = {};
      data = pixnet._extends(data, optionData);
      pixnet._get("http://emma.pixnet.cc/album/site_categories", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    return PixAlbum;

  })();

  pixnet.album = new PixAlbum();

}).call(this);

(function() {
  var PixBlock;

  PixBlock = (function() {
    function PixBlock() {}

    PixBlock.prototype.getBlock = function(callback, optionData) {
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
      pixnet._get('https://emma.pixnet.cc/blocks', {
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
              return _this.getBlock.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixBlock.prototype.createBlock = function(callback, userName, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        user: userName,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post('https://emma.pixnet.cc/blocks/create', {
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
              return _this.createBlock.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixBlock.prototype.deleteBlock = function(callback, userName, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        user: userName,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._delete('https://emma.pixnet.cc/blocks/delete', {
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
              return _this.deleteBlock.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    return PixBlock;

  })();

  pixnet.block = new PixBlock();

}).call(this);

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

(function() {
  var PixFriend;

  PixFriend = (function() {
    function PixFriend() {}

    PixFriend.prototype.getGroups = function(callback, optionData) {
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
      pixnet._get('https://emma.pixnet.cc/friend/groups', {
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
              return _this.getGroups.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixFriend.prototype.createGroup = function(callback, name, optionData) {
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
      pixnet._post('https://emma.pixnet.cc/friend/groups', {
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
              return _this.createGroup.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixFriend.prototype.updateGroup = function(callback, id, name, optionData) {
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
      pixnet._post("https://emma.pixnet.cc/friend/groups/" + id, {
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
              return _this.updateGroup.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixFriend.prototype.deleteGroup = function(callback, id, optionData) {
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
      pixnet._delete("https://emma.pixnet.cc/friend/groups/" + id, {
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
              return _this.deleteGroup.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixFriend.prototype.getNews = function(callback, optionData) {
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
      pixnet._get('https://emma.pixnet.cc/friend/news', {
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
              return _this.getNews.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixFriend.prototype.getSubscriptions = function(callback, optionData) {
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
      pixnet._get('https://emma.pixnet.cc/friend/subscriptions', {
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
              return _this.getSubscriptions.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixFriend.prototype.createSubscription = function(callback, userName, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        user: userName,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post('https://emma.pixnet.cc/friend/subscriptions', {
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
              return _this.createSubscription.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixFriend.prototype.joinSubscriptionGroup = function(callback, userName, groupIds, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      if (pixnet.isArray(groupIds)) {
        groupIds = groupIds.toString();
      }
      data = {
        group_ids: groupIds,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/friend/subscriptions/" + userName + "/join_subscription_group", {
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
              return _this.joinSubscriptionGroup.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixFriend.prototype.leaveSubscriptionGroup = function(callback, userName, groupIds, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        group_ids: groupIds,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/friend/subscriptions/" + userName + "/leave_subscription_group", {
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
              return _this.leaveSubscriptionGroup.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixFriend.prototype.deleteSubscription = function(callback, userName, optionData) {
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
      pixnet._delete("https://emma.pixnet.cc/friend/subscriptions/" + userName, {
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
              return _this.leaveSubscriptionGroup.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixFriend.prototype.getSubscriptionGroup = function(callback, optionData) {
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
      pixnet._get('https://emma.pixnet.cc/friend/subscription_groups', {
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
              return _this.getSubscriptionGroup.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixFriend.prototype.createSubscriptionGroup = function(callback, name, optionData) {
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
      pixnet._post('https://emma.pixnet.cc/friend/subscription_groups', {
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
              return _this.createSubscriptionGroup.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixFriend.prototype.updateSubscriptionGroup = function(callback, id, name, optionData) {
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
      pixnet._post("https://emma.pixnet.cc/friend/subscription_groups/" + id, {
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
              return _this.updateSubscriptionGroup.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixFriend.prototype.deleteSubscriptionGroup = function(callback, id, optionData) {
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
      pixnet._delete("https://emma.pixnet.cc/friend/subscription_groups/" + id, {
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
              return _this.deleteSubscriptionGroup.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixFriend.prototype.sortSubscriptionGroupTo = function(callback, ids, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        ids: ids,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/friend/subscription_groups/position", {
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
              return _this.sortSubscriptionGroupTo.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixFriend.prototype.getFriendships = function(callback, optionData) {
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
      pixnet._get('https://emma.pixnet.cc/friendships', {
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
              return _this.getFriendships.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixFriend.prototype.createFriendship = function(callback, userName, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        user_name: userName,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post('https://emma.pixnet.cc/friendships', {
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
              return _this.createFriendship.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixFriend.prototype.deleteFriendship = function(callback, userName, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        user_name: userName,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._delete('https://emma.pixnet.cc/friendships/delete', {
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
              return _this.deleteFriendship.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixFriend.prototype.appendFriendshipGroup = function(callback, userName, groupId, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        user_name: userName,
        group_id: groupId,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post('https://emma.pixnet.cc/friendships/append_group', {
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
              return _this.appendFriendshipGroup.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixFriend.prototype.removeFriendshipGroup = function(callback, userName, groupId, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        user_name: userName,
        group_id: groupId,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post('https://emma.pixnet.cc/friendships/remove_group', {
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
              return _this.removeFriendshipGroup.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    return PixFriend;

  })();

  pixnet.friend = new PixFriend();

}).call(this);

(function() {
  var PixGuestbook;

  PixGuestbook = (function() {
    function PixGuestbook() {}

    PixGuestbook.prototype.getAll = function(callback, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/guestbook", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixGuestbook.prototype.create = function(callback, title, body, userName, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        title: title,
        body: body,
        user: userName,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/guestbook", {
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
              return _this.createGuestbook.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixGuestbook.prototype.getOne = function(callback, id, userName, optionData) {
      var data;
      data = {
        user: userName
      };
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/guestbook/" + id, pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixGuestbook.prototype.reply = function(callback, id, body, optionData) {
      var args, data;
      if (!pixnet.isLogin) {
        pixnet._error('Need login');
        return this;
      }
      data = {
        reply: body,
        access_token: pixnet.getData('accessToken')
      };
      data = pixnet._extends(data, optionData);
      args = arguments;
      pixnet._post("https://emma.pixnet.cc/guestbook/" + id + "/reply", {
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
              return _this.replyGuestbook.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixGuestbook.prototype.setOpen = function(callback, id, optionData) {
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
      pixnet._post("https://emma.pixnet.cc/guestbook/" + id + "/open", {
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
              return _this.setOpen.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixGuestbook.prototype.setClose = function(callback, id, optionData) {
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
      pixnet._post("https://emma.pixnet.cc/guestbook/" + id + "/close", {
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
              return _this.setClose.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixGuestbook.prototype.markSpam = function(callback, id, optionData) {
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
      pixnet._post("https://emma.pixnet.cc/guestbook/" + id + "/mark_spam", {
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
              return _this.setClose.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixGuestbook.prototype.markHam = function(callback, id, optionData) {
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
      pixnet._post("https://emma.pixnet.cc/guestbook/" + id + "/mark_ham", {
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
              return _this.setClose.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixGuestbook.prototype["delete"] = function(callback, id, optionData) {
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
      pixnet._delete("https://emma.pixnet.cc/guestbook/" + id, {
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
              return _this.setClose.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    return PixGuestbook;

  })();

  pixnet.guestbook = new PixGuestbook();

}).call(this);

(function() {
  var PixIndex;

  PixIndex = (function() {
    function PixIndex() {}

    PixIndex.prototype.rate = function(callback, optionData) {
      var data;
      data = {};
      if (pixnet.isLogin) {
        data = {
          access_token: pixnet.getData('accessToken')
        };
      }
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/index/rate", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    PixIndex.prototype.now = function(callback, optionData) {
      var data;
      data = {};
      if (pixnet.isLogin) {
        data = {
          access_token: pixnet.getData('accessToken')
        };
      }
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/index/now", pixnet._defaultXHROptions(data, callback));
      return this;
    };

    return PixIndex;

  })();

  pixnet.index = new PixIndex();

}).call(this);

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

    return PixMainpage;

  })();

  pixnet.mainpage = new PixMainpage();

}).call(this);

(function() {
  var PixUsers;

  PixUsers = (function() {
    function PixUsers() {}

    PixUsers.prototype.getAccount = function(callback, optionData) {
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
      pixnet._get('https://emma.pixnet.cc/account', {
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
              return _this.getAccount.apply(_this, args);
            }, data, args);
          };
        })(this)
      });
      return this;
    };

    PixUsers.prototype.getUser = function(callback, userName, optionData) {
      var data;
      data = {};
      data = pixnet._extends(data, optionData);
      pixnet._get("https://emma.pixnet.cc/users/" + userName, pixnet._defaultXHROptions(data, callback));
      return this;
    };

    return PixUsers;

  })();

  pixnet.users = new PixUsers();

}).call(this);
