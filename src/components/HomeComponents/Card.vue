<template>
                                              <!-- 文章组件 -->
  <div id="card">
    <Row>
      <Col :xl="3" :lg="3" :md="2" :sm="1" :xs="0">
        <header>.</header>
      </Col>
                              <!-- 文章列表 -->
      <Col :xl="12" :lg="13" :md="12" :sm="12" :xs="24">
          <div class="article-box">
            <div class="article-category">
                <Icon type="ios-bookmarks-outline" />文章列表
                <div class="article-num">
                  共
                  <span>{{count}}</span> 篇
                </div>
            </div>
            <div class="card-left">
                                                 <!-- 文章卡片 -->
                  <Card-item
                    v-for="(item, index) in lists"
                    :title="item.title"
                    :time="item.time"
                    :Itemimg="imgList[index]"
                    :lable="item.lable"
                    :categroy="item.article_categroy"
                    :content="item.article_brief"
                    :visited="item.visited"
                    :like="item.like_Star"
                    :id="item.id"
                    :article_id="item.article_id"
                    :accessPulish_count="item.accessPulish_count"
                    :key="index"
                    :text="item"
                  />
                  <Page
                    ref="page"
                    :total="count"
                    :page-size="4"
                    class="page"
                    v-show="pageShow"
                    @on-change="Pagechange"
                    show-total
                  />
            </div>
          </div>
      </Col>
                                                     <!-- 搜索区域 -->
      <Col :xl="5" :lg="5" :md="8" :sm="10" :xs="0">
        <div class="right-box">
          <div class="card-right">
                                               <!-- 搜索框区 -->
            <div class="search">
              <input placeholder="输入文章关键词搜索.." type="text" v-model="likeSearch" />
              <button class="search-btn" @click="searchLike">search</button>
            </div>
                                                         <!-- 分类区 -->
            <div class="article-categroy">
              <div class="title">
                <Icon type="ios-aperture-outline" /> 文章分类
                <span>more</span>
              </div>

              <div class="categroy-item">
                <Badge
                  :count="item['COUNT(article_categroy)']"
                  :type="categroyColor[index]"

                  v-for="(item, index) in categroysList"
                  :key="index"
                >
                  <p
                    @click="getCategroyInfo(item.article_categroy)"
                    class="demo-badge"
                    :style="{color:bgColor[index]}"
                  >{{item.article_categroy}}</p>
                </Badge>
              </div>
            </div>
                                             <!-- 标签区 -->
            <div class="article-lable">
              <div class="title">
                <Icon type="ios-keypad" /> 文章标签
                <span>more</span>
              </div>
              <Tag
                class="tag"
                @click.native="getlableInfo(item)"
                :color="bgColor[index]"
                v-for="(item,index) in lablesList"
                :key="index"
              >{{item}}</Tag>
            </div>

                                          <!-- 最近文章区 -->
            <div class="time-article">
              <div class="title">
                <Icon type="ios-timer" /> 最近文章
                <span>more</span>
              </div>
              <div
                class="ItemList"
                v-for="(item, index) in navList"
                @click="timeArticle(item.article_id)"
                :key="index"
              >
                <Tooltip content="点击跳转到详情">{{item.title}}</Tooltip>
                <span>
                  <Icon type="ios-clock-outline" />
                  {{item.time | dateFilter}}
                </span>
              </div>
            </div>

                        <!-- 音乐区 -->
            <Music /> 
            <!-- 交友信息区 -->
            <my-makefriends style="margin-right: 1rem;" />
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
import CardItem from "./CardIItem";
import Music from "./Music";
import myMakefriends from "./MyMakefriend";
import moment from "moment";
import debounce from "../debounce/debounce";
export default {
  name: "card",
  data() {
    return {
      pageShow: true,
      lists: [
         
      ],
      imgList:[
        require('../../assets/images1/3.png'),
        require('../../assets/images1/16.png')
      ],
      count: 1,
      navList: [
        {
          article_id:1,
          title:'初入Vue'
        },
         {
          article_id:2,
          title:'javascript闭包问题'
        },
         {
          article_id:3,
          title:'javascript深度拷贝'
        },
        ],
      username: "",
      flag: false,
      modal1: false,
      value: "",
      lablesList: ['vue vuex','node服务器搭建','函数','router 路由','双向绑定 v-model'],
      categroysList: [
        {article_categroy:'javascript'},
        {article_categroy:'Linux'},
        {article_categroy:'jQueryt'},
        {article_categroy:'node.js'},
        {article_categroy:'vue.js'},
      ],
      likeSearch: "",
      bgColor: [
        "magenta",
        "blue",
        "red",
        "cyan",
        "volcano",
        "yellow",
        "magenta",
        "blue",
        "red",
        "cyan",
        "volcano",
        "yellow"
      ],
      categroyColor: [
        "primary",
        "success",
        "error",
        "warning",
        "primary",
        "success",
        "error",
        "warning"
      ]
    };
  },
  components: { CardItem, myMakefriends, Music },
  filters: {
    dateFilter(V) {
      return moment(V).format("YYYY-MM-DD");
    }
  },
  mounted() {
    this.Pagechange(1)
    this.getlables()
     this.$axios.get('/data.json').then(res=>{
      this.lists.push(...res.data.data)
      console.log(this.lists);
    })
  },
  methods: {
    /* 防抖 */
    searchLike: debounce(function() {
      if (!this.likeSearch) return this.$Message.error("搜索内容不能为空的呀~");
    }, 800),
    /* 获取标签 */
    getlables() {
      //
    },
    /* 获取标签详情 */
    getlableInfo() {
      this.$Spin.show();
      
    },
    /* 获取分类 */
    /* 获取分类详情页 */
    getCategroyInfo() {
      this.$Spin.show();
      setTimeout(()=>{
        this.$Spin.hide()
      },500)
    },
    getInfo() {
      this.username = this.$store.state.uesrnum;
      if (this.username) {
        // 
      }
    },
    Pagechange() {
      this.$store.commit('LoadingTitleChange', {isshow: true, title: '正在加载文章内容,请稍等...'})
    }
  }
};
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "leileiFont";
  src: url("../../assets/font/2012DingYongKangYingBiKaiShuXinBan-2.ttf");
}
#card {
  font-family:"微软雅黑";
  .article-box {
    background: #fff;
    border-radius: 5px;
    margin: 2rem 0;
    .article-category {
      line-height: 20px;
      font-size: 15px;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-bottom: 1.5px solid lightseagreen;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      .article-num {
        display: inline-block;
        float: right;
        color: #333;
        span {
          color: orange;
          font-size: 20px;
        }
      }
    }
    .card-left {
      border: 1px solid #ccc;
      border-top: 0;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      .page {
        text-align: right;
        margin: 1rem;
      }
    }
  }
  @media screen and (max-width: 568px) {
    .article-box {
      margin: 2rem;
    }
  }
  .right-box {
    margin: 2rem 1rem;
    .card-right {
      .search {
        width: 100%;
        margin-bottom: 1rem;
        input,
        .search-btn {
          outline: none;
          border: 1px solid #ccc;
        }
        input {
          width: 76%;
          border-right: none;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          padding: 4px 0;
          text-indent: 5px;
        }
        button.search-btn {
          cursor: pointer;
          width: 24%;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          background: deepskyblue;
          color: white;
          height: 32px;
          font-size: 13px;
        }
      }
      .article-lable,
      .article-categroy,
      .time-article {
        font-size: 14px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        border-radius: 5px;
        margin-bottom: 1rem;
        .title {
          line-height: 20px;
          padding: 0.5rem;
          border-bottom: 1.5px solid lightseagreen;
          span {
            display: block;
            float: right;
            color: rgb(96, 96, 248);
            font-size: 13px;
            cursor: pointer;
          }
          span:hover {
            color: orange;
          }
        }
        .tag {
          white-space: pre-wrap;
          margin: 0.4rem;
          cursor: pointer;
        }
        .tag:hover {
          opacity: 0.8;
        }
      }
      .article-categroy {
        .ivu-badge {
          border: 1px solid #ddd;
          border-radius: 5px;
          margin: 0.5rem;
          padding: 0.2rem;
          transition: opacity 0.6s;
        }
        .ivu-badge:hover {
          opacity: 0.8;
        }
        .categroy-item {
          margin-top: 0.8rem;
          .demo-badge {
            background: #fff;
            margin: 0.1rem;
            font-size: 13px;
            cursor: pointer;
          }
        }
      }
      .time-article {
        .ItemList {
          padding: 0.8rem 0.5rem;
          cursor: pointer;
          color: #555;
          border-bottom: 1px solid #ccc;
          transition: all 0.6s;
          font-size: 13px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            font-size: 12px;
            color: purple;
            font-weight: bold;
            white-space: nowrap;
          }
        }
        .ItemList:hover {
          background: #f2f2f2;
          color: lightgreen;
          padding-left: 0.8rem;
        }
        .ItemList:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>