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
    args = arguments
    pixnet._post('https://emma.pixnet.cc/account/info', {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @updateAccount.apply(@, args)
        , data, args)
    })
    return @

  updatePassword: (callback, pwd, newPwd, optionData) ->
    if not pwd or not newPwd
      pixnet._error 'need password arguments'
      return @
    else if not pixnet.isLogin
      pixnet._error 'Need login'
      return @
    data = {
      password: pwd
      new_password: newPwd
      access_token : pixnet.getData('accessToken')
    }
    args = arguments
    pixnet._post('https://emma.pixnet.cc/account/password', {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @updatePassword.apply(@, args)
        , data, args)
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
    args = arguments
    pixnet._get('https://emma.pixnet.cc/account/analytics', {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @getAnalyticsData.apply(@, args)
        , data, args)
    })
    return @

  getNotifications: (callback, optionData) ->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data = {
        access_token : pixnet.getData('accessToken')
    }
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._get('https://emma.pixnet.cc/account/notifications', {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @getNotifications.apply(@, args)
        , data, args)
    })
    return @


pixnet.users = new PixUsers()