class PixFriend
  getGroups: (callback, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._get('https://emma.pixnet.cc/friend/groups', {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @getGroups.apply(@, args)
        , data, args)
    })
    return @

  createGroup: (callback, name, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      name: name
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post('https://emma.pixnet.cc/friend/groups', {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @createGroup.apply(@, args)
        , data, args)
    })
    return @

  updateGroup: (callback, id, name, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      name: name
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post("https://emma.pixnet.cc/friend/groups/#{id}", {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @updateGroup.apply(@, args)
        , data, args)
    })
    return @

  deleteGroup: (callback, id, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._delete("https://emma.pixnet.cc/friend/groups/#{id}", {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @deleteGroup.apply(@, args)
        , data, args)
    })
    return @

  getNews: (callback, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._get('https://emma.pixnet.cc/friend/news', {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @getNews.apply(@, args)
        , data, args)
    })
    return @

  getSubscriptions: (callback, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._get('https://emma.pixnet.cc/friend/subscriptions', {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @getSubscriptions.apply(@, args)
        , data, args)
    })
    return @

  createSubscription: (callback, userName, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      user: userName
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post('https://emma.pixnet.cc/friend/subscriptions', {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @createSubscription.apply(@, args)
        , data, args)
    })
    return @

  joinSubscriptionGroup: (callback, userName, groupIds, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    if pixnet.isArray(groupIds)
      groupIds = groupIds.toString()

    data =
      group_ids: groupIds
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post("https://emma.pixnet.cc/friend/subscriptions/#{userName}/join_subscription_group", {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @joinSubscriptionGroup.apply(@, args)
        , data, args)
    })
    return @

  leaveSubscriptionGroup: (callback, userName, groupIds, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      group_ids: groupIds
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post("https://emma.pixnet.cc/friend/subscriptions/#{userName}/leave_subscription_group", {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @leaveSubscriptionGroup.apply(@, args)
        , data, args)
    })
    return @

  deleteSubscription: (callback, userName, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._delete("https://emma.pixnet.cc/friend/subscriptions/#{userName}", {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @leaveSubscriptionGroup.apply(@, args)
        , data, args)
    })
    return @

  getSubscriptionGroup: (callback, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._get('https://emma.pixnet.cc/friend/subscription_groups', {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @getSubscriptionGroup.apply(@, args)
        , data, args)
    })
    return @

  createSubscriptionGroup: (callback, name, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      name: name
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post('https://emma.pixnet.cc/friend/subscription_groups', {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @createSubscriptionGroup.apply(@, args)
        , data, args)
    })
    return @

  updateSubscriptionGroup: (callback, id, name, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      name: name
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post("https://emma.pixnet.cc/friend/subscription_groups/#{id}", {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @updateSubscriptionGroup.apply(@, args)
        , data, args)
    })
    return @

  deleteSubscriptionGroup: (callback, id, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      name: name
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._delete("https://emma.pixnet.cc/friend/subscription_groups/#{id}", {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @deleteSubscriptionGroup.apply(@, args)
        , data, args)
    })
    return @

  sortSubscriptionGroupTo: (callback, ids, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      ids: ids
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post("https://emma.pixnet.cc/friend/subscription_groups/position", {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @sortSubscriptionGroupTo.apply(@, args)
        , data, args)
    })
    return @

  getFriendships: (callback, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._get('https://emma.pixnet.cc/friendships', {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @getFriendships.apply(@, args)
        , data, args)
    })
    return @

  createFriendship: (callback, userName, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      user_name: userName
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post('https://emma.pixnet.cc/friendships', {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @createFriendship.apply(@, args)
        , data, args)
    })
    return @

  deleteFriendship: (callback, userName, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      user_name: userName
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._delete('https://emma.pixnet.cc/friendships/delete', {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @deleteFriendship.apply(@, args)
        , data, args)
    })
    return @

  appendFriendshipGroup: (callback, userName, groupId, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      user_name: userName
      group_id: groupId
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post('https://emma.pixnet.cc/friendships/append_group', {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @appendFriendshipGroup.apply(@, args)
        , data, args)
    })
    return @

  removeFriendshipGroup: (callback, userName, groupId, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      user_name: userName
      group_id: groupId
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post('https://emma.pixnet.cc/friendships/remove_group', {
      data: data
      done: (data)=>
        callback(data) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @removeFriendshipGroup.apply(@, args)
        , data, args)
    })
    return @

pixnet.friend = new PixFriend()