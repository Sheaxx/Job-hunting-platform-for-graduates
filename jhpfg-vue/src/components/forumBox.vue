<template>
  <div id="forumBox">
    <ul class="list">
      <li
        v-for="(item) in list"
        :key="item.id"
        @click="itemClick(item.id)"
      >
        <el-tag>{{showZone(item.zone)}}</el-tag>
        <h6>{{item.title}}</h6>
        <span>{{item.author}}</span>
        <span>{{item.createTime}}</span>
      </li>
    </ul>
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tab: Number,
    pageSize: Number,
  },
  data() {
    return {
      currentPage: 1, // 当前页
      total: 0, // 数据总条数
      list: [], //帖子列表
      isShowList: false, //是否是搜索后出来的列表，默认为否
    };
  },
  watch: {
    tab: function (val) {
      this.currentPage = 1;
      let that = this;
      if (val == 0) {
        this.$ajax.get("/forum/getAccountListByPage/1/" + that.pageSize).then((res) => {
          this.list = res.data.results;
          this.total = res.data.total;
        });
      } else {
        this.$ajax
          .get("/forum/getAccountListByPageAndZone/1/" + that.pageSize + "/" +val)
          .then((res) => {
            this.list = res.data.results;
            this.total = res.data.total;
          });
      }
    },
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
    //点击单条帖子
    itemClick(id) {
      this.$emit("itemClick", id);
    },
    //初始化全部帖子
    initAll() {
      this.$emit("initAll", this.list);
    },
    // 按照分页显示数据的函数
    getAccountListByPage() {
      // 发送ajax请求 把分页数据发送给后端
      this.$ajax
        .get("/forum/getAccountListByPage/" + this.currentPage + "/" + this.pageSize)
        .then((response) => {
          // 接收后端返回的数据总条数 total 和 对应页码的数据 data
          let { total, results } = response.data;
          // 赋值给对应的变量即可
          this.total = total;
          this.list = results;
          // 如果当前页没有数据 且 排除第一页
          if (!data.length && this.currentPage !== 1) {
            // 页码减去 1
            this.currentPage -= 1;
            // 再调用自己
            this.getAccountListByPage();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 当前页码改变 就会触发这个函数
    handleCurrentChange(val) {
      this.currentPage = val; // 保存当前页码
      this.getAccountListByPage(); // 调用分页函数
    }
  },
  mounted() {
    let that = this;
    this.$ajax.get("/forum/getAccountListByPage/1/" + this.pageSize).then((res) => {
      that.list = res.data.results;
      that.total = res.data.total;
    });
  },
};
</script>

<style>
#forumBox .list {
  width: 99%;
  padding: 0.5% 0.5%;
  padding-top: 12vh;
}
#forumBox .list li {
  width: 96%;
  padding: 2%;
}
#forumBox .list li:not(:last-of-type) {
  border-bottom: #8e90943d 1px solid;
}
#forumBox .list h6 {
  margin-bottom: 0.5%;
}
#forumBox .list .el-tag {
  float: right;
}
#forumBox .list span:not(.el-tag) {
  font-size: 0.8rem;
  color: #8e9094;
  margin-right: 1%;
}
#forumBox .list li:hover {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  z-index: 999;
}
#forumBox .el-pagination {
  text-align: center;
  margin-top: 2vh;
}
</style>