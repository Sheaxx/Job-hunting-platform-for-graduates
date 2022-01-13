<template>
  <div id="employment">
    <i class="el-icon-s-flag index-icon" slot="icon"></i>
    <h4 class="index-boxTitle" slot="boxTitle">招聘信息</h4>
    <el-input
      placeholder="请输入内容"
      v-model="searchValue"
      class="input-with-select searchInput"
    >
      <el-select v-model="searchSelect" slot="prepend" placeholder="请选择">
        <el-option label="搜岗位" value="1"></el-option>
        <el-option label="搜公司" value="2"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search">搜索</el-button>
    </el-input>
    <el-table ref="filterTable" style="width: 100%"> </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
      searchSelect: "",
    };
  },
};
</script>

<style>
.searchInput {
  font-size: 0.7rem!important;
  margin-top: 3vh;
  margin-bottom: 2vh;
}
.el-select .el-input {
  width: 130px;
}
</style>