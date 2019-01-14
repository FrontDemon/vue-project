//入口文件
// console.log('ok');
import Vue from 'vue'
//1.1导入路由包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter);

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex);

//每次刚进入网站肯定会调用main.js，在刚调用的时候先从本地存储中把购物车中的数据读出来放入store中
var car = JSON.parse(localStorage.getItem('car') || '[]');

var store = new Vuex.Store({
  state:{//this.$store.state.***
    car:car//将购物车中的商品的数据用一个数组存储起来，在car数组中存储一些商品的对象，
    // 可以暂时将商品对象设计成{ id:商品id, count:购买数量, price:商品单价, selected:true或false }
  },
  mutations:{//this.$store.commit('方法名称','按需传递唯一的参数')
    addToCar(state,goodsinfo){
      //点击加入购物车，把商品信息保存到store的car上
      //分析：如果购物车之前已经有对应商品，只需要更新数量
      //如果没有，则直接把商品数据push到car中即可

      //假设在购物车中没有找到对应的商品
      var flag = false;

      state.car.some(item => {
        if (item.id == goodsinfo.id){
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true;
        }
      });

      //如果最终循环完毕得到的flag还是false，则把商品数据直接push到car中
      if (!flag){
        state.car.push(goodsinfo);
      }

      //当更新car之后把car数组存储到本地的localStorage中
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    updateGoodsInfo(state,goodsinfo){
      //修改购物车中的商品数量值
      state.car.some(item => {
        if (item.id == goodsinfo.id){
          item.count = parseInt(goodsinfo.count);
          return true;
        }
      });
      //当修改完商品数量把最新的购物车数据保存到本地存储中
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    removeFromCar(state,id){
      //根据id从store中的购物车中删除对应的那条商品数据
      state.car.some((item,i) => {
        if (item.id == id){
          state.car.splice(i, 1);
          return true;
        }
      });
      //将删除完毕后的最新的购物车数据同步到本地存储中
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    updateGoodsSelected(state,info){
      state.car.some(item => {
        if (item.id == info.id){
          item.selected = info.selected;
        }
      });
      //把最新的所有购物车商品的状态保存到store中去
      localStorage.setItem('car',JSON.stringify(state.car));
    }
  },
  getters:{//this.$store.getters.***
    //相当于计算属性，也可以当作过滤器
    getAllCount(state){
      var c = 0;
      state.car.forEach(item => {
        c += item.count;
      });
      return c;
    },
    getGoodsCount(state){
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.count;
      });
      return o;
    },
    getGoodsSelected(state){
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.selected;
      });
      return o;
    },
    getGoodsCountAndAmount(state){
      var o = {
        count:0,//勾选数量
        amount:0//勾选总价
      };
      state.car.forEach(item => {
        if (item.selected){
          o.count += item.count;
          o.amount += item.price * item.count;
        }
      });
      return o;
    }
  },
  actions:{//提交的是mutations，而不是直接变更状态；可以包含任意异步操作

  },
  modules:{//模块分割

  }
});

//d导入时间插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFormat',function (dataStr,pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
});

//2.1导入vue-resource
import VueResource from 'vue-resource'
//2.2安装vue-resource
Vue.use(VueResource);
//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
//全局设置表单数据格式组织形式
Vue.http.options.emulateJSON = true;

//按需导入mint-ui组件
/*import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);*/
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);


//导入mui样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//1.3导入自己的router.js路由模块
import router from './router.js'

//导入app.vue组件
import App from './App.vue'

var vm = new Vue({
  el:'#app',
  render:c => c(App),
  //1.4挂载路由对象到vm实例上
  router,
  store //挂载store状态管理对象
});


