<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>

    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>

    <hr>

    <!--缩略图区域-->
    <vue-preview :slides="slide1" @close="handleClose"></vue-preview>


    <!--图片内容区域-->
    <div class="content" v-html="photoinfo.content"></div>

    <!--放置一个现成的评论子组件-->
    <cmt-box :id="id"></cmt-box>


  </div>
</template>

<script>
  import { Toast } from 'mint-ui'

  //导入评论子组件
  import comment from '../subcomponents/comment.vue'

  export default {
    name: "",
    data() {
      return {
        id:this.$route.params.id,//从路由中获取到的图片id
        photoinfo:{},//图片详情
        slide1:[]//缩略图的数组
      }
    },
    created(){
      this.getPhotoInfo();
      this.getThumbs();
    },
    methods: {
      getPhotoInfo(){
        this.$http.get("api/getimageInfo/" + this.id).then(result => {
          if (result.body.status === 0){
            this.photoinfo = result.body.message[0];
          } else {
            Toast('获取图片详情失败！');
          }
        })
      },
      handleClose () {
        console.log('close event')
      },
      getThumbs(){
        this.$http.get('api/getthumimages/' + this.id).then(result => {
          if (result.body.status === 0){
            //循环每个图片数据，补全图片的宽和高
            result.body.message.forEach((item,index) => {
              item.msrc = item.src;
              item.alt = '图片' + (index + 1);
              item.title = '标题' + (index + 1);
              item.w = 600;
              item.h = 400;
            });
            //把完整的数据保存到slide1中
            this.slide1 = result.body.message;
          } else {
            Toast('获取缩略图失败！');
          }
        })
      }
    },
    components:{//注册评论子组件
      'cmt-box':comment
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .photoinfo-container {
    padding: 3px;
    h3 {
      color: #26a2ff;
      font-size: 15px;
      text-align: center;
      margin: 15px 0;
    }
    .subtitle {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
    }

    .content {
      font-size: 13px;
      line-height: 30px;
      text-indent: 2em;
    }

  }
</style>