流程（有用的话记得给个star哈，谢谢啦）

制作首页App组件
1. 完成 Header 区域，使用的是Mint-UI中的Header组件
2. 制作底部的 Tabbarr 区域，使用的是MUI的Tabber组件
    + 在制作样式图标时，注意引入css扩展库与字体文件
3. 要在中间区域放置一个 router-view

改造 Tabbar 为 router-link

设置路由高亮

点击 tabbar 中的路由链接，展示对应的路由组件

制作首页轮播图

加载首页轮播图数据
1. 获取数据，使用 vue-resource
2. 使用vue-resource的this.$http.get获取
3. 获取到的数据，要保存到data身上
4. 使用v-for循环渲染每个item项

改造 九宫格 样式

改造 新闻资讯 路由链接

新闻资讯页面制作
1. 绘制界面
2. 使用vue-resource获取数据
3. 渲染真实数据

实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为router-link，同时在跳转的时候应该提供唯一的id标识符
2. 创建新闻详情的组件页面 NewInfo.vue
3. 在路由模块中将新闻详情的路由地址和组件页面对应起来

实现新闻详情的页面布局和数据渲染

单独封装一个comment.vue评论子组件
1. 先创建一个单独的comment.vue组件模板
2. 在需要使用comment组件的页面中，先手动导入comment组件
   import comment from './comment.vue'
3. 在父组件中使用'components'属性将刚才导入的comment组件注册为自己的子组件
4. 将注册子组件时候的注册名称以标签形式在页面中引用即可

获取所有的评论数据显示到页面中

实现点击加载更多评论的功能
1. 为加载更多按钮绑定点击事件，在事件中去请求下一页数据
2. 点击加载更多，让pageIndex++，然后重新调用getComments（）方法获取到下一页的数据
3. 为了防止新数据覆盖老数据的情况，我们在点击加载更多的时候，每当获取到新数据应该让老数据调用数组的concat方法拼接新数组

发表评论
1. 把文本框做双向数据绑定
2. 为发表评论按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则Toast提示用户评论内容不能为空
4. 通过vue-resource发送一个请求，把评论内容提交给服务器
5. 当发表评论OK后，重新刷新列表以查看最新的评论
   +如果调用getComments方法重新刷新评论列表的话可能只能得到最后一页的评论，前几页的评论获取不到
   +换一种思路：当评论成功后，在客户端手动拼接出一个最新的评论对象，然后调用数组的unshift方法，把最新的评论追加到
    data中comment的开头，这样就能完美实现刷新评论列表的需求
    
改造图片分享按钮为路由的链接并显示对应的组件页面

绘制图片列表组件页面结构并没美化样式
1. 制作顶部的滑动条
2. 制作底部的图片列表

制作顶部滑动条的坑
1. 需要借助于tab-top--webview-main.html
2. 需要把slider区域的mui-fullscreen类去掉
3. 滑动条无法正常触发滑动，通过检查官方文档发现这是一个js组件，需要被初始化
   +导入mui.js
   +调用官方提供的方式去初始化
   ```
   mui('.mui-scroll-wrapper').scroll({
   	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
   });
   ```
4. 我们在初始化滑动条时导入了mui.js，控制台报错：Uncaught TypeError: 
   'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions 
   or the arguments objects for calls to them
   +经过合理推测可能是mui.js用到了'caller', 'callee', and 'arguments'，但是，webpack打包的bundle.js
    默认启用严格模式，所以这两者冲突了
   +解决方案：1.把mui.js中的非严格模式的代码改掉，不现实不可取
             2.把webpack打包时的严格模式禁用掉
   +最终选择plan B 移除严格模式：使用插件：babel-plugin-transform-remove-strict-mode
5. 刚进入图片分享页面时滑动条无法正常工作，如果要初始化滑动条必须等DOM元素加载完毕，所以把初始化滑动条的代码
   搬到mounted生命周期函数中
6. 当滑动条调试成功后，tabbar无法正常工作，这时候需要把每个tabbar按钮的样式中‘mui-tab-item’重新改下名字
7. 获取所有分类，并渲染分类列表

制作图片列表区域
1. 图片列表需要使用懒加载技术，我们可以使用Mint-UI提供的现成组件 ‘lazy-load’
2. 根据‘lazy-load’的使用文档，尝试使用
3. 渲染图片列表数据

实现了图片列表的懒加载和样式美化

实现了点击图片跳转到图片详情页面
1. 在改造li成router-link的时候，需要使用tag属性指定要渲染为哪种元素

实现详情页面的布局和美化，同时获取数据渲染页面

实现图片详情中的缩略图功能
1. 使用插件vue-preview这个缩略图插件
2. 获取所有的图片列表，并用v-for指令渲染数据
3. 注意：img标签上的class不能去掉
4. 注意：每个图片数据对象中必须有w和h属性

绘制商品列表页面基本结构并美化

尝试在手机上进行项目的预览和测试
1. 保证自己手机可以正常运行
2. 保证手机和开发项目的电脑处于同一个WIFI环境中，手机可以访问到电脑的ip
3. 打开自己的项目中package.json文件，在dev脚本中添加一个--host指令，把当前电脑的WIFI IP地址设置为--host指令值
   +如何查看自己电脑所处WIFI的IP，在cmd中运行‘ipconfig’，查看无线网的ip地址


   
