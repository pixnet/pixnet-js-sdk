class PixUsers
  getAccount: (callback, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._get('https://emma.pixnet.cc/account', {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @getAccount.apply(@, args)
        , data, args)
    })
    return @

  updateAccount: (callback, password = '', optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data = {
      password: password
      access_token: pixnet.getData('accessToken')
    }
    data = pixnet._extends(data, optionData)
    pixnet._post('https://emma.pixnet.cc/account/info', {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @updateAccount.apply(@, arguments)
        , data, arguments)
    })
    return @


  getUser: (callback, userName, optionData)->

    data = {}
    data = pixnet._extends(data, optionData)
    pixnet._get "https://emma.pixnet.cc/users/#{userName}", pixnet._defaultXHROptions(data, callback)
    return @

  getAnalyticsData: (callback, optionData) ->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data = {
      access_token : pixnet.getData('accessToken')
    }
    data = pixnet._extends(data, optionData)
    pixnet._get('https://emma.pixnet.cc/account/analytics', {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @getAnalyticsData.apply(@, arguments)
        , data, arguments)
    })
    return @

pixnet.users = new PixUsers()