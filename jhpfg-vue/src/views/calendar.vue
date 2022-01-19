<template>
  <div id="calendar">
    <i class="el-icon-date index-icon" slot="icon"></i>
    <h4 class="index-boxTitle" slot="boxTitle">日程表</h4>
    <el-calendar v-model="value"> </el-calendar>
  </div>
</template>

<script>
export default {};
</script>

<style>
.el-calendar {
  margin: 0 auto;
  width: 80%;
}

</style>