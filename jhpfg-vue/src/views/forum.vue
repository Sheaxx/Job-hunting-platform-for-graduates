<template>
  <div id="forum">
    <i class="el-icon-chat-dot-square index-icon" slot="icon"></i>
    <h4 class="index-boxTitle" slot="boxTitle">论坛</h4>
    <div id="forumList" v-if="!isDetails">
      <el-button round type="primary" @click="openAddPost" class="addPost"
        >我要发布</el-button
      >
      <el-input
        placeholder="请输入搜索内容"
        v-model="searchValue"
        size="small"
        class="searchInput"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-tabs value="all" id="forumFilter">
        <el-tab-pane label="全部帖子" name="all">
          <forum-box :forumList="forumList" @itemClick="toDetails"></forum-box>
        </el-tab-pane>
        <el-tab-pane label="我要提问" name="question">
          <forum-box :forumList="forumList" @itemClick="toDetails"></forum-box>
        </el-tab-pane>
        <el-tab-pane label="笔试经验" name="writtenTest">
          <forum-box :forumList="forumList" @itemClick="toDetails"></forum-box>
        </el-tab-pane>
        <el-tab-pane label="面试经验" name="interview">
          <forum-box :forumList="forumList" @itemClick="toDetails"></forum-box>
        </el-tab-pane>
        <el-tab-pane label="工作分享" name="jobSharing">
          <forum-box :forumList="forumList" @itemClick="toDetails"></forum-box>
        </el-tab-pane>
        <el-tab-pane label="企业招聘" name="recruitment">
          <forum-box :forumList="forumList" @itemClick="toDetails"></forum-box>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div id="forumDetailsBox" v-else>
      <el-button round @click="toList" class="toList">返回</el-button>
      <div class="topBar">
        <el-tag>{{ details.zone }}</el-tag>
        <h5>{{ details.title }}</h5>
        <h6>发布于：{{ details.createTime }}</h6>
      </div>
      <p class="content">{{ details.content }}</p>
      <div class="rightBar"></div>
      <el-divider><i class="el-icon-chat-line-round"></i></el-divider>
      <el-timeline>
        <el-timeline-item v-for="item in commentList" :key="item.commentid" :timestamp="item.time" placement="top">
          <el-card>
            <h4>{{item.content}}</h4>
            <p>{{item.author}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <el-input
        type="textarea"
        rows="5"
        resize="none"
        class="commentEdit"
      ></el-input>
      <div>
        <el-button type="primary" class="addComment" @click="addComment"
          >发布评论</el-button
        >
      </div>
      <div class="block"></div>
    </div>
    <div id="addPost" v-if="isAddPost">
      <div class="addBox">
        <el-form ref="editPost" :model="editPost" label-width="40px">
          <el-form-item label="标题">
            <el-input v-model="editPost.title"></el-input>
          </el-form-item>
          <el-form-item label="板块">
            <el-select v-model="editPost.zone">
              <el-option label="我要提问" value="1"></el-option>
              <el-option label="笔试经验" value="2"></el-option>
              <el-option label="面试经验" value="3"></el-option>
              <el-option label="工作分享" value="4"></el-option>
              <el-option label="企业招聘" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              type="textarea"
              v-model="editPost.content"
              resize="none"
              :rows="15"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addPost">立即发布</el-button>
            <el-button @click="cancelAddPost">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import ForumBox from "../components/forumBox.vue";

export default {
  components: { ForumBox },
  data() {
    return {
      isDetails: false, //是否是详情页，默认为否
      isAddPost: false, //是否打开发布帖子窗口，默认为否
      searchValue: "", //搜索内容
      forumList: [
        {
          postid: 1,
          title: "hhh",
          author: "发布者",
          createTime: "2021.06.07",
          zone: "我要提问",
        },
        {
          postid: 2,
          title: "hhh",
          author: "发布者",
          createTime: "2021.06.07",
          zone: "我要提问",
        },
        {
          postid: 3,
          title: "hhh",
          author: "发布者",
          createTime: "2021.06.07",
          zone: "我要提问",
        },
        {
          postid: 4,
          title: "hhh",
          author: "发布者",
          createTime: "2021.06.07",
          zone: "我要提问",
        },
        {
          postid: 5,
          title: "hhh",
          author: "发布者",
          createTime: "2021.06.07",
          zone: "我要提问",
        },
        {
          postid: 6,
          title: "hhh",
          author: "发布者",
          createTime: "2021.06.07",
          zone: "我要提问",
        },
        {
          postid: 7,
          title: "hhh",
          author: "发布者",
          createTime: "2021.06.07",
          zone: "我要提问",
        },
        {
          postid: 8,
          title: "hhh",
          author: "发布者",
          createTime: "2021.06.07",
          zone: "我要提问",
        },
      ], //帖子列表
      details: {
        //某个帖子的详情
        postid: 1,
        title: "hhh",
        content: "hahaha",
        author: "发布者",
        createTime: "2021.04.07",
        zone: "我要提问",
      },
      editPost: {
        //添加或修改帖子
        postid: "",
        title: "",
        content: "",
        author: "发布者",
        createTime: "2021.04.07",
        zone: "",
      },
      commentList:[
        //评论列表
        {
          commentid:1,
          content:"更新 Github 模板",
          author:"王小虎",
          time:"2018/4/3 20:46"
        }
      ]
    };
  },
  methods: {
    //点击查看详情
    toDetails(postid) {
      this.isDetails = true;
    },
    //帖子详情页返回列表
    toList() {
      this.isDetails = false;
    },
    //点击我要发布按钮
    openAddPost() {
      this.isAddPost = true;
      document.documentElement.style.overflow = "hidden";
    },
    //确定发布帖子
    addPost() {
      this.isAddPost = false;
      document.documentElement.style.overflow = "auto";
    },
    //取消发布帖子
    cancelAddPost() {
      this.isAddPost = false;
      document.documentElement.style.overflow = "auto";
    },
  },
};
</script>

<style>
#forum .searchInput {
  position: absolute;
  width: 35%;
  top: 7vh;
  left: 45vw;
}
#forum .el-tabs.el-tabs--top {
  float: left;
  width: 100%;
}
#forum .addPost,
#forum .toList {
  float: right;
}
#forumDetailsBox .topBar {
  clear: both;
  width: 100%;
  height: 4vh;
  line-height: 4vh;
}
#forumDetailsBox .el-tag {
  float: left;
  margin-right: 1vw;
}
#forumDetailsBox h5 {
  font-size: 1.5rem;
}
#forumDetailsBox h6 {
  margin-top: 1vh;
  width: 100%;
  font-size: 0.8rem;
  color: #8e9094;
}
#forumDetailsBox .content {
  width: 70%;
  margin-top: 7vh;
  line-height: 1.6rem;
  min-height: 60vh;
}
#forumDetailsBox .rightBar {
  position: absolute;
  width: 25%;
  height: 70vh;
  top: 16vh;
  left: 65vw;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);

}
#forumDetailsBox .el-divider {
  width: 70%;
}
#forumDetailsBox .el-timeline {
  width: 70%;
}
#forumDetailsBox .el-timeline p {
  margin-top: 1%;
  font-size: 0.8rem;
  color: #8e9094;
}
#forumDetailsBox .commentEdit {
  float: left;
  width: 70%;
  margin-bottom: 10vh;
}
#forumDetailsBox .addComment {
  margin-top: 76px;
  margin-left: 30px;
}
#addPost {
  position: absolute;
  z-index: 9;
  width: 100vw;
  height: 100vh;
  top: -8.5vh;
  left: -7vw;
  background: rgba(0, 0, 0, 0.3);
}
#addPost .addBox {
  background: #fff;
  width: 70%;
  height: 75%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 4% 0;
}
#addPost .el-form-item {
  width: 85%;
  margin: 0 auto 2% auto;
}
#addPost .el-form-item:last-of-type .el-button {
  float: right;
  margin-left: 2%;
}
</style>