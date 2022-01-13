<template>
  <div id="index">
    <div class="routerView">
      <router-view> </router-view>
      <slot name="icon"></slot>
      <slot name="boxTitle"></slot>
    </div>
    <User></User>
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
  top: 10vh;
  left: 7vw;
  width: 85vw;
  height: 75vh;
  /* background: rosybrown; */
  background: #fff;
  padding: 3%;
  border-radius: 25px;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
}
.index-icon {
  float: left;
  margin: -0.5rem 1rem 0 -0.5rem;
}
.index-boxTitle {
  float: left;
  margin-top: -0.5rem;
}
</style>