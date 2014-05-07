class PixMainpage
  getBlogColumns: (callback, optionData)->
    category = if optionData.categoryId then "/#{optionData.categoryId}" else ""
    data = {}
    data = pixnet._extends(data, optionData)
    pixnet._get "https://emma.pixnet.cc/mainpage/blog/columns#{category}", pixnet._defaultXHROptions(data, callback)
    return @

  getBlogColumnsCategories: (callback, optionData)->
    data = {}
    data = pixnet._extends(data, optionData)
    pixnet._get "https://emma.pixnet.cc/mainpage/blog/columns/categories", pixnet._defaultXHROptions(data, callback)
    return @

  getAlbumColumns: (callback, optionData)->
    data = {}
    data = pixnet._extends(data, optionData)
    pixnet._get "https://emma.pixnet.cc/mainpage/album/columns", pixnet._defaultXHROptions(data, callback)
    return @

  getArticlesByCategory: (callback, type, categoryId, optionData)->
    data = {}
    data = pixnet._extends(data, optionData)
    pixnet._get "https://emma.pixnet.cc/mainpage/blog/categories/#{type}/#{categoryId}", pixnet._defaultXHROptions(data, callback)
    return @

  getAlbumsByCategory: (callback, type, categoryId, optionData)->
    data = {}
    data = pixnet._extends(data, optionData)
    pixnet._get "https://emma.pixnet.cc/mainpage/album/categories/#{type}/#{categoryId}", pixnet._defaultXHROptions(data, callback)
    return @

  getVideos: (callback, type, categoryId, optionData)->
    data = {}
    data = pixnet._extends(data, optionData)
    pixnet._get "https://emma.pixnet.cc/mainpage/album/video/#{type}", pixnet._defaultXHROptions(data, callback)
    return @

pixnet.mainpage = new PixMainpage()