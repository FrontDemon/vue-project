<template>
  <div class="goodsdesc-container">
    <h3>{{ info.title }}</h3>

    <hr>

    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  export default {
    name: "",
    data() {
      return {
        info:{}//图文数据
      }
    },
    created(){
      this.getGoodsDesc();
    },
    methods: {
      getGoodsDesc(){
        this.$http.get('api/goods/getdesc/' + this.$route.params.id).then(result => {
          if (result.body.status === 0){
            this.info = result.body.message[0];
          }else {
            Toast('获取商品介绍数据失败！');
          }
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .goodsdesc-container {
    padding: 4px;

    h3 {
      font-size: 16px;
      color: #226aff;
      text-align: center;
      margin: 15px 0;
    }

    .content {
      img {
        width: 100%;
      }
    }
  }
</style>