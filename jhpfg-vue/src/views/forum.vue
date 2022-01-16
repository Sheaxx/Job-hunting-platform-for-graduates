<template>
  <div id="forum">
    <i class="el-icon-s-comment index-icon" slot="icon"></i>
    <h4 class="index-boxTitle" slot="boxTitle">论坛</h4>
    <div id="forumList" v-if="!isDetails">
      <el-button round type="primary" @click="" class="addPost"
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
        <el-tab-pane label="我要提问" name="question">配置管理</el-tab-pane>
        <el-tab-pane label="笔试经验" name="writtenTest">角色管理</el-tab-pane>
        <el-tab-pane label="面试经验" name="interview"
          >定时任务补偿</el-tab-pane
        >
        <el-tab-pane label="工作分享" name="jobSharing">角色管理</el-tab-pane>
        <el-tab-pane label="企业招聘" name="recruitment">角色管理</el-tab-pane>
      </el-tabs>
    </div>
    <div id="forumDetailsBox" v-else>
      <el-button round @click="" class="toList">返回</el-button>
      <div class="topBar">
        <el-tag>{{ details.zone }}</el-tag>
        <h5>{{ details.title }}</h5>
        <h6>发布于：{{ details.createTime }}</h6>
      </div>
      <p class="content">{{ details.content }}</p>
      <div class="rightBar"></div>
      <el-divider><i class="el-icon-chat-line-round"></i></el-divider>
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/2 20:46</p>
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
  </div>
</template>

<script>
import ForumBox from "../components/forumBox.vue";

export default {
  components: { ForumBox },
  data() {
    return {
      isDetails: false, //是否是详情页，默认为否
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
    };
  },
  methods: {
    //点击查看详情
    toDetails(postid) {
      this.isDetails = true;
    },
  },
};
</script>

<style>
#forum .searchInput {
  position: absolute;
  width: 35%;
  top: 4vh;
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
  background: royalblue;
}
#forumDetailsBox .rightBar {
  position: absolute;
  width: 25%;
  height: 70vh;
  background: red;
  top: 16vh;
  left: 65vw;
}
#forumDetailsBox .el-divider {
  width: 70%;
}
#forumDetailsBox .el-timeline {
  width: 70%;
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

</style>