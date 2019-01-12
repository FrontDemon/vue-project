<template>
  <div class="goods-list">
    <!--<router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
    </router-link>-->
<!--    在网页中，有两种跳转方式
    方式1：使用a标签的形式叫做标签跳转
    方式2：使用window.location.href的形式叫做编程式导航-->
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDail(item.id)" >
        <img :src="item.img_url" alt="">
        <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  export default {
    name: "",
    data() {
      //data往自己组件内部挂载一些私有数据
      return {
        pageindex:1,//分页的页数
        goodslist:[]//存放商品列表
      }
    },
    created(){
      this.getGoodsList();
    },
    methods: {
      getGoodsList(){
        //获取商品列表
        this.$http.get("api/getgoods?pageindex=" + this.pageindex).then(result => {
          if (result.body.status === 0){
            this.goodslist = this.goodslist.concat(result.body.message);
          } else {
            Toast('获取商品列表失败！');
          }
        })
      },
      getMore(){
        this.pageindex++;
        this.getGoodsList();
      },
      goDail(id){
        //使用JS形式进行路由导弹
        //注意：this.$route和this.$router的区别
        //this.$route路由参数对象，所有路由中的参数params，query都属于它
        //this.$router是一个路由导航对象，用它可以方便的使用JS代码，实现路由的前进、后退，跳转到新的URL地址
        //1. 字符串
        // this.$router.push('/home/goodsinfo/' + id);
        //2. 对象
        // this.$router.push({ path:'/home/goodsinfo/' + id });
        //3. 命名的路由
        this.$router.push({ name:"goodsinfo" , params:{ id } });
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding:7px;
    justify-content:space-between;
    .goods-item {
      width: 49%;
      border:1px solid #ccc;
      box-shadow:0 0 8px #ccc;
      margin:4px 0;
      padding:2px;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      min-height:293px;
      img {
        width: 100%;
      }
      .title {
        font-size: 14px;
      }

      .info {
        background-color:#eee;
        p {
          margin: 0;
          padding: 5px;
        }
        .price {
          .now {
            color: red;
            font-weight: bold;
            font-size: 16px;
          }
          .old {
            text-decoration: line-through;
            font-size: 12px;
            margin-left: 10px;
          }
        }

        .sell {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
</style>