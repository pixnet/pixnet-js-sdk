# =================== common functions ======================
###
自幹工具區
###
class NoJquery
  _hasProp: {}.hasOwnProperty
  _extends: (child, parent)->
    parent = {} if not parent
    for own key of parent
      child[key] = parent[key]
    child

  _defaultXHROptions: (data, callback)->
    return {
    data: data
    done: (data)=>
      callback(JSON.parse(data)) if callback
    fail: (data)=>
      callback(JSON.parse(data)) if callback
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
    dataType: 'text'
    charset: 'UTF-8'
    enctype: 'application/x-www-form-urlencoded'

  _get: (url, opts)=>
    opts.type = 'GET'
    opts.url = url
    opts.data = opts.data || {}
    return @_ajax(opts)

  _delete: (url, opts)=>
    opts.type = 'POST'
    opts.url = url
    opts.data = opts.data || {}
    opts.data['_method'] = 'delete'
    return @_ajax(opts)

  _post: (url, opts)=>
    opts.type = 'POST'
    opts.url = url
    opts.data = opts.data || {}
    return @_ajax(opts)

  _upload: (url, opts)=>
    @
#    opts.type = 'POST'
#    opts.url = url
#    opts.data = opts.data || {}
#    return @_ajax(opts)

  _ajax: (opts)=>
    opts = @_extends(@_ajaxOpts, opts)
    if window.XMLHttpRequest
      # code for IE7+, Firefox, Chrome, Opera, Safari
      request = new XMLHttpRequest()
    else
      # code for IE6, IE5
      request = new ActiveXObject("Microsoft.XMLHTTP")

    switch opts.type
      when 'GET', 'DELETE'
        opts.url += @_serialize(opts.data)
        params = ""

      when 'POST', 'PUT'
        params =  @_serialize(opts.data).substr(1)

      when 'UPLOAD'
#        iframe = document.createElement("IFRAME")
#        iframe.setAttribute("action", opts.url)
#        iframe.setAttribute("method", opts.type)
#
#        iframe.style.display = "none"
#        for own key, val of opts.data
#          input = document.createElement("INPUT")
#          input.setAttribute("type", "hidden")
#          input.setAttribute("name", key)
#          input.setAttribute("value", val)
#          iframe.appendChild(input)
#
#        document.body.appendChild(iframe)

      else
        params = ""


    done = opts.done || opts.success || ()->
    fail = opts.fail || opts.error   || ()->

    request.open(opts.type, opts.url, true)
    request.setRequestHeader('Content-Type', "#{opts.enctype}; charset=#{opts.charset}")

    request.onload = ->
      if request.status >= 200 && request.status < 400
        resp = request.responseText
        resp = JSON.parse(resp) if opts.dataType is 'json'
        done(resp) if typeof done is 'function'
      else
        resp = request.responseText
        fail(resp) if typeof fail is 'function'

    request.send(params)
    return request
###
訊息回報區
###
class PixConsole
  _procStop: false
  _log: (msg)->
    console.log("Pixnet Log: ", msg)
  _error: (msg, isStop)->
    console.error("Pixnet Error: ", msg)
    @_procStop = !isStop

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

  isLogin: =>
    return @data.app.isLogin

  getData: (field)=>
    if field
      return @data.app[field]
    else
      return @data.app

  setSceret: (sceret)=>
    @data.app.consumerSecret = sceret
    return @

  setKey: (key)=>
    @data.app.consumerKey = key
    return @

  setTokens: (accessToken, refreshToken)=>
    @data.app.accessToken  = accessToken
    @data.app.refreshToken = refreshToken
    localStorage["accessToken"]  = accessToken
    localStorage["refreshToken"] = refreshToken

    return @

  setCode: (code)=>
    @data.app.code = code
    localStorage["code"] = code
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
    if localStorage["refreshToken"]
      @setCode(localStorage["code"])
      @setTokens(localStorage["accessToken"], localStorage["refreshToken"])
      @data.app.isLogin = true

      @refreshToken.call(@, callback, @data.app) if callback

    else
      opts = @_extends(@data.app.loginOpts, opts)
      callbackUrl = opts.callbackUrl || @data.app.callbackUrl
      consumerKey = @data.app.consumerKey
      # 驗證是否有寫入所需資訊
      @_error('callbackUrl is not defined') if not callbackUrl
      @_error('consumerKey is not defined') if not consumerKey

      # 取得 code 的時候
      if @_getUrlPara('code') and opts.type isnt 'custom'
        @setCode(@_getUrlPara('code'))

        # 如果有 callback 就呼叫
        if opts.onGetCode
          opts.onGetCode.call(@, @data.app)

        @requestTokens(callback, @data.app) # 直接執行取得 Token 的動作

      # 還沒取得 code ，正要去取的時候
      else
        url = "https://emma.pixnet.cc/oauth2/authorize?redirect_uri=#{callbackUrl}&client_id=#{consumerKey}&response_type=code"
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
      done: (data)=>
        response = JSON.parse(data)
        @setTokens(response.access_token, response.refresh_token)
        @data.app.isLogin = true
        callback.call(@, response) if callback
      fail: (data)=>
        response = JSON.parse(data)
        @_error(response)
        if response.error is 'invalid_grant'
          @setCode('')
          @_error response
        callback.call(@, response) if callback
    })

  refreshToken: (callback, opts)=>
    data = @_extends(@data.app, {})
    @_error('consumerSecret is not defined') if not data.consumerSecret

    @_get('https://emma.pixnet.cc/oauth2/grant', {
      data:
        refresh_token: data.refreshToken
        client_id:     data.consumerKey
        client_secret: data.consumerSecret
        grant_type:    "refresh_token"
      done: (data)=>
        response = JSON.parse(data)
        @setTokens(response.access_token, response.refresh_token)
        callback.call(@, response) if callback
      fail: (data)=>
        response = JSON.parse(data)
        callback.call(@, response) if callback
    })

  apiInvalidGrantFunc: (callback, data)=>
    response = JSON.parse(data)
    if response.error is 'invalid_grant'
      @refreshToken(callback)


window.pixnet = new Pixnet()