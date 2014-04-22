class PixUsers
  getMyAccount: (opts)->
    if pixnet.isLogin
      done = opts.done || ()->
      data = pixnet.getData()
      pixnet._get('https://emma.pixnet.cc/account', {
        data:
          access_token: data.app.accessToken
        done: (data)=>
          done(JSON.parse(data))
      })
    else
      @_log('Need login');

pixnet.users = new PixUsers()