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
    <div id="block"></div>
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
.el-input__inner:focus,
.el-textarea__inner:focus {
  border-color: #99BDDF!important;
}
</style>