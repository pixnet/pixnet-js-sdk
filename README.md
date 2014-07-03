# pixnet-js-sdk
=============
痞客邦 emma api 的 js 版 sdk

### 如何使用 gulp 開發
- gulp 建立了四個工作(task)，分別為：scripts, scripts_dev, watch, watch_dev。
- 先安裝 gulp 和相關套件:

        npm install gulp gulp-coffee gulp-concat gulp-uglify

- 然後在 gulpfile.js 目錄下，輸入：

        gulp watch_dev

- 如此就可以隨時監控 coffee 檔案並自動產生 lib/all.src.js

### 如何產生 js 檔案

- 因為核心是用 coffeescript 開發，所以如果要自行產生 JS 檔案，可以打以下指令：

        coffee -o dist -c src/*.coffee

- 如果你的電腦沒有安裝 coffee 可以參考 [coffeescript 官網](http://coffeescript.org/)
- 如果你不是使用 coffeescript 也沒關係，也可以直接載入 dist 內的 js 進行開發。
- 另外如果想要重新打包 src/all.min.js 的話，可以打下面指令：

        gulp scripts

### 如何使用測試程式
- 先把整個 repo 複製到你的網頁空間（有apache ）的那種
- 然後到 [這裡](http://developer.pixnet.pro/#!/apps) 申請一個測試用的 app
- Callback URL 記得要指定到你的網頁空間裡面的 test/index.html
- 然後打開 test/index.html 修改 10~12 行的資訊，改成你剛剛申請的 app 的資訊

        consumerKey: '你的 consumerKey',
        consumerSecret: '你的 consumerSecret',
        callbackUrl: '你的 Callback URL'

- 最後用瀏覽器打開 test/index.html 就可以看到測試結果了

### Pixnet 功能分類
#### Init
- 參數說明 pixnet.init
<table>
<tr><th>參數名稱</th><th>類型</th><th>說明</th></tr>
<tr><td>consumerKey</td><td>string</td><td>你的 consumerKey</td></tr>
<tr><td>consumerSecret</td><td>string</td><td>你的 consumerSecret</td></tr>
<tr><td>callbackUrl</td><td>string</td><td>你的 Callback URL</td></tr>
</table>

- 參數說明 pixnet.xxx.xxx
<table>
<tr><th>參數名稱</th><th>類型</th><th>說明</th></tr>
<tr><td>callback</td><td>function</td><td>執行後的結果都會丟給這個 callback function</td></tr>
<tr><td>必要參數</td><td>string</td><td>介於 callback 與 optionData 之間的參數都是必要參數，不可少</td></tr>
<tr><td>optionData</td><td>object</td><td>所有的 method 都有可選的參數，說明請參考<a href="http://developer.pixnet.pro/#!/doc/pixnetApi/oauthApi">API文件說明</a></td></tr>
</table>

#### Blog
- 列出部落格資訊 pixnet.blog.getInfo(callback, userName, [optionData])
- 列出所有部落格個人分類 pixnet.blog.getCategories(callback, userName, [optionData])
- 新增部落格個人分類 pixnet.blog.createCategories(callback, name, [optionData])
- 修改部落格個人分類 pixnet.blog.updateCategories(callback, id, [optionData])
- 刪除部落格個人分類 pixnet.blog.deleteCategories(callback, id, [optionData])
- 修改部落格個人分類排序 pixnet.blog.sortCategoriesTo(callback, ids, [optionData])
- 列出所有部落格個人文章 pixnet.blog.getAllArticles(callback, userName, [optionData])
- 讀取部落格個人文章 pixnet.blog.getArticle(callback, id, userName, [optionData])
- 讀取指定文章之相關文章 pixnet.blog.getRelatedArticle(callback, id, userName, [optionData])
- 新增部落格個人文章 pixnet.blog.createArticle(callback, title, body, [optionData])
- 修改部落格個人文章 pixnet.blog.updateArticle(callback, id, [optionData])
- 刪除部落格個人文章 pixnet.blog.deleteArticle(callback, id, [optionData])
- 列出所有部落格最新文章 pixnet.blog.getLatestArticle(callback, userName, [optionData])
- 列出所有部落格熱門文章 pixnet.blog.getHotArticle(callback, userName, [optionData])
- 搜尋部落格文章 pixnet.blog.searchArticle(callback, keyWord, userName, [optionData])
- 列出部落格留言 pixnet.blog.getComments(callback, id, userName, [optionData])
- 新增部落格留言 pixnet.blog.createComment(callback, articleId, body, userName, [optionData])
- 讀取部落格單一留言 pixnet.blog.getSingleComment(callback, id, userName, [optionData])
- 回覆部落格留言 pixnet.blog.replyComment(callback, id, body, [optionData])
- 將留言設為公開 pixnet.blog.setCommentOpen(callback, id, [optionData])
- 將留言設為悄悄話 pixnet.blog.setCommentClose(callback, id, [optionData])
- 將留言設為廣告留言 pixnet.blog.markCommentSpam(callback, id, [optionData])
- 將留言設為非廣告留言 pixnet.blog.markCommentHam(callback, id, [optionData])
- 刪除部落格留言 pixnet.blog.deleteComment(callback, id, [optionData])
- 列出部落格最新留言 pixnet.blog.getLatestComment(callback, userName, [optionData])
- 列出部落格全站分類 pixnet.blog.getSiteCategories(callback, [optionData])

#### Album
- 列出相簿主圖及相片牆 pixnet.album.getAlbumMain(callback, [optionData])
- 列出相簿列表 pixnet.album.getAlbumSetfolders(callback, userName, [optionData])
- 修改相簿首頁排序 pixnet.album.sortSetFolders(callback, ids, [optionData])
- 列出相簿個人 pixnet.album.getAlbumSets(callback, userName, [optionData])
- 讀取個人相簿單一Set pixnet.album.getAlbumSet(callback, id, userName, [optionData])
- 列出單一相簿的所有相片 pixnet.album.getAlbumSetElements(callback, setId, userName, [optionData])
- 列出單一相簿的所有留言 pixnet.album.getAlbumSetComments(callback, userName, [optionData])
- 新增相簿個人Sets pixnet.album.createAlbumSet(callback, title, description, [optionData])
- 修改相簿個人Sets pixnet.album.updateAlbumSet(callback, id, title, description, [optionData])
- 刪除相簿個人Sets pixnet.album.deleteAlbumSet(callback, id, [optionData])
- 修改相簿 Sets 排序 pixnet.album.sortAlbumSets(callback, parentId, ids, [optionData])
- 列出附近的相簿 Sets pixnet.album.getAlbumSetsNear(callback, userName, lat_y, lon_x, [optionData])
- 列出個人相簿資料夾 pixnet.album.getAlbumFolders(callback, userName, [optionData])
- 讀取個人相簿單一資料夾 pixnet.album.getAlbumFolder(callback, id, userName, [optionData])
- 列出相簿資料夾內的相簿 pixnet.album.getAlbumFolderSets(callback, id, userName, [optionData])
- 新增個人相簿資料夾 pixnet.album.createAlbumFolder(callback, title, description, [optionData])
- 修改個人相簿資料夾 pixnet.album.updateAlbumFolder(callback, id, title, description, [optionData])
- 刪除個人相簿資料夾 pixnet.album.deleteAlbumFolder(callback, id, [optionData])
- 列出相簿圖片影片 pixnet.album.getAlbumElements(callback, setId, userName, [optionData])
- 讀取相簿單篇圖片影片 pixnet.album.getElement(callback, elementId, userName, [optionData])
- 讀取相簿單篇圖片影片留言 pixnet.album.getElementComments(callback, elementId, userName, [optionData])
- 新增相簿圖片影片 pixnet.album.createElement(callback, setId, uploadFile, [optionData])
- 修改相簿單篇圖片影片 pixnet.album.updateElement(callback, id, [optionData])
- 刪除相簿單篇圖片影片 pixnet.album.deleteElement(callback, id, [optionData])
- 修改相簿圖片影片排序 pixnet.album.sortElement(callback, setId, ids, [optionData])
- 列出附近的相簿圖片影片 pixnet.album.getElementCommentsNear(callback, userName, lat_y, lon_x, [optionData])
- 列出相本留言 pixnet.album.getSetComments(callback, userName, [optionData])
- 讀取單一留言 pixnet.album.getSetComment(callback, id, userName, [optionData])
- 新增相本留言 pixnet.album.createSetComment(callback, setId, userName, body, [optionData])
- 將留言設為廣告留言 pixnet.album.markSetCommentSpam(callback, id, [optionData])
- 將留言設為非廣告留言 pixnet.markSetCommentHam(callback, id, [optionData])
- 刪除相本留言 pixnet.album.deleteSetComment(callback, id, [optionData])
- 列出相片留言(set_id or element_id 必要選一帶入) pixnet.album.getComments(callback, userName, [optionData])
- 讀取單一留言 pixnet.album.getComment(callback, id, userName, [optionData])
- 新增相片留言 pixnet.album.album.createElementComment(callback, elementId, userName, body, [optionData])
- 將留言設為廣告留言 pixnet.album.markElementCommentHam(callback, commentId, [optionData])
- 將留言設為非廣告留言 pixnet.album.markElementCommentSpam(callback, commentId, [optionData])
- 刪除相片留言 pixnet.album.deleteElementComment(callback, commentId, [optionData])
- 新增人臉標記(element_id or recommend_id  必要選一帶入) pixnet.album.createFace(callback, userName, elementId, x, y, width, height, [optionData])
- 更新人臉標記 pixnet.album.updateFace(callback, faceId, userName, elementId, x, y, width, height, [optionData])
- 刪除人臉標記 pixnet.album.deleteFace(callback, faceId, [optionData])
- 列出相簿個人設定 pixnet.album.getConfig(callback, [optionData])
- 列出相簿全站分類 pixnet.album.getSiteCategories(callback, [optionData])

#### Users
- 讀取認證使用者資訊 pixnet.users.getAccount(callback, [optionData])
- 讀取使用者公開資訊 pixnet.users.getUser(callback, userName, [optionData])

#### Index
- 讀取 API 使用次數資訊 pixnet.index.rate(callback, [optionData])
- 讀取 API Server 時間資訊 pixnet.index.now(callback, [optionData])

#### Friend
- 列出好友群組 pixnet.friend.getGroups(callback, [optionData])
- 新增好友群組 pixnet.friend.createGroup(callback, name, [optionData])
- 修改好友群組 pixnet.friend.updateGroup(callback, id, name, [optionData])
- 刪除好友群組 pixnet.friend.deleteGroup(callback, id, [optionData])
- 列出好友名單 pixnet.friend.getFriendships(callback, [optionData])
- 新增好友 pixnet.friend.createFriendship(callback, userName, [optionData])
- 加入群組 pixnet.friend.appendFriendshipGroup(callback, userName, groupId, [optionData])
- 移除群組 pixnet.friend.removeFriendshipGroup(callback, userName, groupId, [optionData])
- 移除好友 pixnet.friend.deleteFriendship(callback, userName, [optionData])
- 好友動態 pixnet.friend.getNews(callback, [optionData])
- 列出訂閱名單 pixnet.friend.getSubscriptions(callback, [optionData])
- 新增訂閱 pixnet.friend.createSubscription(callback, userName, [optionData])
- 刪除訂閱 pixnet.friend.deleteSubscription(callback, userName, [optionData])
- 列出訂閱群組 pixnet.friend.getSubscriptionGroup(callback, [optionData])
- 新增訂閱群組 pixnet.friend.createSubscriptionGroup(callback, name, [optionData])
- 修改訂閱群組 pixnet.friend.updateSubscriptionGroup(callback, id, name, [optionData])
- 刪除訂閱群組 pixnet.friend.deleteSubscriptionGroup(callback, id, [optionData])
- 修改訂閱群組排序 sortSubscriptionGroupTo(callback, ids, [optionData])
- 加入訂閱群組 pixnet.friend.joinSubscriptionGroup(callback, userName, groupIds, [optionData])
- 離開訂閱群組 pixnet.friend.leaveSubscriptionGroup(callback, userName, groupIds, [optionData])

#### Block
- 列出黑名單 pixnet.block.getBlock(callback, [optionData])
- 新增黑名單 pixnet.block.createBlock(callback, userName, [optionData])
- 刪除黑名單 pixnet.block.deleteBlock(callback, userName, [optionData])

#### GuestBook
- 列出留言板留言 pixnet.guestbook.getAll(callback, userName, [optionData])
- 新增留言板留言 pixnet.guestbook.create(callback, userName, body, [optionData])
- 讀取單一留言 pixnet.guestbook.getOne(callback, id, userName, [optionData])
- 回覆留言板留言 pixnet.guestbook.reply(callback, id, userName, body, [optionData])
- 將留言設為公開 pixnet.guestbook.setOpen(callback, id, [optionData])
- 將留言設為悄悄話 pixnet.guestbook.setClose(callback, id, [optionData])
- 將留言設為廣告留言 pixnet.guestbook.markSpam(callback, id, [optionData])
- 將留言設為非廣告留言 pixnet.guestbook.markHam(callback, id, [optionData])
- 刪除留言板留言 pixnet.guestbook.delete(callback, id, [optionData])

#### MainPage
- 列出文章專欄 pixnet.mainpage.getBlogColumns(callback, [optionData])
- 列出專欄的分類 pixnet.mainpage.getBlogColumnsCategories(callback, [optionData])
- 列出相簿專欄 pixnet.mainpage.getAlbumColumns(callback, [optionData])
- 列出分類熱門、最新、近期文章 pixnet.mainpage.getArticlesByCategory(callback, type, categoryId, [optionData])
- 列出分類熱門、最新、近期相簿 pixnet.mainpage.getAlbumsByCategory(callback, type, categoryId, [optionData])
- 列出熱門、最新、近期影音 pixnet.mainpage.getVideos(callback, type, categoryId, [optionData])
