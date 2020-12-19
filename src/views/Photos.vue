<template>
  <div id="about">
    <header :style="{color: Color}"> 
      <Icon type="md-ribbon"></Icon>当前位置: <router-link style="cursor:pointer" tag="span" to="/">首页</router-link> > 云相册
      </header>
        <div id="container">
          <div class="card" v-for="(item, index) in imgdata" :key="index">
            <img :src="item.imgsrc">  
            <p>{{item.content}}</p>
            <p>{{item.datatime}}</p>
          </div>
      </div>
  </div>
</template>
<script>

  export default {
    name:'about',
    data() {
      return {
        imgdata:[
          // {imgsrc:require('../assets/images1/0.png'),
          //  content:'aaaaaaaaaaa',
          //  datatime:'2020.12.3'
          //  },
          //  {imgsrc:require('../assets/images1/1.png'),
          //  content:'aaaaaaaaaaa',
          //  datatime:'2020.12.3'
          //  },
          //  {imgsrc:require('../assets/images1/2.png'),
          //  content:'aaaaaaaaaaa',
          //  datatime:'2020.12.3'
          //  },
          //  {imgsrc:require('../assets/images1/3.png'),
          //  content:'aaaaaaaaaaa',
          //  datatime:'2020.12.3'
          //  },
          //  {imgsrc:require('../assets/images1/4.jpg'),
          //  content:'aaaaaaaaaaa',
          //  datatime:'2020.12.3'
          //  },
          //  {imgsrc:require('../assets/images1/5.jpg'),
          //  content:'aaaaaaaaaaa',
          //  datatime:'2020.12.3'
          //  },
          //  {imgsrc:require('../assets/images1/6.jpg'),
          //  content:'aaaaaaaaaaa',
          //  datatime:'2020.12.3'
          //  },
          //  {imgsrc:require('../assets/images1/7.jpg'),
          //  content:'aaaaaaaaaaa',
          //  datatime:'2020.12.3'
          //  },
          //  {imgsrc:require('../assets/images1/8.jpg'),
          //  content:'aaaaaaaaaaa',
          //  datatime:'2020.12.3'
          //  },
          //  {imgsrc:require('../assets/images1/9.jpg'),
          //  content:'aaaaaaaaaaa',
          //  datatime:'2020.12.3'
          //  },
          //  {imgsrc:require('../assets/images1/10.jpg'),
          //  content:'aaaaaaaaaaa',
          //  datatime:'2020.12.3'
          //  },
          //  {imgsrc:require('../assets/images1/11.jpg'),
          //  content:'aaaaaaaaaaa',
          //  datatime:'2020.12.3'
          //  },
          //  {imgsrc:require('../assets/images1/12.jpg'),
          //  content:'aaaaaaaaaaa',
          //  datatime:'2020.12.3'
          //  },
           ],
        flag:false,
        page:1
      }
    },
    computed:{
      Color() {
        return this.$store.state.Color
      }
    },
    methods:{
       getData(){
                                                      //  请求图片的信息
         this.$axios.get('/img.json').then(res=>{
           if(res.data.status == '200'){
                // this.imgdata = res.data.data
                // console.log(this.imgdata);
                // this.imgdata.forEach(item=>{
                //   item.imgsrc = require(item.imgsrc)
                // })
                // console.log(this.imgdata);
                for(let i in res.data.data){
                  this.imgdata.push({
                    imgsrc:require('../assets/images1/'+ res.data.data[i].imgsrc),
                    content:res.data.data.content,
                    time: res.data.data.time
                  })
                }
           }
         })
       }
        
    },
    mounted() {
        this.getData()
            let timer = null;
            let that = this;
            let i=5
    window.onscroll = function () {       
        clearTimeout(timer);
        let clientHeight = document.documentElement.clientHeight;
        let scrollTop = document.documentElement.scrollTop;
        console.log(that.imgdata);
        var minHeight = 450*Math.ceil(that.imgdata.length/i);
              i++
        console.log(scrollTop, clientHeight)
        if (minHeight < clientHeight + scrollTop) {
            timer = setTimeout(function () {
                that.getData();
            }, 500)
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
#about {
  width: 90%;
  margin:2rem auto;
  position: relative;
  z-index: 5;
  transition: all 1s;
  #container {
    width: 100%;
    columns: 5;
    .card {
      width: 100%;
      background: #f2f2f2;
      overflow: hidden;
      position: relative;
      border: 1px solid #ccc;
      break-inside:avoid;
      padding: 0.6rem;
      margin-bottom: 1rem;
    img {
      max-width: 100%;
    }
    p:nth-child(2) {
      color:orange;
    }
    p:nth-child(3) {
      text-align: right;
      color: lightgreen;
    }
    p:nth-child(3)::before {
      content:'From--';
    }
  }
  }
  @media screen and (max-width: 1500px){
      #container {
        columns:4 ;
      }
  }
    @media screen and (max-width: 1200px){
      #container {
        columns:3 ;
      }
  }
    @media screen and (max-width: 900px){
      #container {
        columns:2 ;
      }
  }
  header {
    padding-bottom: 2rem;
    position: relative;
    span:hover {
      color: lightblue;
    }
  }
}
</style>