// Generated by CoffeeScript 1.7.1

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
      if (!opts.data['format']) {
        opts.data['format'] = 'json';
      }
      return this._ajax(opts);
    };

    NoJquery.prototype._delete = function(url, opts) {
      opts.type = 'POST';
      opts.url = url;
      opts.data = opts.data || {};
      opts.data['_method'] = 'delete';
      if (!opts.data['format']) {
        opts.data['format'] = 'json';
      }
      return this._ajax(opts);
    };

    NoJquery.prototype._post = function(url, opts) {
      opts.type = 'POST';
      opts.url = url;
      opts.data = opts.data || {};
      if (!opts.data['format']) {
        opts.data['format'] = 'json';
      }
      return this._ajax(opts);
    };

    NoJquery.prototype._upload = function(url, opts) {
      opts.type = 'UPLOAD';
      opts.url = url;
      opts.data = opts.data || {};
      if (!opts.data['format']) {
        opts.data['format'] = 'json';
      }
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
      this.postAuthApiFunc = __bind(this.postAuthApiFunc, this);
      this.getAuthApiFunc = __bind(this.getAuthApiFunc, this);
      this.authApiFunc = __bind(this.authApiFunc, this);
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

    Pixnet.prototype.authApiFunc = function(method, mainThis, mainFunc, args, options) {
      var apiMethodFunc, callback, data, mainUri, optionData;
      switch (method) {
        case 'get':
          apiMethodFunc = this._get;
          break;
        case 'post':
          apiMethodFunc = this._post;
          break;
        default:
          return that;
      }
      callback = options.callback;
      optionData = options.optionData || {};
      mainUri = options.mainUri;
      if (!pixnet.isLogin) {
        this._error('Need login');
        return mainThis;
      }
      data = {
        access_token: this.getData('accessToken')
      };
      data = this._extends(data, optionData);
      apiMethodFunc.call(this, "https://emma.pixnet.cc/" + mainUri, {
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
              return mainFunc.apply(mainThis, args);
            }, data, args);
          };
        })(this)
      });
      return mainThis;
    };

    Pixnet.prototype.getAuthApiFunc = function(mainThis, mainFunc, args, options) {
      return this.authApiFunc('get', mainThis, mainFunc, args, options);
    };

    Pixnet.prototype.postAuthApiFunc = function(mainThis, mainFunc, args, options) {
      return this.authApiFunc('post', mainThis, mainFunc, args, options);
    };

    return Pixnet;

  })(Container);

  window.pixnet = new Pixnet();

}).call(this);
