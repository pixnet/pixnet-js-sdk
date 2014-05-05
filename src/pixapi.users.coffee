class PixUsers
  getAccount: (callback)->
    if pixnet.isLogin
      opts = pixnet._extends(pixnet._defaultRequestOption(), opts)
      data = pixnet.getData()
      pixnet._get('https://emma.pixnet.cc/account', {
        data:
          access_token: data.app.accessToken
        done: (data)=>
          callback(JSON.parse(data)) if callback
        fail: (data)=>
          pixnet.apiInvalidGrantFunc(()=>
            @getAccount(callback)
          , data)
      })
    else
      pixnet._error 'Need login'

  getUser: (callback, userid)->
    pixnet._get("https://emma.pixnet.cc/users/#{userid}", {
      done: (data)=>
        callback(JSON.parse(data)) if callback
      fail: (data)=>
        callback(JSON.parse(data)) if callback

    })

pixnet.users = new PixUsers()