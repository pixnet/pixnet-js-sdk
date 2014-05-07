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
        , data)
    })
    return @

  updateCategories: (callback, name, optionData)->
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
          @updateCategories.apply(@, args)
        , data)
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
        , data)
    })
    return @

  sortCategoriesTo: (callback, ids, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

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
        , data)
    })
    return @

  getAllArticles: (callback, userName, optionData)->

    data =
      user : userName

    data = pixnet._extends(data, optionData)
    pixnet._get 'https://emma.pixnet.cc/blog/articles', pixnet._defaultXHROptions(data, callback)
    return @

  getArticle: (callback, userName, optionData)->

    data = {}
    data = pixnet._extends(data, optionData)

    pixnet._get "https://emma.pixnet.cc/blog/articles/#{userName}", pixnet._defaultXHROptions(data, callback)
    return @

  getRelatedArticle: (callback, userName, optionData)->

    data = {}
    data = pixnet._extends(data, optionData)

    pixnet._get "https://emma.pixnet.cc/blog/articles/#{userName}/related", pixnet._defaultXHROptions(data, callback)
    return @

  getRelatedArticle: (callback, userName, optionData)->

    data = {}
    data = pixnet._extends(data, optionData)

    pixnet._get "https://emma.pixnet.cc/blog/articles/#{userName}/related", pixnet._defaultXHROptions(data, callback)
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
        , data)
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
        , data)
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
        , data)
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

  getComments: (callback, userName, optionData)->

    data =
      user: userName
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
    pixnet._post('https://emma.pixnet.cc/blog/articles', {
      data: data
      done: (data)=>
        callback(JSON.parse(data)) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @createComment.apply(@, args)
        , data)
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
        , data)
    })
    return @

  setCommentOpen: (callback, id, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')

    url = if isOpen then "https://emma.pixnet.cc/blog/comments/#{id}/open" else "https://emma.pixnet.cc/blog/comments/#{id}/close"

    data = pixnet._extends(data, optionData)
    pixnet._post(url, {
      data: data
      done: (data)=>
        callback(JSON.parse(data)) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @setCommentClose.apply(@, args)
        , data)
    })
    return @

  markCommentSpam: (callback, id, isSpam, optionData)->
    if not pixnet.isLogin
      pixnet._error 'Need login'
      return @

    data =
      access_token : pixnet.getData('accessToken')

    url = if isSpam then "https://emma.pixnet.cc/blog/comments/#{id}/mark_spam" else "https://emma.pixnet.cc/blog/comments/#{id}/mark_ham"

    data = pixnet._extends(data, optionData)
    pixnet._post(url, {
      data: data
      done: (data)=>
        callback(JSON.parse(data)) if callback
      fail: (data)=>
        pixnet.apiInvalidGrantFunc(()=>
          @markCommentSpam.apply(@, args)
        , data)
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
        , data)
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