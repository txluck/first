<template>
  <div v-show="$route.path !== '/home'" id="Footer">
    <div class="talk">
      <img class="wx" src="../assets/images/wx.jpg" alt="">
       <p>&copy; Victory.cn .</p>
    </div>
  </div>
</template>
<script>

  export default {
    name:'down',
    data () {
      return {
          Text:''
      };
    },
  }
</script>
<style lang="scss" scoped>
#Footer {
  background: linear-gradient(#333, #456);
  padding: 2rem 0;
  width: 100vw;
  margin-top: 2rem;
  z-index: 1;
  .talk {
    margin:0 1rem;
    color: #f2f2f2;
    font-size: 11px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    img.wx{
      width: 5rem;
      margin-right: 1rem;
    }
    p {
      img {
        margin-left: 1rem;
      }
    }
    a {
      color: #f2f2f2;
    }
  }
}
</style>