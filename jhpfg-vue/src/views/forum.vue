<template>
  <div id="forum">
    <i class="el-icon-s-comment index-icon" slot="icon"></i>
    <h4 class="index-boxTitle" slot="boxTitle">论坛</h4>
    <div id="forumList">
      <el-button round type="primary" @click="" class="toList"
        >我要发布</el-button
      >
      <el-input placeholder="请输入搜索内容" v-model="searchValue" size="small" class="searchInput">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-tabs value="all" id="forumFilter">
        <el-tab-pane label="全部帖子" name="all">
          <forum-box :forumList="forumList"></forum-box>
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
  </div>
</template>

<script>
import ForumBox from "../components/forumBox.vue";

export default {
  components: { ForumBox },
  data() {
    return {
      searchValue:"", //搜索内容
      forumList:[
        {
          forumid:1,
          title:"hhh",
          author:"发布者",
          createTime:"2021.06.07",
          zone:"我要提问"
        },
        {
          forumid:1,
          title:"hhh",
          author:"发布者",
          createTime:"2021.06.07",
          zone:"我要提问"
        },
        {
          forumid:1,
          title:"hhh",
          author:"发布者",
          createTime:"2021.06.07",
          zone:"我要提问"
        },
        {
          forumid:1,
          title:"hhh",
          author:"发布者",
          createTime:"2021.06.07",
          zone:"我要提问"
        },
        {
          forumid:1,
          title:"hhh",
          author:"发布者",
          createTime:"2021.06.07",
          zone:"我要提问"
        },{
          forumid:1,
          title:"hhh",
          author:"发布者",
          createTime:"2021.06.07",
          zone:"我要提问"
        },{
          forumid:1,
          title:"hhh",
          author:"发布者",
          createTime:"2021.06.07",
          zone:"我要提问"
        },{
          forumid:1,
          title:"hhh",
          author:"发布者",
          createTime:"2021.06.07",
          zone:"我要提问"
        }
      ], //帖子列表
    }
  },
  methods:{

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
</style>