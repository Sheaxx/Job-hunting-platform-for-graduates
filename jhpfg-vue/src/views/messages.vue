<template>
  <div id="messages">
    <i
      class="el-icon-bell index-icon"
      slot="icon"
    ></i>
    <h4
      class="index-boxTitle"
      slot="boxTitle"
    >消息列表</h4>
    <div id="messageBox">
      <div class="leftBox">
        <div class="header">近期消息</div>
        <ul class="chatList">
          <li
            class="chatItem"
            v-for="(item,index) in list"
            :key="item.username"
            @click="openChat(index)"
          >
            <img
              :src="item.avatar"
              alt="联系人头像"
            >
            <h5 class="username">{{item.username}}</h5>
            <!-- <p class="msgOmitted">{{item.newest}}</p> -->
            <!-- <b>1</b> -->
          </li>
        </ul>
      </div>
      <div class="rightBox">
        <div class="header">
          <h5>{{currentUser}}</h5>
        </div>
        <div class="chatBox">
          <div
            class="message"
            v-for="item in currentMessages"
            :key="item.id"
          >
            <p>{{item.content}}<br><span>{{item.time}}</span></p>
          </div>
        </div>
        <div class="chatInput">
          <el-input v-model="value">
            <el-button
              slot="append"
              icon="el-icon-s-promotion"
              @click="send"
            ></el-button>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getNowTime from "../utils/date";

export default {
  data() {
    return {
      list: [], //用户列表显示最新消息内容
      currentUser: "", //当前打开的聊天框对方用户名
      currentMessages: [], //当前聊天记录
      total: [], //与我有关的所有聊天记录
      value: "", //输入框的内容
    };
  },
  methods: {
    //打开私聊窗口
    openChat(index) {
      this.currentUser = this.list[index].username;
      this.currentMessages = [];
      //切换左侧用户列表样式
      let lis = document.getElementsByClassName("chatItem");
      let currentActive = document.getElementsByClassName("active")[0];
      lis[index].classList.add("active");
      currentActive.classList.remove("active");
      //从total中挑聊天记录
      for (let i = 0; i < this.total.length; i++) {
        if (
          this.total[i].sender == "哈哈" ||
          this.total[i].receiver == "哈哈"
        ) {
          let obj = Object.assign({}, this.total[i]);
          this.currentMessages.push(obj);
        }
      }
    },
    //发送消息
    send() {
      let that = this;
      new Promise((resolve, reject) => {
        let obj = {
          sender: window.localStorage.getItem("username"),
          receiver: this.currentUser,
          content: this.value,
          time: getNowTime(),
        };
        this.currentMessages.push(obj);
        this.value = "";
        resolve(obj);
      }).then((obj) => {
        let newMsgList = document.getElementsByClassName("message");
        let newLi = newMsgList[newMsgList.length - 1];
        newLi.classList.add("my_message");
        this.$socket.emit("send", obj);
        let users = window.localStorage.getItem("chatList");
        users = users.split(",");
        if (users.indexOf(this.currentUser) == -1) {
          users.push(this.currentUser);
          window.localStorage.setItem("chatList", users.join(","));
        }
      });
    },
  },
  beforeMount() {
    //从total中挑聊天记录
    for (let i = 0; i < this.total.length; i++) {
      if (
        this.total[i].sender == this.list[0].username ||
        this.total[i].receiver == this.list[0].username
      ) {
        let obj = Object.assign({}, this.total[i]);
        this.currentMessages.push(obj);
      }
    }
  },
  created() {
    let that = this;
    new Promise((resolve, reject) => {
      let users = window.localStorage.getItem("chatList");
      users = users.split(",");
      for (let item in users) {
        that.$ajax.get("/message/getAvatar/" + users[item]).then((res) => {
          that.list.push({ username: users[item], avatar: res.data });
        });
      }
      resolve();
    }).then(() => {
      that.$ajax
        .get("/message/getRecords/" + window.localStorage.getItem("username"))
        .then((res) => {
          console.log(that.list);
          for (let item in res.data) {
            if (
              res.data[item].sender == that.list[0].username ||
              res.data[item].receiver == that.list[0].username
            ) {
              that.currentMessages.push(res.data[item]);
            }
          }
          new Promise((resolve, reject) => {
            let li = document.getElementsByClassName("chatItem")[0];
            li.classList.add("active");
            that.currentUser = that.list[0].username;
            resolve();
          }).then((res) => {
            //区分自己发送和接收的消息
            let messages = document.getElementsByClassName("message");
            for (let i = 0; i < that.currentMessages.length; i++) {
              if (that.currentMessages[i].sender == window.localStorage.getItem("username")) {
                messages[i].classList.add("my_message");
              } else {
                messages[i].classList.add("other_message");
              }
            }
          });
        });
    });
  },
  sockets: {
    /* 监听私聊事件 */
    receive: function (data) {
      new Promise((resolve, reject) => {
        this.currentMessages.push(data);
        resolve();
      }).then(() => {
        let newMsgList = document.getElementsByClassName("message");
        let newLi = newMsgList[newMsgList.length - 1];
        newLi.classList.add("other_message");
      });
    },
  },
};
</script>

<style>
#messageBox {
  width: 80vw;
  height: 76vh;
  clear: both;
  position: relative;
  top: 2vh;
  display: flex;
  margin: 0 auto;
}
#messages .leftBox {
  position: relative;
  flex: 30%;
}
#messages .rightBox {
  position: relative;
  flex: 70%;
  background: #f8f6f5;
}
/* 头部 */
#messages .header {
  width: 94%;
  height: 7%;
  padding: 0 3%;
  background: #fff;
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.07);
  font-size: 0.9rem;
}
/* 左侧用户列表 */
#messages .chatList {
  position: relative;
  overflow-y: auto;
  height: 100%;
}
#messages .chatItem {
  position: relative;
  width: 94%;
  display: flex;
  align-items: center;
  padding: 3%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
  cursor: pointer;
}
#messages .chatItem img {
  width: 45px;
  height: 45px;
}
#messages .chatItem .username {
  position: absolute;
  width: 70%;
  height: 1em;
  top: 20px;
  left: 70px;
}
#messages .chatItem .msgOmitted {
  position: absolute;
  font-size: 0.8rem;
  color: #8e9094;
  top: 45px;
  left: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 0.8rem;
  width: 72%;
}
#messages .chatItem b {
  position: absolute;
  top: 28px;
  right: 10px;
  background: #f56c6c;
  color: #fff;
  min-width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
}
/* 被选中的对话 */
#messages .chatItem:hover {
  background: #ebebeb;
}
#messages .chatItem.active {
  background: #f3f3f3;
}
/* 右侧聊天 */
#messages .chatBox {
  position: relative;
  height: 80%;
  width: 96%;
  overflow-y: auto;
  padding: 2%;
}
#messages .message {
  position: relative;
  display: flex;
  width: 100%;
  margin: 5px 0;
}
#messages .message p {
  position: relative;
  right: 0;
  text-align: right;
  max-width: 65%;
  padding: 12px;
  background: #c8e3ee;
  border-radius: 10px;
  font-size: 0.9rem;
}
#messages .my_message p::before {
  content: "";
  position: absolute;
  top: 0;
  right: -12px;
  width: 20px;
  height: 20px;
  background: linear-gradient(
    135deg,
    #c8e3ee 0%,
    #c8e3ee 50%,
    transparent 50%,
    transparent
  );
}
#messages .message span {
  display: block;
  margin-top: 8px;
  font-size: 0.75rem;
  opacity: 0.5;
}
#messages .my_message {
  justify-content: flex-end;
}
#messages .other_message {
  justify-content: flex-start;
}
#messages .other_message p {
  background: #fff;
}
#messages .other_message p::before {
  content: "";
  position: absolute;
  top: 0;
  left: -12px;
  width: 20px;
  height: 20px;
  background: linear-gradient(
    225deg,
    #fff 0%,
    #fff 50%,
    transparent 50%,
    transparent
  );
}
</style>