<template>
  <div id="forumDetails">
    <el-button
      round
      @click="toList"
      class="toList"
    >返回</el-button>
    <el-link
      icon="el-icon-delete"
      class="delete"
      @click="openDelete"
      v-if="showDelete"
    >删除</el-link>
    <div id="postContent">
      <div class="topBar">
        <el-tag>{{ showZone(details.zone) }}</el-tag>
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
        <el-button
          type="primary"
          class="addComment"
          @click="addComment"
        >发布评论</el-button>
      </div>
    </div>
    <div class="rightBar">
      <img
        :src="userInfo.avatar"
        alt="用户头像"
        class="avatar"
      />
      <p class="username">{{ userInfo.username }}</p>
      <h6 class="role">{{showRole(userInfo.role)}}</h6>
      <ul class="postList">
        <li
          v-for="item in postList"
          :key="item.id"
          @click="otherPost(item.id)"
        ><i class="el-icon-s-comment"></i>{{item.title}}</li>
      </ul>
    </div>
    <div
      class="deleteBox"
      v-if="isOpenDelete"
    >
      <div class="askBox">
        <i class="el-icon-delete-solid"></i>
        <p>将删除该帖子，是否继续？</p>
        <el-button
          type="primary"
          plain
          @click="deletePost"
        >确定</el-button>
        <el-button
          plain
          @click="cancelDelete"
        >取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      isOpenDelete: false, //是否打开删除帖子窗口，默认为否
      commentValue: "", //评论输入框的值
    };
  },
  props: {
    details: Object,
    commentList: Array,
    showDelete: Boolean, //是否展示删除选项
    userInfo: Object,
    postList: Array,
  },
  methods: {
    //根据zone显示文字
    showZone(zone) {
      switch (zone) {
        case 1:
          return "我要提问";
        case 2:
          return "笔试经验";
        case 3:
          return "面试经验";
        case 4:
          return "工作分享";
        case 5:
          return "企业招聘";
      }
    },
    //身份显示
    showRole(role) {
      switch (role) {
        case 0:
          return "学生";
        case 1:
          return "企业";
        case 2:
          return "学校";
      }
    },
    //返回列表
    toList() {
      this.$emit("toList");
    },
    //点击删除按钮
    openDelete() {
      this.isOpenDelete = true;
      document.documentElement.style.overflow = "hidden";
    },
    //确定删除
    deletePost() {
      this.$ajax.post("/forum/deletePost/" + this.details.id).then((res) => {
        this.isOpenDelete = false;
        document.documentElement.style.overflow = "auto";
        this.toList();
        this.$message.success("删除成功");
      });
    },
    //取消删除
    cancelDelete() {
      this.isOpenDelete = false;
      document.documentElement.style.overflow = "auto";
    },
    //点击发布评论按钮
    addComment() {
      if (!this.commentValue) {
        this.$message.error("评论内容不得为空");
        return;
      }
      let obj = {
        content: this.commentValue,
        postid: this.details.id,
        author: window.localStorage.getItem("username"),
      };
      let that = this;
      this.$ajax
        .post("/forum/addComment", qs.stringify(obj), {
          "content-type": "application/x-www-form-urlencoded",
        })
        .then(() => {
          that.$emit("refresh", that.details.id);
          that.$message.success("评论成功");
          that.commentValue = "";
        });
    },
    //点击其他帖子
    otherPost(id) {
      let that = this;
      this.$ajax.get("/forum/getPostById/" + id).then((res) => {
        that.details = res.data.post;
        that.commentList = res.data.commentList;
        if (that.details.author == window.localStorage.getItem("username")) {
          that.showDelete = true;
        } else {
          that.showDelete = false;
        }
        that.$ajax.get("/user/getUser/" + that.details.author).then((res) => {
          that.userInfo = res.data;
          that.$ajax
            .get("/forum/getPostByUsername/" + that.userInfo.username)
            .then((res) => {
              that.postList = res.data;
            });
        });
      });
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
#forumDetails .delete {
  float: right;
  line-height: 5vh;
  margin-right: 2vw;
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
  width: 95%;
  margin-top: 7vh;
  margin-bottom: 9vh;
  line-height: 1.6rem;
  white-space: pre-wrap;
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
/* 用户信息 */
#forumDetails .rightBar {
  position: absolute;
  width: 25%;
  height: 65vh;
  top: 9vh;
  left: 62vw;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
}
#forumDetails .avatar,
#forumDetails .username,
#forumDetails .role,
#forumDetails .postList {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
}
#forumDetails .avatar {
  width: 140px;
  height: 140px;
  top: 18vh;
}
#forumDetails .username {
  top: 31vh;
  font-size: 1.1rem;
  letter-spacing: 1px;
}
#forumDetails .role {
  top: 34vh;
  color: #75777a;
  font-size: 0.85rem;
}
#forumDetails .postList {
  top: 50vh;
  height: 20vh;
  width: 70%;
}
#forumDetails .postList i {
  margin-right: 10px;
  color: #99bddf;
}
#forumDetails .postList li {
  margin-bottom: 8px;
  text-decoration: underline;
}
#forumDetails .postList li:hover {
  color: #99bddf;
  cursor: pointer;
}
/* 删除帖子提示窗口 */
#forumDetails .deleteBox {
  position: absolute;
  z-index: 9;
  width: 100vw;
  height: 100vh;
  top: -16.8vh;
  left: -10vw;
  background: rgba(0, 0, 0, 0.3);
}
#forumDetails .deleteBox .askBox {
  background: #fff;
  width: 38%;
  height: 20%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#forumDetails .deleteBox i {
  margin: 7% 1% auto 15%;
  font-size: 1.5rem;
  float: left;
}
#forumDetails .deleteBox p {
  margin: 8% auto 4% 18%;
}
</style>