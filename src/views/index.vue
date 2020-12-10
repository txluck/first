<template>
  <div id="index" >
           <!-- 切换背景 -->
    <div v-show="!TypeChange" class="moon"></div>
    <div v-show="TypeChange"  class="night"></div>
<!-- //点击改变背景的切换操作 -->
    <light @changeBackground="changeBG"/> 
                                                       <!-- 头部组件部分 -->
     <Header 

          :class="{active:$route.name != 'home' || $store.state.isshow}" 
          class="header"/>
     <keep-alive exclude="detail,profile">
     <router-view :class="{router_content: $route.name !== 'home'}"/>
     </keep-alive>

    <Loading class="LoadingStyle" v-show="$store.state.LoadingShow"/>

     <!-- 移动端导航页面 -->
    <Tab-contorle/>

    <!-- 底部部分 -->
    <Footer v-if="!$route.path.includes('admin')"/>
  </div>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import TabContorle  from '../components/Tabcontorle'
import light from '../components/highlight/light'
import Loading from '../components/Loading/Loading'
export default {
  name: 'index',
  components:{
    Header,TabContorle,Footer,light,Loading
  },
  mounted() {
    document.onclick = (e) => {
      //点击显示移动端tab界面
      if(e.target.className=='meun iconfont icon-caidan') {
        this.$store.commit('updateShow',true)   //显示移动端导航页面
      }else if(
        e.target.className=='MeunTab' || 
        e.target.tagName.toLowerCase()=='img' || 
        e.target.className=='ivu-list-item' || 
        e.target.className == 'profile'
        ) {
        return
      } else {
        this.$store.commit('updateShow',false) //不显示移动端导航页面
      }
    }
  },
  methods:{
    //改变背景的函数
    changeBG() {
     this.$store.commit('updatefont', !this.$store.state.fontColor)//在仓库中加入改变背景的属性  值为 当前的非
    }
  },
  computed: {
    //计算属性  是否改变背景颜色
    TypeChange() {
      return this.$store.state.fontColor
    }
  }
}
</script>

<style lang="scss">
*{
  list-style: none;
}
body,html {
  width: 100%;
  height: 100%;
}
  #index {
    display: flex;
    flex-direction: column;
    .moon,.night {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: -1;
    }
    .night {
      background: url('../assets/images/night.gif') center;
    }
    .moon {
      background: url('../assets/images/light.jpg') center;
    }
    .router_content {
       animation: animate 2s;
    }
    .header{
      width: 100%;
      height: 3rem;
      position: absolute;
      top: 0;
      z-index: 999;
      transition: all 0.6s;
    }
    .active,
    .current {
      position: sticky;
      background: linear-gradient(#333, #456);
      animation: animate 1s;
    }
    @keyframes animate {
      0% { opacity: 0; transform: translateY(-50px);}
      100% { opacity: 1; transform: translateY(0);}
    }
    .LoadingStyle {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 999;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.9);
    }
  }
</style>
