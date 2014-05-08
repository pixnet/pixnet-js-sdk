class PixIndex
  rate: (callback, optionData)->
    data = {}
    if pixnet.isLogin
      data =
        access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    pixnet._get "https://emma.pixnet.cc/index/rate", pixnet._defaultXHROptions(data, callback)
    return @

  now: (callback, optionData)->
    data = {}
    if pixnet.isLogin
      data =
        access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    pixnet._get "https://emma.pixnet.cc/index/now", pixnet._defaultXHROptions(data, callback)
    return @

pixnet.index = new PixIndex()
