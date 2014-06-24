class PixBlog
  getInfo: (callback, userName, optionData)->

    data =
      user : userName

    data = pixnet._extends(data, optionData)
    pixnet._get 'https://emma.pixnet.cc/blog', pixnet._defaultXHROptions(data, callback)
    return @

  getCategories: (callback, userName, optionData)->

    data =
      user : userName

    data = pixnet._extends(data, optionData)
    pixnet._get 'https://emma.pixnet.cc/blog/categories', pixnet._defaultXHROptions(data, callback)
    return @

  createCategories: (callback, name, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      name         : name
      access_token : pixnet.getData('accessToken')

    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post('https://emma.pixnet.cc/blog/categories', {
      data: data
      done: (data)=>
        callback(JSON.parse(data)) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @createBlogCategories.apply(@, args)
        , data, args)
    })
    return @

  updateCategories: (callback, id, name, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      name: name
      access_token : pixnet.getData('accessToken')

    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post("https://emma.pixnet.cc/blog/categories/#{id}", {
      data: data
      done: (data)=>
        callback(JSON.parse(data)) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @updateCategories.apply(@, args)
        , data, args)
    })
    return @

  deleteCategories: (callback, id, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')

    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._delete("https://emma.pixnet.cc/blog/categories/#{id}", {
      data: data
      done: (data)=>
        callback(JSON.parse(data)) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @deleteBlogCategories.apply(@, args)
        , data, args)
    })
    return @

  sortCategoriesTo: (callback, ids, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    if typeof ids isnt 'string'
      ids = ids.toString()

    data =
      ids : ids
      access_token : pixnet.getData('accessToken')

    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post("https://emma.pixnet.cc/blog/categories/position", {
      data: data
      done: (data)=>
        callback(JSON.parse(data)) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @sortCategoriesTo.apply(@, args)
        , data, args)
    })
    return @

  getAllArticles: (callback, userName, optionData)->

    data =
      user : userName

    data = pixnet._extends(data, optionData)
    pixnet._get 'https://emma.pixnet.cc/blog/articles', pixnet._defaultXHROptions(data, callback)
    return @

  getArticle: (callback, id, userName, optionData)->

    data =
      user: userName

    data = pixnet._extends(data, optionData)

    pixnet._get "https://emma.pixnet.cc/blog/articles/#{id}", pixnet._defaultXHROptions(data, callback)
    return @

  getRelatedArticle: (callback, id, userName, optionData)->

    data =
      user: userName
    data = pixnet._extends(data, optionData)

    pixnet._get "https://emma.pixnet.cc/blog/articles/#{id}/related", pixnet._defaultXHROptions(data, callback)
    return @

  createArticle: (callback, title, body, optionData)->

    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      title        : title
      body         : body
      access_token : pixnet.getData('accessToken')

    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post('https://emma.pixnet.cc/blog/articles', {
      data: data
      done: (data)=>
        callback(JSON.parse(data)) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @createArticle.apply(@, args)
        , data, args)
    })
    return @

  updateArticle: (callback, id, optionData)->

    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')

    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post("https://emma.pixnet.cc/blog/articles/#{id}", {
      data: data
      done: (data)=>
        callback(JSON.parse(data)) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @updateArticle.apply(@, args)
        , data, args)
    })
    return @

  deleteArticle: (callback, id, optionData)->

    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')

    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._delete("https://emma.pixnet.cc/blog/articles/#{id}", {
      data: data
      done: (data)=>
        callback(JSON.parse(data)) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @deleteArticle.apply(@, args)
        , data, args)
    })
    return @

  getLatestArticle: (callback, userName, optionData)->
    data =
      user: userName
    data = pixnet._extends(data, optionData)

    pixnet._get "https://emma.pixnet.cc/blog/articles/latest", pixnet._defaultXHROptions(data, callback)
    return @

  getHotArticle: (callback, userName, optionData)->
    data =
      user: userName
    data = pixnet._extends(data, optionData)

    pixnet._get "https://emma.pixnet.cc/blog/articles/hot", pixnet._defaultXHROptions(data, callback)
    return @

  searchArticle: (callback, keyWord, userName, optionData)->
    data =
      key: keyWord
      user: userName
    data = pixnet._extends(data, optionData)

    pixnet._get "https://emma.pixnet.cc/blog/articles/search", pixnet._defaultXHROptions(data, callback)
    return @

  getComments: (callback, id, userName, optionData)->

    data =
      user: userName
      article_id: id
    data = pixnet._extends(data, optionData)

    pixnet._get "https://emma.pixnet.cc/blog/comments", pixnet._defaultXHROptions(data, callback)
    return @

  createComment: (callback, articleId, body, userName, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      article_id   : articleId
      body         : body
      user         : userName
      access_token : pixnet.getData('accessToken')

    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post('https://emma.pixnet.cc/blog/comments', {
      data: data
      done: (data)=>
        callback(JSON.parse(data)) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @createComment.apply(@, args)
        , data, args)
    })
    return @

  getSingleComment: (callback, id, userName, optionData)->

    data =
      user: userName
    data = pixnet._extends(data, optionData)

    pixnet._get "https://emma.pixnet.cc/blog/comments/#{id}", pixnet._defaultXHROptions(data, callback)
    return @

  replyComment: (callback, id, body, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      body         : body
      access_token : pixnet.getData('accessToken')

    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post("https://emma.pixnet.cc/blog/comments/#{id}/reply", {
      data: data
      done: (data)=>
        callback(JSON.parse(data)) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @replyComment.apply(@, args)
        , data, args)
    })
    return @

  setCommentOpen: (callback, id, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post("https://emma.pixnet.cc/blog/comments/#{id}/open", {
      data: data
      done: (data)=>
        callback(JSON.parse(data)) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @setCommentOpen.apply(@, args)
        , data, args)
    })
    return @

  setCommentClose: (callback, id, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post("https://emma.pixnet.cc/blog/comments/#{id}/close", {
      data: data
      done: (data)=>
        callback(JSON.parse(data)) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @setCommentClose.apply(@, args)
        , data, args)
    })
    return @

  markCommentSpam: (callback, id, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post("https://emma.pixnet.cc/blog/comments/#{id}/mark_spam", {
      data: data
      done: (data)=>
        callback(JSON.parse(data)) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @markCommentSpam.apply(@, args)
        , data, args)
    })
    return @

  markCommentHam: (callback, id, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')
    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._post("https://emma.pixnet.cc/blog/comments/#{id}/mark_ham", {
      data: data
      done: (data)=>
        callback(JSON.parse(data)) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @markCommentSpam.apply(@, args)
        , data, args)
    })
    return @

  deleteComment: (callback, id, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')

    data = pixnet._extends(data, optionData)
    args = arguments
    pixnet._delete("https://emma.pixnet.cc/blog/comments/#{id}", {
      data: data
      done: (data)=>
        callback(JSON.parse(data)) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @deleteComment.apply(@, args)
        , data, args)
    })
    return @

  getLatestComment: (callback, userName, optionData)->

    data =
      user: userName
    data = pixnet._extends(data, optionData)

    pixnet._get "https://emma.pixnet.cc/blog/comments/latest", pixnet._defaultXHROptions(data, callback)
    return @

  getSiteCategories: (callback, optionData)->

    data = {}

    data = pixnet._extends(data, optionData)
    pixnet._get 'https://emma.pixnet.cc/blog/site_categories', pixnet._defaultXHROptions(data, callback)
    return @


pixnet.blog = new PixBlog()