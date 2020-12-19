<template>
                          <!-- 音乐播放器组件 -->
  <div id="music_container">
    <p><Icon type="ios-musical-notes" /> 音乐鉴赏</p>
    <span class="introduce">谁还不是个优雅不失风度的人呢，看电脑累了吧，给你推荐一首好听的音乐，闭一下眼睛听首音乐放松放松吧。</span>
    <iframe
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="0"
      class="musicBox"
      :src="music_link"
    ></iframe>
    <i @click="getMusic('prev')" class="prev_Button iconfont icon-icon-arrow-left2"></i>
    <i @click="getMusic('next')" class="next_Button iconfont icon-icon-arrow-right2"></i>
  </div>
</template>
<script>

export default {
  name: "music",
  data() {
    return {
      music_link: "https://music.163.com/outchain/player?type=2&id=1487528112&auto=1&height=66",
      music_index: 0,
      musicList:[]
    };
  },
  mounted() {
   this.$axios.get('/music.json').then(res=>{
     this.musicList = res.data.data
    //  console.log(this.musicList[0].musicid);
   })
   
  },

  methods: {
    getMusic(pn) {
      console.log(this.music_index);
        if(pn =='prev'){
          this.music_index--
          if(this.music_index < 0){
            this.music_index = 0
          }
          this.music_link = this.musicList[this.music_index].musicid
        }else{
            this.music_index++
          if(this.music_index > this.musicList.length-1){
            this.music_index = this.musicList.length-1
          }

          this.music_link = this.musicList[this.music_index].musicid
        }
     

      }
    }
  }

</script>
<style lang="scss" scoped>
#music_container {
  width: 100%;
  margin-bottom: 1rem;
  background: #fff;
  padding:.5rem;
  border: 1px solid #ccc;
  position: relative;
  font-size: 13px;
  border-radius: 8px!important;
  border-bottom-left-radius: 0!important;
  border-bottom-right-radius: 0!important;
  p {
      font-size: 14px;
      padding:0.5rem;
      border-bottom:1.5px solid lightseagreen;
  }
  .musicBox {
    height: 7.2rem;
    width: 100%;
    border-radius: 8px;
  }
  .introduce {
    display: inline-block;
    padding: 1rem 0;
  }
  i.prev_Button,i.next_Button {
    font-size: 1rem;
    margin: 0 0.5rem;
    position: absolute;
    bottom: 0.5rem;
    color: #333;
    cursor: pointer;
    font-weight: bold;
  }
  .prev_Button {
    left: 40%;
  }
  .next_Button {
    right: 40%;
  }
}
i:hover {
  color: red !important;
}
</style>