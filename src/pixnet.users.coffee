class PixUsers
  getAccount: (callback, optionData)->
    options = {
      'callback': callback
      'optionData': optionData
      'mainUri': 'account'
    }
    pixnet.getAuthApiFunc(@, @getAccount, arguments, options)
    return @

  updateAccount: (callback, password = '', optionData) ->
    data = {
      password: password
    }
    data = pixnet._extends(data, optionData)
    options = {
      'callback': callback
      'optionData': data
      'mainUri': 'account/info'
    }
    pixnet.postAuthApiFunc(@, @updateAccount, arguments, options)
    return @

  updatePassword: (callback, pwd, newPwd, optionData) ->
    if not pwd or not newPwd
      pixnet._error 'need password arguments'
      return @
    data = {
        password: pwd
        new_password: newPwd
    }
    data = pixnet._extends(data, optionData)
    options = {
      'callback': callback
      'optionData': data
      'mainUri': 'account/password'
    }
    pixnet.postAuthApiFunc(@, @updatePassword, arguments, options)
    return @

  getUser: (callback, userName, optionData)->
    data = {}
    data = pixnet._extends(data, optionData)
    pixnet._get "https://emma.pixnet.cc/users/#{userName}", pixnet._defaultXHROptions(data, callback)
    return @

  getAnalyticsData: (callback, optionData) ->
    options = {
      'callback': callback
      'optionData': optionData
      'mainUri': 'account/analytics'
    }
    pixnet.getAuthApiFunc(@, @getAnalyticsData, arguments, options)
    return @

  getNotifications: (callback, optionData) ->
    options = {
      'callback': callback
      'optionData': optionData
      'mainUri': 'account/notifications'
    }
    pixnet.getAuthApiFunc(@, @getNotifications, arguments, options)
    return @

  ## MIB Method

  getMIBAccount: (callback, optionData) ->
    options = {
      'callback': callback
      'optionData': optionData
      'mainUri': 'account/mib'
    }
    pixnet.getAuthApiFunc(@, @getMIBAccount, arguments, options)
    return @

  getMIBPositionData: (callback, id, optionData) ->
    if id is undefined
      return pixnet._error 'Do not give position id';

    options = {
      'callback': callback
      'optionData': optionData
      'mainUri': "account/mib/positions/#{id}"
    }
    pixnet.getAuthApiFunc(@, @getMIBPositionData, arguments, options)
    return @

  updateMIBPositionData: (callback, id, optionData) ->
    if id is undefined
      return pixnet._error 'Do not give position id';

    data = {
      'fixedadbox': 1
      'enabled': 1
    }
    data = pixnet._extends(data, optionData)
    options = {
      'callback': callback
      'optionData': data
      'mainUri': "account/mib/positions/#{id}"
    }
    pixnet.postAuthApiFunc(@, @updateMIBPositionData, arguments, options)
    return @

  getMIBPay: (callback, optionData) ->
    options = {
      'callback': callback
      'optionData': optionData
      'mainUri': 'account/mibpay'
    }
    pixnet.getAuthApiFunc(@, @getMIBPay, arguments, options)
    return @

pixnet.users = new PixUsers()