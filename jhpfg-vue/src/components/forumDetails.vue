<template>
  <div id="forumDetails">
    <el-button round @click="toList" class="toList">返回</el-button>
    <div id="postContent">
      <div class="topBar">
        <el-tag>{{ details.zone }}</el-tag>
        <h5>{{ details.title }}</h5>
        <h6>发布于：{{ details.createTime }}</h6>
      </div>
      <p class="content">{{ details.content }}</p>
      <el-divider><i class="el-icon-chat-line-round"></i></el-divider>
      <el-timeline>
        <el-timeline-item
          v-for="item in commentList"
          :key="item.commentid"
          :timestamp="item.time"
          placement="top"
        >
          <el-card>
            <h4>{{ item.content }}</h4>
            <p>{{ item.author }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <el-input
        type="textarea"
        rows="5"
        resize="none"
        class="commentEdit"
        v-model="commentValue"
      ></el-input>
      <div>
        <el-button type="primary" class="addComment" @click="addComment"
          >发布评论</el-button
        >
      </div>
    </div>
    <div class="rightBar"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentValue:"",//评论输入框的值
    };
  },
  props: {
    details: Object,
    commentList: Array,
  },
  methods: {
    //返回列表
    toList() {
      this.$emit("toList");
    },
    //点击发布评论按钮
    addComment() {
      this.$message.success("评论成功");
      this.commentValue = "";
      this.$emit("addComment");
    },
  },
};
</script>

<style>
#forumDetails {
  margin-top: 1%;
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
}
#forumDetails .el-button {
  float: right;
  margin-right: 3%;
}
#postContent {
  width: 70%;
  height: 550px;
  overflow-y: auto;
  position: relative;
  top: 20px;
}
#forumDetails .topBar {
  clear: both;
  width: 100%;
  height: 3vh;
  line-height: 3vh;
  position: relative;
  z-index: 1;
}
#forumDetails .el-tag {
  float: left;
  margin-right: 1vw;
}
#forumDetails .topBar h5 {
  font-size: 1.4rem;
}
#forumDetails .topBar h6 {
  margin-top: 1vh;
  width: 100%;
  font-size: 0.8rem;
  color: #8e9094;
}
#forumDetails .content {
  width: 70%;
  margin-top: 7vh;
  margin-bottom: 9vh;
  line-height: 1.6rem;
}
#forumDetails .rightBar {
  position: absolute;
  width: 25%;
  height: 70vh;
  top: 9vh;
  left: 62vw;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
}
#forumDetails .el-divider,
#forumDetails .el-timeline {
  width: 98%;
}
#forumDetails .el-timeline p {
  margin-top: 1%;
  font-size: 0.8rem;
  color: #8e9094;
}
#forumDetails .commentEdit {
  float: left;
  width: 98%;
  margin-bottom: 15vh;
}
#forumDetails .addComment {
  margin-top: -100px;
}
</style>