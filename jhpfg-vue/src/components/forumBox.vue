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
      layout="prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tab: Number,
  },
  data() {
    return {
      currentPage: 1, // 当前页
      total: 0, // 数据总条数
      pageSize: 10, // 每页条数
      list: [], //帖子列表
    };
  },
  watch: {
    tab: function (val) {
      this.currentPage = 1;
      if (val == 0) {
        this.$ajax.get("/forum/getAccountListByPage/1").then((res) => {
          this.list = res.data.results;
          this.total = res.data.total;
        });
      } else {
        this.$ajax
          .get("/forum/getAccountListByPageAndZone/1/" + val)
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
      // 收集当前页码 和 每页显示条数
      let currentPage = this.currentPage;

      // 发送ajax请求 把分页数据发送给后端
      this.$ajax
        .get("/forum/getAccountListByPage/" + currentPage)
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
    // 每页显示条数改变 就会触发这个函数
    handleSizeChange(val) {
      this.pageSize = val; // 保存每页显示的条数
      this.getAccountListByPage(); // 调用分页函数
    },
    // 当前页码改变 就会触发这个函数
    handleCurrentChange(val) {
      this.currentPage = val; // 保存当前页码
      this.getAccountListByPage(); // 调用分页函数
    },
  },
  mounted() {
    this.$ajax.get("/forum/getAccountListByPage/1").then((res) => {
      this.list = res.data.results;
      this.total = res.data.total;
    });
  },
};
</script>

<style>
.list {
  width: 99%;
  padding: 0.5% 0.5%;
  padding-top: 12vh;
}
.list li {
  width: 96%;
  padding: 2%;
  border-bottom: #8e90943d 1px solid;
}
.list h6 {
  margin-bottom: 0.5%;
}
.list .el-tag {
  float: right;
}
.list span {
  font-size: 0.8rem;
  color: #8e9094;
  margin-right: 1%;
}
.list li:hover {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  z-index: 999;
}
.el-pagination {
  text-align: center;
  margin-top: 2vh;
}
</style>