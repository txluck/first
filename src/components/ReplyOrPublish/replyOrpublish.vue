<template>
                                                            <!-- 留言板中评论组件 -->
  <div class="replayOrpublish">
   <div class="compile">
         <Input v-model="value" maxlength="100" 
          show-word-limit type="textarea" 
          placeholder="你想说些什么呢..." 
          style="width: 80%;" />
          <Button 
            class="btn" 
            type="primary"
            @click="publish">发表</Button>
      </div>
        <List class="leaveContent">
          <!-- 留言 -->

          <!-- 回复弹框 -->
          <Modal
            title="回复内容"
            v-model="isshow"
            @on-ok="handelInputContent"
            :mask-closable="false">
            <Input v-model="replyValue" type="textarea" placeholder="输入回复内容..." />
          </Modal>

          <!-- 评论列表 -->
            <div v-for="(item, index) in messageData" :key="index">
                <ListItem ref="contentItem" class="contentItem" :style="{color: Color}">
                <div class="head"> 
                    <p v-show="true" class="number_id">{{index+1}} 楼</p>
                    <img src="../../assets/images/touxiang.jpg"> 
                    <a>{{item.name}}<span v-show="item.username === '111111'" class="chief">站长</span></a>
                </div>
              <span>{{item.value}}</span>
                  <p>{{item.date | dateFilter}}</p>
                  <p @click="SetReplyInfo()" class="reply">回复</p>
              </ListItem>
            <!-- 回复 -->
              <!-- <div class="replyContent" v-for="(replyitem, j) in item.replyAccess" :key="j">
                  <ListItem :style="{background: bgcolor}" ref="replyItem" class="replyItem" >
                      <p :style="{color: Color}" class="number_id">{{j+1}} 楼</p>
                      <p class="reply_access">
                        <p :style="{color: Color}" class="content">
                          <img :src="replyitem.user_imgsrc"> 回复<a> @{{replyitem.reply_name}}</a>: {{replyitem.content}}</p>
                      </p>
                      <p class="reply_name">{{replyitem.name}}</p>
                      <p :style="{color: Color}" class="reply_time">
                        {{replyitem.datetime | dateFilter}}
                        <span v-show="replyitem.username === '972761675'" class="chief">站长</span>
                      </p>
                      <p @click="SetPaddingReply(replyitem, item,  j)" class="reply">回复</p>
                  </ListItem>
              </div> -->
            </div>
        </List>
  </div>
</template>

<script>
import moment from 'moment'
  export default {
    name:'replyOrpublish',
    props:{
    },
    data () {
      return {
          value:'',
          isshow:false,
          // replyInfo:{},
          replyValue:'',
          arrMesasgeList:[],
          obj:{},
          messageData: [{
            name:'大白菜',
            username:this.$store.state.usernum,
            value:'1234',
            
          }]
      };
    },
    filters:{
      dateFilter(val) {
         return moment(val).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    computed:{
      Color() {
        return this.$store.state.Color
      },
      bgcolor() {
        return this.$store.state.Color == '#333' ? "#f2f2f2" : 'transparent'
      }
    },
  
    methods: {
        SetReplyInfo() {
          this.isshow = true
        },

       handelInputContent() {
          const token = this.$store.state.username
          if(!token) return this.$Message.error('您还没有登陆呢！')
          if(!this.replyValue) return this.$Message.error('内容不能为空呀,请输入内容！')
          // this.replyInfo.replyValue = this.replyValue
        },
        publish() {
          if(this.$store.state.usernum) {
             /* 如果 value不为空的话  */
          if(this.value) {
            this.messageData.push({
              name:'哈哈',
              username:this.$store.state.usernum,
            
              value:this.value,
            })
          }
          /* 如果为空我们就不发起请求 给用户提示不能为空 */
          else {
            this.$Message.error("小主信息不能为空哦,(ノへ￣、)！")
          }
          } else {
           this.$Message.error("请先去登陆再来留言哦,(ノへ￣、)！")
          }
        },
    },
  }

</script>
<style lang='scss' scoped>
  .replayOrpublish {
        .btn {
        margin:1rem;
        z-index: 5;
        position: relative;
    }
      .compile {
      margin:2rem;
      position: relative;
      z-index: 5;
    }
    .leaveContent {
      position: relative;
      z-index: 5;
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }
      .contentItem {
        padding:0.8rem 1rem 0.2rem 1rem;
        position: relative;
        border-bottom: 1px solid #bbb;
        p,img,a{
          position: absolute;font-size: 0.8rem;
        }
        a{
          color: red;
          left: 4rem;
          top: .6rem;      
          .chief {
            color: orange;
            white-space: nowrap;
            font-weight: bold;
            margin-left: .5rem;
          }  
        }
       span {
          margin-top: 1rem;
          padding:0 3rem;
          text-align: left;
          font-size: 0.8rem;
          padding-top: 0.5rem;
       }
        img {
          top: 0.5rem;left: 1.5rem;
        }
        p {
          top: 0.5rem;right: 1rem;;
        }
        p.number_id{
        right:10rem;
      }
      }
       p.reply {
          cursor: pointer;
          top: 2.3rem;
          color: rgb(0, 132, 255);
        }
        p.reply:hover {
          color: blue;
        }
        .replyContent {  
          padding-left:50px;
          font-size: 0.8rem;
          .replyItem {
            border-bottom: 1px solid #eee; 
            background: #fffefe;
            border-left: 2.5px solid #eee;
            position: relative;
            display: flex;
            flex-wrap: nowrap;
            align-items: flex-start;
            img {
                left: -2rem;
            }
          .reply {
            position: absolute;
            width: 2rem;
            white-space: nowrap;
            right: 0.8rem;
          }
          .reply_access {
            margin-top: 1rem;
            white-space: nowrap;
          }
          p.content {
            padding-left: 0.5rem;
            padding-right: 3rem;
            text-align: left;
            color: #333;
          }
          p.reply_name {
            position: absolute;
            left: 2.8rem;
            font-size: 0.8rem;
            color: red;
          }
          p.reply_time {
            position: absolute;
            left: 9rem;
            font-size: 0.8rem;
            color: #333;
            .chief {
              color: orange;
              white-space: nowrap;
              font-weight: bold;
              margin-left: .5rem;
          }
          }
          p.number_id {
            position: absolute;
            right: 1rem;
            top: 1rem;
            color: #333;
          }
          }
        }
    }
  }
</style>