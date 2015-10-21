# =================== common functions ======================
###
自幹工具區
###
class NoJquery
  _getDoc: (frame)->
    # IE8 cascading access check
    try
      if frame.contentWindow
        doc = frame.contentWindow.document;
    catch err
      @_log('cannot get iframe.contentWindow document: ' + err)
    if doc  # successful getting content
      return doc
    try # // simply checking may throw in ie8 under ssl or mismatched protocol
      doc = if frame.contentDocument then frame.contentDocument else frame.document
    catch err
    # last attempt
      @_log('cannot get iframe.contentDocument: ' + err)
      doc = frame.document
    return doc

  _hasProp: {}.hasOwnProperty

  _extends: (child, parent)->
    parent = {} if not parent
    for own key of parent
      if typeof parent[key] is 'object'
        child[key] = @_extends({}, parent[key])
      else
        child[key] = parent[key]
    child

  _defaultXHROptions: (data, callback)->
    return {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        callback(data) if callback
    }

  _serialize: (data)=>
    dataString = ''
    if typeof data is 'object'
      for own key, val of data
        if dataString is ''
          dataString += "?#{key}=#{val}"
        else
          dataString += "&#{key}=#{val}"

    return dataString

  _getUrlPara: (name)=>
    url = window.location.search

    if -1 isnt url.indexOf("?")
      params = url.split("?")[1].split("&");
      for item in params
        para = item.split("=")
        if para[0] is name
          return para[1]
        else
          return undefined
    else
      return undefined

  _ajaxOpts:
    type: 'GET'
    url: ''
    data: {}
    dataType: 'json'
    charset: 'UTF-8'
    enctype: 'application/x-www-form-urlencoded'

  _get: (url, opts)=>
    if opts.data.access_token and not url.match(/^https/)
      url = url.replace(/^http\:\/\//, "https://")
    opts.type = 'GET'
    opts.url = url
    opts.data = opts.data || {}
    opts.data['format'] = 'json' if not opts.data['format']
    return @_ajax(opts)

  _delete: (url, opts)=>
    opts.type = 'POST'
    opts.url = url
    opts.data = opts.data || {}
    opts.data['_method'] = 'delete'
    opts.data['format'] = 'json' if not opts.data['format']
    return @_ajax(opts)

  _post: (url, opts)=>
    opts.type = 'POST'
    opts.url = url
    opts.data = opts.data || {}
    opts.data['format'] = 'json' if not opts.data['format']
    return @_ajax(opts)

  _upload: (url, opts)=>
    opts.type = 'UPLOAD'
    opts.url = url
    opts.data = opts.data || {}
    opts.data['format'] = 'json' if not opts.data['format']
    return @_ajax(opts)

  _ajax: (opts)=>
    opts = @_extends(@_ajaxOpts, opts)

    if opts.data.pretty_print in [1, "1"]
      dataType = "text"
    else
      dataType = opts.dataType

    if window.XMLHttpRequest
      # code for IE7+, Firefox, Chrome, Opera, Safari
      request = new XMLHttpRequest()
    else
      # code for IE6, IE5
      request = new ActiveXObject("Microsoft.XMLHTTP")

    contenType = "#{opts.enctype}; charset=#{opts.charset}"

    switch opts.type
      when 'GET', 'DELETE'
        opts.url += @_serialize(opts.data)
        params = ""

      when 'POST', 'PUT'
        params =  @_serialize(opts.data).substr(1)

      when 'UPLOAD'
        opts.type = 'POST'
        params = new FormData()
        for own key, val of opts.data
          params.append key, val
        contenType = null
      else
        params = ""

    done = opts.done || opts.success || ()->
    fail = opts.fail || opts.error   || ()->

    request.open(opts.type, opts.url)
    request.setRequestHeader('Content-Type', contenType) if contenType

    request.onload = ->
      if request.status >= 200 && request.status < 400
        resp = request.responseText
        resp = JSON.parse(resp) if dataType is 'json'
        done(resp) if typeof done is 'function'
      else
        resp = request.responseText
        fail(resp) if typeof fail is 'function'

    request.send params
    return request
###
訊息回報區
###
class PixConsole
  _procStop: false
  _log: (msg)->
    console.log("Pixnet Log: ", msg)
  _error: (msg, keepGoing)->
    console.error("Pixnet Error: ", msg)
    @_procStop = !keepGoing

###
緩衝繼承區
###
moduleKeywords = ['included', 'extended']
class SuperClass
  @include: (obj) ->
    throw('include(obj) requires obj') unless obj
    for key, value of obj.prototype when key not in moduleKeywords
      @::[key] = value

    included = obj.included
    included.apply(this) if included
    @

class Container extends SuperClass
  @include(PixConsole)
  @include(NoJquery)

# =================== common functions ======================
###
Core
###
class Pixnet extends Container
  data:
    app:
      code: ''
      consumerKey: ''
      consumerSecret: ''
      callbackUrl: ''
      accessToken: ''
      refreshToken: ''
      isLogin: false
      loginOpts:
        type: 'onepage' # onepage, popwin, custom
        popwin: undefined

  isArray: (arr)->
    return if "[object Array]" is Object.prototype.toString.call(arr) then true else false
  isLogin: =>
    return @data.app.isLogin

  getData: (field)=>
    if field
      return @data.app[field]
    else
      return @data.app

  setSecret: (secret)=>
    @data.app.consumerSecret = secret
    return @

  setKey: (key)=>
    @data.app.consumerKey = key
    return @

  setTokens: (accessToken, refreshToken)=>
    @data.app.accessToken  = accessToken
    @data.app.refreshToken = refreshToken
    localStorage["#{@data.app.consumerKey}accessToken"]  = accessToken
    localStorage["#{@data.app.consumerKey}refreshToken"] = refreshToken

    return @

  setCode: (code)=>
    @data.app.code = code
    return @

  init: (options)->
    keyChecker = (key)->
      return !!(key?.match(/[a-z0-9]{32}/) and key.length is 32)
    @data.app.consumerKey    = options.consumerKey    if options.consumerKey
    @data.app.consumerSecret = options.consumerSecret if options.consumerSecret
    @data.app.callbackUrl    = options.callbackUrl    if options.callbackUrl

    @_error('consumerKey format is wrong')    if not keyChecker(@data.app.consumerKey)
    @_error('consumerSecret format is wrong') if not keyChecker(@data.app.consumerSecret)
    return if @_procStop

    @login(options.loginCallback, @data.app.loginOpts) if options.login is true
    return @

  login: (callback, opts)=>
    opts = opts || {}
    # 之前已經有授權過，並存在 localStorage
    if localStorage["#{@data.app.consumerKey}accessToken"]
      @setCode(localStorage["#{@data.app.consumerKey}code"])
      @setTokens(localStorage["#{@data.app.consumerKey}accessToken"], localStorage["#{@data.app.consumerKey}refreshToken"])
      @data.app.isLogin = true
      callback.call(@, @data.app) if callback

    else
      opts = @_extends(@data.app.loginOpts, opts)
      callbackUrl = opts.callbackUrl || @data.app.callbackUrl
      consumerKey = @data.app.consumerKey
      # 驗證是否有寫入所需資訊
      @_error('callbackUrl is not defined') if not callbackUrl
      @_error('consumerKey is not defined') if not consumerKey
      return if @_procStop

      # 取得 code 的時候
      if @_getUrlPara('code') and opts.type isnt 'custom'
        @setCode(@_getUrlPara('code'))

        # 如果有 callback 就呼叫
        if opts.onGetCode
          opts.onGetCode.call(@, @data.app)

        @requestTokens(callback, @data.app) # 直接執行取得 Token 的動作

      # 還沒取得 code ，正要去取的時候
      else
        url = @getAuthorizeUrl(callbackUrl, consumerKey)
        switch opts.type
        # 使用者自定函數去取得授權 code
          when 'custom'
            @_error('You must set a custom function for getting code from oauth2') if not opts.custom
            opts.custom.apply(@, arguments)

        # 使用跳出視窗
          when 'popwin'
            @data.app.loginOpts.popwin = window.open(url, 'getCodeWindow')

        # 預設單一頁面換頁
          else

            location.href = url
    return @

  getAuthorizeUrl: (callbackUrl, consumerKey)=>
    return "https://emma.pixnet.cc/oauth2/authorize?redirect_uri=#{callbackUrl}&client_id=#{consumerKey}&response_type=code"

  logout: (callback)=>
    @setCode('')
    @setTokens('', '')
    @data.app.isLogin = false
    callback() if callback
    return @

  requestTokens: (callback, data)=>
    data = @_extends(@data.app, data)
    @_error('consumerSecret is not defined') if not data.consumerSecret

    @_get('https://emma.pixnet.cc/oauth2/grant', {
      data:
        redirect_uri:  data.callbackUrl
        client_id:     data.consumerKey
        client_secret: data.consumerSecret
        code:          data.code
        grant_type:    "authorization_code"
      done: (response)=>
        @setTokens(response.access_token, response.refresh_token)
        @data.app.isLogin = true
        callback.call(@, response) if callback
      fail: (rep)=>
        if data and typeof rep is "string"
          response = JSON.parse(rep)
        else
          response = rep

        if response.error is 'invalid_grant'
          @refreshToken(callback)
        else
          callback.call(@, response) if callback
    })

  refreshToken: (callback, opts)=>
    data = @_extends(@data.app, {})
    @_error('refreshToken is not defined')   if not data.refreshToken
    @_error('consumerKey is not defined')    if not data.consumerKey
    @_error('consumerSecret is not defined') if not data.consumerSecret
    return if @_procStop

    @_get('https://emma.pixnet.cc/oauth2/grant', {
      data:
        refresh_token: data.refreshToken
        client_id:     data.consumerKey
        client_secret: data.consumerSecret
        grant_type:    "refresh_token"
      done: (response)=>
        @setTokens(response.access_token, response.refresh_token)
        @data.app.isLogin = true
        callback.call(@, response) if callback

      fail: (rep)=>
        if data and typeof rep is "string"
          response = JSON.parse(rep)
        else
          response = rep

        if response.error is 'invalid_grant'
          @setCode('')
          opts = @_extends(data, {
            type: 'custom'
            custom: =>
              location.href = @getAuthorizeUrl(data.callbackUrl, data.consumerKey)
          })
          @login(callback, opts)
        else
          callback.call(@, response) if callback
    })

  apiInvalidGrantFunc: (callback, data, args)=>
    if data and typeof data is "string"
      response = JSON.parse(data)
    else
      response = data

    if response.error is 'invalid_grant'
      @refreshToken(callback)
    else
      args[0].call(@, response)
      @_error(response.message)

  authApiFunc: (method, mainThis, mainFunc, args, options) =>
    switch method
      when 'get' then apiMethodFunc = @_get
      when 'post' then apiMethodFunc = @_post
      else return that

    callback = options.callback
    optionData = options.optionData || {}
    mainUri = options.mainUri

    if not pixnet.isLogin
      @._error 'Need login'
      return mainThis
    data = {
      access_token: @.getData('accessToken')
    }
    data = @._extends(data, optionData)
    apiMethodFunc.call(@, "https://emma.pixnet.cc/#{mainUri}", {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(() =>
          mainFunc.apply(mainThis, args)
        , data, args)
    })
    return mainThis

  getAuthApiFunc: (mainThis, mainFunc, args, options) =>
    @.authApiFunc('get', mainThis, mainFunc, args, options)

  postAuthApiFunc: (mainThis, mainFunc, args, options) =>
    @.authApiFunc('post', mainThis, mainFunc, args, options)

window.pixnet = new Pixnet()