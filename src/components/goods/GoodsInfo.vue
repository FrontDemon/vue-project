<template>
  <div class="goodsinfo-container">

    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!--商品轮播图区域-->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!--商品购买区域-->
    <div class="mui-card">
      <div class="mui-card-header">商品的名称标题</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <p>
            购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!--商品参数区域-->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import swiper from '../subcomponents/swiper.vue'
  import numbox from '../subcomponents/goodsinfo_numbox.vue'


  export default {
    name: "",
    data() {
      return {
        id:this.$route.params.id,//将路由参数中id挂载到data，方便后期调用
        lunbotu:[],//轮播图数据
        goodsinfo:{},//获取到的商品信息
        ballFlag:false,//控制小球隐藏和显示的标识符
        selectedCount:1//保存用户选择的商品数量,默认为1
      }
    },
    created(){
      this.getLunbotu();
      this.getGoodsInfo();
    },
    methods: {
      getLunbotu(){
        this.$http.get('api/getthumimages/' + this.id).then(result => {
          if (result.body.status === 0){
            result.body.message.forEach(item => {
              item.img = item.src;
            });
            this.lunbotu = result.body.message;
          } else {
            Toast('获取轮播图片失败！');
          }
        })
      },
      getGoodsInfo(){
        //获取商品信息
        this.$http.get('api/goods/getinfo/' + this.id).then(result => {
          if (result.body.status === 0){
            this.goodsinfo = result.body.message[0];
          }else {
            Toast('获取商品信息失败！');
          }
        })
      },
      goDesc(id){
        //点击使用编程式导航跳转到图文介绍页面
        this.$router.push({ name:"goodsdesc",params:{ id } });
      },
      goComment(id){
        //点击跳转到评论页面
        this.$router.push({ name:"goodscomment",params:{ id } });
      },
      addToShopCar(){
        //添加到购物车
        this.ballFlag = !this.ballFlag;
      },
      beforeEnter(el){
        el.style.transform = "translate(0,0)";
      },
      enter(el,done){
        el.offsetWidth;

        //小球动画优化思路
/*        1. 先分析动画不准确的原因：把小球位移到的最终位置局限在了某一分辨率下的滚动条来滚动的情况下
        2. 只要分辨率和测试的时候不一样，或者滚动条有一定的滚动距离后，问题出现了
        3. 因此，经过分析，得到结论：不能把位置的横纵坐标写死，应该根据不同的情况动态计算坐标值
        4. 解题思路：先得到徽标的横纵坐标，再得到小球的横纵坐标，然后让y值和x值求差，得到的结果就是横纵坐标位移
        5. 如何获取徽标和小球的位置？  domObject.getBoundindClientRect()可以得到*/

        //获取小球在页面中的位置
        const ballPosition = this.$refs.ball.getBoundingClientRect();
        //获取徽标在页面中的位置
        const badgePosition = document.getElementById('badge').getBoundingClientRect();
        //位移横纵距离
        const xDist = badgePosition.left - ballPosition.left;
        const yDist = badgePosition.top - ballPosition.top;

        el.style.transform = `translate(${xDist}px,${yDist}px)`;
        el.style.transition = "all .5s cubic-bezier(.4,-0.3,1,.68)";
        done();
      },
      afterEnter(el){
        this.ballFlag = !this.ballFlag;
      },
      getSelectedCount(count){
        //当子组件把选中的数量传递给父组件时，把选中的值保存到data上
        // console.log(count);
        this.selectedCount = count;
      }
    },
    components:{
      swiper,
      numbox
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .goodsinfo-container {
    background-color: #ccc;
    overflow: hidden;

    .now_price {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }

    .mui-card-footer {
      display: block;
      button {
        margin: 15px 0;
      }
    }

    .ball {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: red;
      position: absolute;
      top: 390px;
      left: 146px;
      z-index: 99;
    }
  }
</style>