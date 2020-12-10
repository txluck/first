<template>
                                    <!-- 留言板组件 -->
  <div id="message">
        <marquee style="color:orange;" direction="left">
          可以给博主提点建议他来的时候就可以看见~~
        </marquee>
        <replyOrpublish/>
        <Page class="page" :page-size="10"  :total="count" show-total />
  </div>
</template>

<script>
import replyOrpublish from '../components/ReplyOrPublish/replyOrpublish'
  export default {
    name:'leaveMessage',
    data () {
      return {
          count:0,
      };
    },
    mounted() {
      // this.Pagechange(1)
    },
    components:{ replyOrpublish },
    methods: {

    }
  }
</script>
<style lang="scss" scope>
#message {
    width: 85%;
    height: 100%;
    margin: 0 auto;
    text-align: center;
    padding-top:2rem;
    .page {
      margin:2rem 0;
      position: relative;
      z-index: 99;
    }
}
</style>