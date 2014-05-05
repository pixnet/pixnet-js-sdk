# pixnet-js-sdk
=============
痞客邦 emma api 的 js 版 sdk

### 如何產生 js 檔案

- 因為核心是用 coffeescript 開發，所以如果要自行產生 JS 檔案，可以打以下指令：
    coffee -o dist -c src/*.coffee
- 如果你的電腦沒有安裝 coffee 可以參考 [coffeescript 官網](http://coffeescript.org/)
- 如果你不是使用 coffeescript 也沒關係，也可以直接載入 dist 內的 js 進行開發。

### 如何測試
- 先把整個 repo 複製到你的網頁空間（有apache ）的那種
- 然後到 [這裡](http://developer.pixnet.pro/#!/apps) 申請一個測試用的 app
- Callback URL 記得要指定到你的網頁空間裡面的 test/test.html
- 然後打開 test/test.js 修改 5~7 行的資訊，改成你剛剛申請的 app 的資訊

        consumerKey: '你的 consumerKey',
        consumerSecret: '你的 consumerSecret',
        callbackUrl: '你的 Callback URL'

- 最後用瀏覽器打開 test/test.html 就可以看到測試結果了

### Pixnet 功能分類

#### Init
#### Blog
- 列出部落格資訊 (/blog)
- 列出所有部落格個人分類 (/blog/categories)
- 新增部落格個人分類 (/blog/categories)
- 修改部落格個人分類 (/blog/categories/:id)
- 刪除部落格個人分類 (/blog/categories/:id)
- 刪除部落格個人分類排序 (/blog/categories/position)
- 列出所有部落格個人文章 (/blog/articles)
- 讀取部落格個人文章 (/blog/articles/:id)
- 讀取指定文章之相關文章 (/blog/articles/:id/related)
- 讀取指定文章之留言 (/blog/articles/:id/comments)
- 新增部落格個人文章 (/blog/articles)
- 修改部落格個人文章 (/blog/articles/:id)
- 刪除部落格個人文章 (/blog/articles/:id)
- 列出所有部落格最新文章 (/blog/articles/latest)
- 列出所有部落格熱門文章 (/blog/articles/hot)
- 搜尋部落格文章 (/blog/articles/search)
- 列出部落格留言 (/blog/comments)
- 新增部落格留言 (/blog/comments)
- 讀取部落格單一留言 (/blog/comments/:id)
- 回覆部落格留言 (/blog/comments/:id/reply)
- 將留言設為公開 (/blog/comments/:id/open)
- 將留言設為悄悄話 (/blog/comments/:id/close)
- 將留言設為廣告留言 (/blog/comments/:id/mark_spam)
- 將留言設為非廣告留言 (/blog/comments/:id/mark_ham)
- 刪除部落格留言 (/blog/comments/:id)
- 列出部落格最新留言 (/blog/comments/latest)
- 修改部落格個人分類排序 (/blog/categories/position)
- 列出部落格全站分類 (/blog/site_categories)

#### Album
- 列出相簿主圖及相片牆 (/album/main)
- 列出相簿列表 (與 http://:user.pixnet.net/album/list 同步) (/album/setfolders)
- 修改相簿首頁排序 (/album/setfolders/position)
- 列出相簿個人 Sets (/album/sets)
- 讀取個人相簿單一 Set (/album/sets/:id)
- 列出單一相簿的所有相片 (/album/sets/:id/elements)
- 列出單一相簿的所有留言 (/album/sets/:id/comments)
- 新增相簿個人 Sets (/album/sets)
- 修改相簿個人 Sets (/album/sets/:id)
- 刪除相簿個人 Sets (/album/sets/:id)
- 修改相簿 Sets 排序 (/album/sets/position)
- 列出附近的相簿 Sets (/album/sets/nearby)
- 列出個人相簿資料夾 (/album/folders)
- 讀取個人相簿單一資料夾 (/album/folders/:id)
- 列出相簿資料夾內的相簿 (/album/folders/:id/sets)
- 新增個人相簿資料夾 (/album/folders)
- 修改個人相簿資料夾 (/album/folders/:id)
- 刪除個人相簿資料夾 (/album/folders/:id)
- 列出相簿圖片影片 (/album/elements)
- 讀取相簿單篇圖片影片 (/album/elements/:id)
- 讀取相簿單篇圖片影片留言 (/album/elements/:id/comments)
- 新增相簿圖片影片 (/album/elements)
- 修改相簿單篇圖片影片 (/album/elements/:id)
- 刪除相簿單篇圖片影片 (/album/elements/:id)
- 修改相簿圖片影片排序 (/album/elements/position)
- 列出附近的相簿圖片影片 (/album/elements/nearby)
- 列出相本留言 (/album/set_comments)
- 新增相本留言 (/album/set_comments)
- 讀取單一留言 (/album/set_comments/:id)
- 將留言設為廣告留言 (/album/set_comments/:id/mark_spam)
- 將留言設為非廣告留言 (/album/set_comments/:id/mark_ham)
- 刪除相本留言 (/album/set_comments/:id)
- 列出相片留言 (/album/comments)
- 新增相片留言 (/album/comments)
- 讀取單一留言 (/album/comments/:id)
- 將留言設為廣告留言 (/album/comments/:id/mark_spam)
- 將留言設為非廣告留言 (/album/comments/:id/mark_ham)
- 刪除相片留言 (/album/comments/:id)
- 新增人臉標記 (/album/faces)
- 更新人臉標記 (/album/faces/:face_id)
- 刪除人臉標記 (/album/faces/:face_id)
- 列出相簿個人設定 (/album/config)
- 列出相簿全站分類 (/album/site_categories)

#### User
- 讀取認證使用者資訊 (/account)
- 讀取使用者公開資訊 (/users/:user)

#### Index
- 讀取 API 使用次數資訊 (/index/rate)
- 讀取 API Server 時間資訊 (/index/now)

#### Friend
- 列出好友群組 (/friend/groups)
- 新增好友群組 (/friend/groups)
- 修改好友群組 (/friend/groups/:id)
- 刪除好友群組 (/friend/groups/:id)
- 列出好友名單 (/friendships)
- 新增好友 (/friendships)
- 加入群組 (/friendships/append_group)
- 移除群組 (/friendships/remove_group)
- 移除好友 (/friendships/delete)
- 好友動態 (/friend/news)
- 列出訂閱名單 (/friend/subscriptions)
- 新增訂閱 (/friend/subscriptions)
- 加入訂閱群組 (/friend/subscriptions/:user/join_subscription_group)
- 離開訂閱群組 (/friend/subscriptions/:user/leave_subscription_group)
- 刪除訂閱 (/friend/subscriptions/:user)
- 列出訂閱群組 (/friend/subscription_groups)
- 新增訂閱群組 (/friend/subscription_groups)
- 修改訂閱群組 (/friend/subscription_groups/:id)
- 刪除訂閱群組 (/friend/subscription_groups/:id)
- 修改訂閱群組排序 (/friend/subscription_groups/position)
- 移除好友 (/friendships/delete)
- 移除好友 (/friendships/delete)
#### Block
- 列出黑名單 (/blocks)
- 新增黑名單 (/blocks/create)
- 刪除黑名單 (/blocks/delete)

#### GuestBook
- 列出留言板留言 (/guestbook)
- 新增留言板留言 (/guestbook)
- 讀取單一留言 (/guestbook/:id)
- 回覆留言板留言 (/guestbook/:id/reply)
- 將留言設為公開 (/guestbook/:id/open)
- 將留言設為悄悄話 (/guestbook/:id/close)
- 將留言設為廣告留言 (/guestbook/:id/mark_spam)
- 將留言設為非廣告留言 (/guestbook/:id/mark_ham)
- 刪除留言板留言 (/guestbook/:id)

#### MainPage
- 列出文章專欄 (/mainpage/blog/columns)
- 列出專欄的分類 (/mainpage/blog/columns/categories)
- 列出相簿專欄 (/mainpage/album/columns)
- 列出分類熱門、最新、近期文章 (/mainpage/blog/categories/:type/:category_id)
- 列出分類熱門、最新、近期相簿 (/mainpage/album/categories/:type/:category_id)
- 列出熱門、最新、近期影音 (/mainpage/album/video/:type)
