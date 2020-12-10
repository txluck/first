<template>
  <div id="carditem">
        <div class="md-title">
          <!-- md尺寸的小球 -->
          <div class="right-around md-ball">
            <span :style="{background: ballColor[index]}" v-for="(item, index) in 3" :key="index"></span>
          </div>
          <p class="title"> <i class="iconfont icon-lianjie"></i>  {{title}}</p>
        </div>
         <img @click="detailPage(text)" :src="Itemimg" alt="封面">
        <Card :contentid="id" class="card" >
          <!-- xl尺寸显示的三个小球 -->
          <div class="right-around xl-ball">
            <span :style="{background: ballColor[index]}" v-for="(item, index) in 3" :key="index"></span>
          </div>
          <!-- 文章标题 -->
           <p class="title"><i class="iconfont icon-lianjie"></i>  {{title}}</p>
            <!-- 文章简介 -->
            <p v-html="content" class="content" @click="detailPage(text)"></p>
            <!-- 文章发布时间，点赞数，访问量 -->
            <div class="article-item-icon">
              <div class="access_me"><img src="../../assets/images/touxiang.jpg" alt=""><p>大白菜</p></div>
              <p class="publictime"><Icon type="ios-clock-outline" /> {{time | dateFilter}}</p>
              <p class="box">
              <i @click="likeArticle" 
              class="iconfont icon-dianzan"
              ></i>
              <span style="margin-right:0.5rem">{{like}}</span>
              <i class="iconfont icon-pinglun"></i><span>{{accessPulish_count}}</span>
              <i class="iconfont icon-fangwen"></i><span>{{visited}}</span>
            </p>
            </div>
            <!-- 文章标签 -->
            <div class="tags">
              <Tag color="cyan">{{categroy}}</Tag>
              <Tag :color="bgColor[index]" v-for="(item,index) in lablesList" :key="index">{{item}}</Tag>
      </div>
    </Card>
  </div>
</template>
<script>
import moment from "moment";
  export default {
    name:'carditem',
    props:{
      title:{
        type:String,default:'',required:true
      },
      time:{
        type:String,default:'',required:true
      },
      content:{
        type:String,default:'',required:true
      },
      Itemimg:{
        type:String,default:'',required:true
      },
      visited:{
        type:Number,default:999,required:true
      },
      like:{
        type:Number,default:999,required:true
      },
      id:{
        type:Number,default:0,required:true
      },
      article_id:{
        type:String,default:'',required:true
      },
      accessPulish_count:{
        type:Number,default:0,required:true
      },
      lable:{
        type:String,default:''
      },
      categroy:{
        type:String,default:''
      },
      text:{
        type:Object,
        default:function(){
          return{
            title:'javascript知识点',
            time:'2020-12-7',
            article_img:require('../../assets/images1/3.png'),
            lable:'',
            article_categroy:"node",
            article_brief:'JavaScript 编程语言 流程控制Netscape在最初将其脚本语言命名为LiveScript，后来Netscape在与Sun合作之后将其改名为JavaScript。JavaScript最初受Java启发而开始设计的，目的之一就是“看上去像Java”，因此语法上有类似之处，一些名称和命名规范也借自Java。JavaScript与Java名称上的近似，是当时Netscape为了营销考虑与Sun微系统达成协议的结果。Java和JavaScript的关系就像张雨和张雨生的关系，只是名字很像。',
            visited:6,
            like_Star:6,
            id:1,
            article_id:'1',
            accessPulish_count:1
        }
      }
      }
    },
    data () {
      return {
        flag:true,
        bgColor:['magenta','blue','red','cyan','volcano','yellow'],
        ballColor:['orangered', 'yellow', 'lightgreen'],
       
      };
    },
  filters: {
    dateFilter(V) {
      return moment(V).format("YYYY-MM-DD");
    }
  },
    methods: {
      //点击文章跳转到详情页
      detailPage(text) {
        
        this.$router.push({
          // path:`/detail/${article_id}`,
          name:'detail',
          params:{
            text:text,
          }
          })
      },
      //点赞增加
      likeArticle() {
        if(this.$store.state.usernum) {
           this.like++
        
        } else {
           this.$Message.error("请先去登陆再来点赞噢小主！(ノへ￣、)")
        }
      },
   },
   computed:{
      lablesList() {
      const regExep = /\w\w*/g
      return this.title.match(regExep)
    }
   }
  }

</script>
<style lang="scss" scoped>
  #carditem {
    display: flex;
    flex-wrap: nowrap;
    border-bottom: 1px solid #ccc;
    .md-title { 
      display: none; font-size: 16px;
      margin: 1rem 0;
      color: #333;
    }
      .md-ball {
        margin-right: 1rem;
        display: none;
      }
     .right-around {
        float:right;
        span {
          display: inline-block;
          width: 12px;height: 12px;
          border-radius: 50%;
          margin: 0 0.2rem;
          border: 1px solid #f2f2f2;
        }
      }
    .card {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 0 0 0;
      border: 0;
      .title {
        font-size: 16px;
        margin: 1rem 0;
        color: #333;
      }
      .content {
        font-size: 14px;
      }
      .article-item-icon {
        display: flex;
        align-items: center;
        padding: 1rem 0;
        .publictime {
          white-space: nowrap;
          margin-left: 3rem;
        }
        .access_me {
          text-align: center;
          padding-top: 1rem;;
          font-size: .8rem;
          color: skyblue;
          img {
            border-radius: 50%;
            width: 30px;
            height: 30px;
            padding: 0;
            margin: 0;
          }
          p {
           transform: translate(35px,-25px);
          }
        }
        .box {
          padding-left: 0.8rem;
          i {
            font-size: 13px;
            margin: 0 0.2rem;
            color: #333;
          }
          i:nth-child(1):hover {
            color: orange;
            cursor: pointer;
          }
        }
      }
    }
    .card:hover {
      transition: transform .6s;
      box-shadow: 0 0 0 #fff;
      transform: scale(0.95);
      cursor: pointer;
    }
    img {
      width: 14rem;
      padding: .4rem;
      border-radius: 10px;
      cursor: pointer;
    }
  }
  @media screen and (max-width:992px) {
      #carditem {
        flex-direction: column;
        .md-ball {
          display: inline;
        }
        .xl-ball {
          display: none;
        }
        .md-title {
          display: block;
          p {
            margin-left: 1rem;
          }
        }
        .card {
          .title {
            display: none;
          }
        }
        img {
          width: 92%;
          margin: 0;
          margin:0 1rem;
        }
      }
  }
</style>