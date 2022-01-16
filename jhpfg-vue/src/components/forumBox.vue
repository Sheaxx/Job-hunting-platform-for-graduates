<template>
  <div id="forumBox">
    <ul class="list">
      <li v-for="(item) in forumList" :key="item.postid" @click="itemClick(item.postid)">
        <el-tag>{{item.zone}}</el-tag>
        <h6>{{item.title}}</h6>
        <span>{{item.author}}</span>
        <span>{{item.createTime}}</span>
      </li>
    </ul>
    <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="1000"
      >
      </el-pagination>
  </div>
</template>

<script>
export default {
  props:{
    'forumList': Array
  },
  methods:{
    itemClick(id) {
      this.$emit('itemClick',id);
    }
  }
};
</script>

<style>
.list {
  width: 99%;
  padding: 0.5% 0.5%;
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