class PixGuestbook
  getAll: (callback, userName, optionData)->
    data =
      user: userName
    data = pixnet._extends(data, optionData)
    pixnet._get "https://emma.pixnet.cc/guestbook", pixnet._defaultXHROptions(data, callback)
    return @

  create: (callback, userName, body, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      user: userName
      body: body
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post("https://emma.pixnet.cc/guestbook", {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @createGuestbook.apply(@, args)
        , data, args)
    })
    return @

  getOne: (callback, id, userName, optionData)->
    data =
      user: userName
    data = pixnet._extends(data, optionData)
    pixnet._get "https://emma.pixnet.cc/guestbook/#{id}", pixnet._defaultXHROptions(data, callback)
    return @

  reply: (callback, id, body, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      reply: body
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post("https://emma.pixnet.cc/guestbook/#{id}/reply", {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @replyGuestbook.apply(@, args)
        , data, args)
    })
    return @

  setOpen: (callback, id, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post("https://emma.pixnet.cc/guestbook/#{id}/open", {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @setOpen.apply(@, args)
        , data, args)
    })
    return @

  setClose: (callback, id, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post("https://emma.pixnet.cc/guestbook/#{id}/close", {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @setClose.apply(@, args)
        , data, args)
    })
    return @

  markSpam: (callback, id, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post("https://emma.pixnet.cc/guestbook/#{id}/mark_spam", {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @setClose.apply(@, args)
        , data, args)
    })
    return @

  markHam: (callback, id, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post("https://emma.pixnet.cc/guestbook/#{id}/mark_ham", {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @setClose.apply(@, args)
        , data, args)
    })
    return @

  delete: (callback, id, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._delete("https://emma.pixnet.cc/guestbook/#{id}", {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @setClose.apply(@, args)
        , data, args)
    })
    return @

pixnet.guestbook = new PixGuestbook()