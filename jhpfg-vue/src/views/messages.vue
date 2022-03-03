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
          <li class="chatItem active">
            <img
              src="../assets/image/avatar.png"
              alt="联系人头像"
            >
            <h5 class="username">哈哈</h5>
            <p class="msgOmitted">我说嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻gggggggggggggg嘻嘻嘻</p>
            <b>1</b>
          </li>
          <li class="chatItem">
            <img
              src="../assets/image/avatar.png"
              alt="联系人头像"
            >
            <h5 class="username">哈哈</h5>
            <p class="msgOmitted">我说嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻gggggggggggggg嘻嘻嘻</p>
            <b>1</b>
          </li>
        </ul>
      </div>
      <div class="rightBox">
        <div class="header">
          <h5>哈哈</h5>
        </div>
        <div class="chatBox">
          <div class="message my_message">
            <p>Hig gggggggggggggggg gggggggggggggggg gggggggggggggggggggggggggggggg<br><span>12:15</span></p>
          </div>
          <div class="message other_message">
            <p>Hi<br><span>12:15</span></p>
          </div>
        </div>
        <div class="chatInput">
          <el-input
            v-model="searchValue"
            class="searchInput"
          >
            <el-button
              slot="append"
              icon="el-icon-s-promotion"
            ></el-button>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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