<template>
                                                    <!-- demo组件 -->
  <div id="demo">
    <div v-for="(item, index) in demoList" :key="index" class="demoItem">
      <video id="video" controls preload="none" :poster="item.video_pic">
        <source :src="item.video_path" type="video/mp4" />
      </video>
      <footer>
        <p>{{item.content}}</p>
        <span>{{item.datetime | dateFilter}}</span>
        <Button type="success" @click.native="CatCode(item.code_path)">查看源码</Button>
      </footer>
    </div>
    <Page class="page" :page-size="6" @on-change="Pagechange" />
  </div>
</template>
<script>
// import { PageSizeChange } from "../components/NetWork/request";
import moment from 'moment'
export default {
  name: "demo",
  data() {
    return {
      demoList: [
        {
          video_path:require('../assets/images1/Document - Google Chrome.mp4'),
          video_pic:require('../assets/images1/a.png'),
          content:'炫酷数字特效',
          code_path:'http://127.0.0.1:5500/%E6%95%B0%E5%AD%97%E7%89%B9%E6%95%88.html'
        }
        ],
      index: 1
    };
  },
    filters:{
      dateFilter(val) {
         return moment(val).format('YYYY-MM-DD HH:mm:ss')
      }
    },
  mounted() {
    this.getPage(this.index);
  },
  methods: {
    getPage() {
      this.$store.commit('LoadingTitleChange', {isshow: true, title: '正在加载案例内容,请稍等...'})
    },
                          //打开案例新窗口
    CatCode(path) {
      window.open(path);
    },
    Pagechange() {
      this.getPage();
    }
  }
};
</script>
<style lang="scss" scoped>
#demo {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding: 3rem 0;
  .demoItem {
    width: 30%;
    margin: 1rem;
    // padding: 0.8rem;
    height: 22rem;
    background: rgb(34, 34, 34,.8);
    border-radius: 0.5rem;
    box-shadow:0 0 3px #333;
    position: relative;
    color: #f2f2f2;
    #video {
      border-radius: 0.5rem;
      position: relative;
      width: 100%;
      height: 66%;
      outline: none;
      z-index: 2;
    }
    footer {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0.4rem;
      p {
        font-size: 12px;
      }
      button {
        position: relative;
        z-index: 5;
        flex:1;
      }
      span {
        color:lightgreen;
      }
    }
  }
  @media screen and(max-width: 955px) {
    .demoItem {
      width: 45%;
      height: 18rem;
    }
  }
  @media screen and(max-width: 568px) {
    .demoItem {
      width: 100%;
      height: 25rem;
    }
  }
  .page {
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
  }
}
</style>