<template>
  <div id="index">
    <User></User>
    <div class="routerViewBox">
      <div class="routerView">
        <router-view></router-view>
        <slot name="icon"></slot>
        <slot name="boxTitle"></slot>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import Menu from "../components/menu.vue";
import User from "../components/userBox.vue";

export default {
  components: { Menu, User },
};
</script>

<style>
body {
  width: 100%;
  height: 100%;
  background: #eef7fb;
  position: relative;
}
.routerView {
  position: absolute;
  top: 8.5vh;
  left: 7vw;
  width: 85vw;
  min-height: 82.5vh;
  max-height: 160vh;
  background: #fff;
  padding: 3% 3% 0.5% 3%;
  border-radius: 25px;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 3vh;
}
/* .routerViewBox {
  width: 85vw;
  min-height: 72vh;
  height: 120vh;
  background: red;
} */
.index-icon {
  float: left;
  margin: -0.5rem 1rem 0 -0.5rem;
}
.index-boxTitle {
  float: left;
  margin-top: -0.5rem;
}
/* 全局修改elementUI样式 */
/* 输入框 */
.el-input__inner:focus,
.el-textarea__inner:focus {
  border-color: #99BDDF!important;
}
.el-textarea__inner {
  font-size: 1rem!important;
  font-family: Arial, Helvetica, sans-serif;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
/* 按钮 */
.el-button.el-button--primary {
  background: #99BDDF!important;
  border-color: #99BDDF!important;
  color: #fff!important;
}
.el-button.el-button--primary:hover,
.el-button.el-button--primary:focus,
.el-button.el-button--default:hover,
.el-button.el-button--default:focus {
  border-color: #99BDDF!important;
  color: #99BDDF!important;
  background: #EEF7FB!important;
}
/* 导航栏 */
.el-tabs__item.is-top.is-active,
.el-tabs__item.is-left.is-active,
.el-tabs__item.is-top:hover,
.el-tabs__item.is-left:hover  {
  color: #99BDDF;

}
.el-tabs__active-bar.is-top,
.el-tabs__active-bar.is-left {
  background:#99BDDF;
}
/* 日历 */
.current.is-today .el-calendar-day{
  color: #99BDDF;
}
.el-button.el-button--plain.el-button--mini:hover,
.el-button.el-button--plain.el-button--mini:focus {
  border-color: #99BDDF;
  color: #99BDDF;
  background: #EEF7FB;
}
</style>