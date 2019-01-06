<template>
  <div>

    <!--轮播图区域-->
    <mt-swipe :auto="4000">
      <!--在组件中使用v-for循环一定要使用key-->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>

    <!--九宫格到六宫格-->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt="新闻资讯">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu2.png" alt="图片分享">
          <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu3.png" alt="商品购买">
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt="留言反馈">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt="视频专区">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt="联系我们">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>


  </div>
</template>

<script>
  import { Toast } from 'mint-ui'

  export default {
    name: "",
    data() {
      return {
        lunbotuList:[]//保存轮播图的数组
      }
    },
    created(){
      this.getLunbotu();
    },
    methods: {
      //获取轮播图数据的方法
      getLunbotu(){//获取轮播图数据的方法
        console.log('result');
        this.$http.get("api/getlunbo").then(result => {
          // console.log(result);
          if (result.body.status === 0){//成功
            // this.lunbotuList = result.body.data.slice(0,4);
            this.lunbotuList = result.body.message;

            // Toast("加载轮播图成功...");
            // console.log(this.lunbotuList);
          }else {//失败
            Toast("加载轮播图失败...");
          }
        },error => {
          console.log('error...');
        });
      }
    }
  }
</script>

<!--<style scoped>
  /*css写法*/
  .mint-swipe {
    height: 200px;
  }

  .mint-swipe .mint-swipe-item:nth-child(1) {
    background-color: red;
  }

  .mint-swipe .mint-swipe-item:nth-child(2) {
    background-color: blue;
  }

  .mint-swipe .mint-swipe-item:nth-child(3) {
    background-color: cyan;
  }

  .mint-swipe .mint-swipe-item img {
    width: 100%;
    height: 100%;
  }
  .mui-table-view .mui-grid-view .mui-grid-9 {
    background-color: #fff;
    border: none;
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
  }
</style>-->

<!--scss写法-->
<style lang="scss" scoped>
  .mint-swipe {
    height: 200px;

    .mint-swipe-item {
      /*!*&表示交集*!*/
      &:nth-child(1) {
         background-color: white;
       }
      &:nth-child(2) {
         background-color: white;
       }
      &:nth-child(3) {
         background-color: white;
       }
    }
  }

  img {
    width: 100%;
    height: 100%;
  }

  .mui-grid-view .mui-grid-9 {
    background-color: #fff;
    border: none;
    img {
      width: 60px;
      height: 60px;
    }
    .mui-media-body {
      font-size: 13px;
    }
  }

  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
  }
</style>
