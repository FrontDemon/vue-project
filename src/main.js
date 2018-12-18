//入口文件
// console.log('ok');
import Vue from 'vue'

//按需导入mint-ui组件
import { Header } from 'mint-ui'
Vue.component(Header.name, Header);

//导入mui样式
import './lib/mui/css/mui.min.css'

//导入app.vue组件
import App from './App.vue'

var vm = new Vue({
  el:'#app',
  render:c => c(App)
});