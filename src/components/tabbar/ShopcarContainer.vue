<template>
  <div class="shopcar-container">
    <!--商品列表项区域-->
    <div class="goodslist">
      <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                       @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
               <!-- 问题：如何从购物车中获取商品的数量
                1. 先创建一个空对象，然后循环购物车中所有商品的数据，把当前循环这条商品的id
                   作为对象的属性名，count值作为对象的属性值，这样当把所有的商品循环一遍后就
                   得到一个对象：{ 88: 1, 89: 2, 90: 3 }-->
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--商品结算区域-->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner account">
          <div class="total">
            <p>总计(不含运费)</p>
            <p>已勾选商品&nbsp;
              <span class="check-num">{{ $store.getters.getGoodsCountAndAmount.count }}</span>&nbsp;件，总价￥
              <span class="total-num">{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>

    <!--<p>{{ $store.getters.getGoodsSelected }}</p>-->
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import numbox from '../subcomponents/shopcar_numbox.vue'
  export default {
    name: "",
    data() {
      return {
        goodslist:[]//购物车商品列表数据
      }
    },
    created(){
      this.getGoodsList();
    },
    methods: {
      getGoodsList(){
        //1. 获取到store中所有商品的id，拼接出一个用，分隔的字符串
        var idArr = [];
        this.$store.state.car.forEach(item => idArr.push(item.id));
        if (idArr.length < 0){
          //如果购物车中没有商品则直接返回，不需要请求数据接口，否则会报错
          return;
        }
        //获取购物车商品列表
        this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(result => {
          if (result.body.status === 0){
            this.goodslist = result.body.message;
          } else {
            Toast('获取购物车商品列表失败！');
          }
        });
      },
      remove(id,index){
        //点击删除，把商品从store中根据传递的id删除，同时把当前组件中的goodslist中 对应要删除的商品使用index删除
        this.goodslist.splice(index,1);
        this.$store.commit('removeFromCar',id);
      },
      selectedChanged(id,value){
        //每当点击开关把最新的开关状态同步到store中
        console.log(id+'--'+value);
        this.$store.commit('updateGoodsSelected',{ id,selected:value });
      }
    },
    components:{
      numbox
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .shopcar-container {
    background-color: #eee;
    overflow: hidden;
    .goodslist {
      img {
        width: 60px;
        height: 60px;
      }
      h1 {
        font-size: 13px;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .price {
          color: red;
          font-weight: bold;
        }
      }
      .mui-card-content-inner {
        display: flex;
        align-items: center;
      }
    }
    .account {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .check-num,.total-num {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
</style>