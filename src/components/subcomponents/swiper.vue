<template>
  <div>
    <mt-swipe :auto="4000">
      <!--在组件中使用v-for循环一定要使用key-->
      <!--将来，谁使用此轮播图组件谁为我们传递lunbotuList-->
      <!--lunbotuList是父组件向子组件传值来设置-->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img" alt="" :class="{'full':isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>

  <!--分析：为什么商品评论中的轮播图那么丑-->
<!--  1. 首页中的图片宽和高都是使用了100%的高度
  2. 在商品详情页面中，如果轮播图的图片也使用宽高100%的话，页面变丑
  3. 商品详情页面中的轮播图期望高度100%，宽度为自适应auto
  4. 经过分析，原因：首页中的轮播图和详情中的轮播图分歧点是宽度是100%还是自适应
  5. 两个轮播图只存在宽度冲突，可以定义属性让使用轮播图的调用者手动指定是否为100%宽度-->
</template>

<script>
  export default {
    props:["lunbotuList","isfull"]
  }
</script>

<style lang="scss" type="text/scss" scoped>

  img {
    /*width: 100%;*/
    height: 100%;
  }

  .mint-swipe {
    height: 200px;

    .mint-swipe-item {
      text-align: center;
      /*!*&表示交集*!*/
/*      &:nth-child(1) {
         background-color: red;
      }
      &:nth-child(2) {
         background-color: yellow;
      }
      &:nth-child(3) {
         background-color: blue;
      }*/
    }
  }

  .full {
    width: 100%;
  }
</style>