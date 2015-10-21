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

  makeNotificationRead: (callback, id, optionData) ->
    options = {
      'callback': callback
      'optionData': optionData
      'mainUri': "account/notifications/#{id}/read"
    }
    pixnet.postAuthApiFunc(@, @makeNotificationRead, arguments, options)
    return @

  ## MIB Method

  createMIBAccount: (callback, needData, optionData) ->
    # make sure required fields are exist
    if not needData or
       not needData.id_number or
       not needData.email or
       not needData.cellphone or
       not needData.mail_address or
       not needData.domicile or
       needData.enable_video_ad is undefined or
       not needData.name or
       not needData.id_image_front or
       not needData.id_image_back
        return pixnet._error 'Do not give needed data';

    needData = pixnet._extends(needData, optionData)

    # 拿掉 base64 defined string
    if needData.upload_method is "base64"
      frontLen = needData.id_image_front.length
      backLen = needData.id_image_back.length
      frontIndex = needData.id_image_front.indexOf(';base64,')
      backIndex = needData.id_image_back.indexOf(';base64,')
      if frontIndex > 0
        needData.id_image_front = needData.id_image_front.substring(frontIndex + 8, frontLen)
      if backIndex > 0
        needData.id_image_back = needData.id_image_back.substring(backIndex + 8, backLen)

    options = {
      'callback': callback
      'optionData': needData
      'mainUri': 'account/mib'
    }
    pixnet.postAuthApiFunc(@, @createMIBAccount, arguments, options)
    return @

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

  updateMIBPositionData: (callback, id, fixedadbox, enabled, optionData) ->
    if id is undefined or (fixedadbox is undefined and enabled is undefined)
      return pixnet._error 'Do not give need params';

    data = {}
    # make sure fixedadbox and enabled have one exist in params
    if (0 is fixedadbox or 1 is fixedadbox)
      data.fixedadbox = fixedadbox;
    if (0 is enabled or 1 is enabled)
      data.enabled = enabled;
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