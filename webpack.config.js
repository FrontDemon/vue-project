const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode:'development',
  entry:path.join(__dirname,'./src/main.js'),
  output:{
    path:path.join(__dirname,'./dist'),
    filename:'bundle.js'
  },
  plugins:[//配置所有webpack插件的节点
    new HtmlWebpackPlugin({
      template:path.join(__dirname,'./src/index.html'),
      filename:'index.html'
    }),
    new VueLoaderPlugin()
  ],
  module:{//配置所有第三方loader的节点
    rules:[
      {test:/\.css$/,use:['style-loader','css-loader']},//配置处理.css文件的第三方loader规则,use数组从右到左
      {test:/\.less$/,use:['style-loader','css-loader','less-loader']},//配置处理.less文件的第三方loader规则
      {test:/\.scss/,use:['style-loader','css-loader','sass-loader']},//配置处理.sass文件的第三方loader规则
      {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=27888&name=[hash:8]-[name].[ext]'},//配置处理图片路径url的第三方loader规则
      //limit给定的值是图片的大小，单位是byte，如果引用的图片大于或等于给定的limit值，则不会被转为base64格式的字符串，
      //如果图片小于给定的limit值，则会被转为base64字符串
      {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},//配置处理字体文件的loader
      {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},//配置babel转换高级的ES语法
      {test:/\.vue$/,use:'vue-loader'}//处理.vue文件的loader
    ]
  },
  resolve:{
    alias:{//修改vue被导入时包的路径
      "vue$":"vue/dist/vue.js"
    }
  }
};