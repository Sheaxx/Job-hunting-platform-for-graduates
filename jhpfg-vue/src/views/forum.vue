<template>
  <div id="forum">
    <div
      class="forumBox"
      v-if="!isSearchList"
    >
      <i
        class="el-icon-chat-dot-square index-icon"
        slot="icon"
      ></i>
      <h4
        class="index-boxTitle"
        slot="boxTitle"
      >论坛</h4>
      <div
        id="forumList"
        v-if="!isDetails"
      >
        <el-button
          round
          type="primary"
          @click="openAddPost"
          class="addPost"
        >我要发布</el-button>
        <el-input
          placeholder="请输入搜索内容"
          v-model="searchValue"
          class="searchInput"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="search"
          ></el-button>
        </el-input>
        <el-tabs
          value="all"
          id="forumFilter"
          @tab-click="handleClick"
        >
          <el-tab-pane
            label="全部帖子"
            name="all"
          >
          </el-tab-pane>
          <el-tab-pane
            label="我要提问"
            name="question"
          >
          </el-tab-pane>
          <el-tab-pane
            label="笔试经验"
            name="writtenTest"
          >
          </el-tab-pane>
          <el-tab-pane
            label="面试经验"
            name="interview"
          >
          </el-tab-pane>
          <el-tab-pane
            label="工作分享"
            name="jobSharing"
          >
          </el-tab-pane>
          <el-tab-pane
            label="企业招聘"
            name="recruitment"
          >
          </el-tab-pane>
        </el-tabs>
        <forum-box
          :tab="tab"
          :pageSize="10"
          @itemClick="toDetails"
        ></forum-box>
      </div>
      <forum-details
        v-if="isDetails"
        :details="details"
        :commentList="commentList"
        @toList="toList"
        @refresh="toDetails"
      ></forum-details>
      <div
        id="addPost"
        v-if="isAddPost"
      >
        <div class="addBox">
          <el-form
            ref="editPost"
            :model="editPost"
            label-width="40px"
          >
            <el-form-item label="标题">
              <el-input v-model="editPost.title"></el-input>
            </el-form-item>
            <el-form-item label="板块">
              <el-select v-model="editPost.zone">
                <el-option
                  label="我要提问"
                  value="1"
                ></el-option>
                <el-option
                  label="笔试经验"
                  value="2"
                ></el-option>
                <el-option
                  label="面试经验"
                  value="3"
                ></el-option>
                <el-option
                  label="工作分享"
                  value="4"
                ></el-option>
                <el-option
                  label="企业招聘"
                  value="5"
                ></el-option>
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
              <el-button
                type="primary"
                @click="addPost"
              >立即发布</el-button>
              <el-button @click="cancelAddPost">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div
      class="searchList"
      v-if="isSearchList"
    >
      <div class="topBar">
        <span class="searchValue">“{{searchValue}}”的搜索结果</span>
        <el-button
          round
          class="toList"
          @click="isSearchList = false"
        >返回</el-button>
      </div>
      <el-table
        :data="searchList"
        stripe
        style="width: 100%"
        @row-click="tableClick"
      >
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          prop="author"
          label="发布者"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="发布时间"
          width="180"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import ForumBox from "../components/forumBox.vue";
import ForumDetails from "../components/forumDetails.vue";

export default {
  components: { ForumBox, ForumDetails },
  data() {
    return {
      isDetails: false, //是否是详情页，默认为否
      isAddPost: false, //是否打开发布帖子窗口，默认为否
      isSearchList: false, //是否是搜索结果列表，默认为否
      fromSearch: false, //是否是从搜索列表打开详情，默认为否
      tab: 0, //当前选中的tab
      searchValue: "", //搜索内容
      searchList: [], //搜索结果列表
      details: {}, //某个帖子的详情
      editPost: {
        //添加或修改帖子
        id: null,
        title: "",
        content: "",
        author: "",
        createTime: "",
        zone: "",
      },
      commentList: [], //评论列表
    };
  },
  methods: {
    //切换tab
    handleClick(tab, event) {
      this.tab = Number(tab._data.index);
    },
    //点击查看详情
    toDetails(id) {
      this.fromSearch = false;
      this.isDetails = true;
      let that = this;
      this.$ajax.get("/forum/getPostById/" + id).then((res) => {
        that.details = res.data.post;
        that.commentList = res.data.commentList;
      });
    },
    //帖子详情页返回列表
    toList() {
      this.isDetails = false;
    },
    //点击我要发布按钮
    openAddPost() {
      this.isAddPost = true;
      for (let item in this.editPost) {
        this.editPost[item] = null;
      }
      document.documentElement.style.overflow = "hidden";
    },
    //确定发布帖子
    addPost() {
      if (
        !this.editPost.title ||
        !this.editPost.content ||
        !this.editPost.zone
      ) {
        this.$message.error("请将内容填写完整");
        return;
      }
      let obj = Object.assign({}, this.editPost);
      let that = this;
      this.$ajax
        .post("/forum/addPost", qs.stringify(obj), {
          "content-type": "application/x-www-form-urlencoded",
        })
        .then((res) => {
          //刷新页面
          new Promise((resolve, reject) => {
            that.$message.success("发布成功");
            resolve();
          }).then(() => {
            setTimeout(() => {
              that.$router.go(0);
            }, 500);
          });
          that.isAddPost = false;
          document.documentElement.style.overflow = "auto";
        });
    },
    //取消发布帖子
    cancelAddPost() {
      this.isAddPost = false;
      document.documentElement.style.overflow = "auto";
    },
    //根据关键字搜索
    search() {
      let obj = {
        keyword: this.searchValue,
      };
      let that = this;
      this.$ajax
        .post("/forum/getPostByKeyword", qs.stringify(obj), {
          "content-type": "application/x-www-form-urlencoded",
        })
        .then((res) => {
          that.isSearchList = true;
          that.searchList = res.data;
        });
    },
    //点击搜索列表的行
    tableClick(row, column, event) {
      this.fromSearch = true;
      this.isSearchList = false;
      this.isDetails = true;
      let that = this;
      this.$ajax.get("/forum/getPostById/" + row.id).then((res) => {
        that.details = res.data;
      });
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
  top: 0vh;
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
/* 发布帖子窗口 */
#addPost {
  position: absolute;
  z-index: 9;
  width: 100vw;
  height: 100vh;
  top: -15vh;
  left: -10vw;
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
/* 搜索结果页面 */
#forum .searchList .searchValue {
  font-weight: 600;
  font-size: 1.2rem;
}
</style>