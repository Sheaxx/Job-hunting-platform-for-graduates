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
    <forum-details
      v-else
      :details="details"
      :commentList="commentList"
      @toList="toList"
      @addComment="addComment"
    ></forum-details>
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
import ForumDetails from "../components/forumDetails.vue";

export default {
  components: { ForumBox, ForumDetails },
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
      commentList: [
        //评论列表
        {
          commentid: 1,
          content: "更新 Github 模板",
          author: "王小虎",
          time: "2018/4/3 20:46",
        },
      ],
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
    //发布评论
    addComment() {

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
#forum {
  position: relative;
}
#forum .searchInput {
  position: absolute;
  width: 35%;
  top: 1vh;
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