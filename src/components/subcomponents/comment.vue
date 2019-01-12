<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要评论的内容（最多吐槽120字）" maxlength="120" v-model="msg"></textarea>

    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in comments" :key="item.id">
        <div class="cmt-title">
          第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}
        </div>
        <div class="cmt-body">
          {{item.content === 'undefined' ? '此用户很懒，什么都没说':item.content}}
        </div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  export default {
    name: "",
    data() {
      return {
        pageIndex:1,//默认展示第一页数据
        comments:[],//所有的评论数据
        msg:''//评论输入的内容
      }
    },
    created(){
      this.getComments();
    },
    methods: {
      getComments(){//获取评论
        this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex).then(result => {
          if (result.body.status === 0){
            // this.comments = result.body.message;
            //每当获取新数据的时候不要把老数据清空，而是应该进行拼接
            this.comments = this.comments.concat(result.body.message);
          }else {
            Toast('获取评论失败！');
          }
        });
      },
      getMore(){//加载更多
        this.pageIndex++;
        this.getComments();
      },
      postComment(){
        //校验是否为空
        if (this.msg.trim().length === 0){
          return Toast('评论内容不能为空！');
        }

        //发表评论
        //参数1：请求的url地址    参数2：提交给服务器的数据对象{content:this.msg}   参数3：定义提交时候表单数据格式  emulateJSON:true
        this.$http
          .post('api/postcomment/' + this.$route.params.id,{content:this.msg.trim()})
          .then(function (result) {
            if (result.body.status === 0){
              //拼接出一个评论对象
              var cmt = {user_name:'匿名用户',add_time:Date.now(),content:this.msg.trim()};
              this.comments.unshift(cmt);
              Toast('发表评论成功！');
              this.msg = "";
            }else {
              Toast('发表评论失败！');
            }
        })
      }
    },
    props:["id"]
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .cmt-container {
    padding-bottom:1px;
    h3 {
      font-size: 18px;
    }
    textarea {
      font-size: 14px;
      height: 85px;
      margin: 0;
    }
    .cmt-list {
      margin:5px 0;
      .cmt-item {
        font-size:13px;
        .cmt-title {
          line-height: 30px;
          background-color: #ccc;
        }
        .cmt-body {
          line-height: 35px;
          text-indent: 2em;
        }
      }
    }
  }
</style>