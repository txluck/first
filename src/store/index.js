import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isshow:false,
    fontColor: false,
    Color:'#333',
    LoadingShow: false,
    LoadingTitle:'正在加载请稍后...',
    baseURL:'http://localhost:8080',
    username:'大白菜',
    usernum:null,
    password:null
    },
  mutations: {
    updateShow(state,data) {
      state.isshow = data
    },
    updatefont(state, data) {       
      state.fontColor = data
      data ? state.Color = '#fff': state.Color = '#333'
    },
    LoadingTitleChange(state, data) {
      state.LoadingTitle = data.title;
      state.LoadingShow = data.isshow;
      setTimeout(()=>{
        state.LoadingShow = !data.isshow;
       
      },1500)
    },
    changeuser(state,data){
         state.usernum =data.usernum ;
         state.password =data.password;
    }
  }
})

