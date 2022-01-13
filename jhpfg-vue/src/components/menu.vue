<template>
  <div id="menu">
    <el-menu
      background-color="#fff"
      text-color="#C0C1C5"
      active-text-color="#99BDDF"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      default-active="/employment"
      router
    >
      <el-button icon="el-icon-arrow-right" circle @click="changeCollapse" v-if="isCollapse"></el-button>
      <el-button icon="el-icon-arrow-left" circle @click="changeCollapse" v-if="!isCollapse"></el-button>
      <el-menu-item index="/employment">
        <i class="el-icon-s-flag"></i>
        <span>招聘信息</span>
      </el-menu-item>
      <el-menu-item index="/forum">
        <i class="el-icon-s-comment"></i>
        <span>论坛</span>
      </el-menu-item>
      <el-menu-item index="/calendar">
        <i class="el-icon-s-management"></i>
        <span>日程表</span>
      </el-menu-item>
      <el-menu-item index="/messages">
        <i class="el-icon-message-solid"></i>
        <span>消息列表</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-user-solid"></i>
        <span>个人信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  },
};
</script>

<style>
#menu {
  position: absolute;
  z-index: 998;
  top: 0;
  left: 0;
}
.el-menu-vertical-demo.el-menu--collapse.el-menu {
  min-height: 99.8vh;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 99.8vh;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
}
.el-button.el-button--default.is-circle {
  background: #99BDDF;
  color:#fff;
  position: relative;
  left: 12.5px;
  top: 10px;
  margin-bottom: 30px;
}
.el-menu-item:hover,
.el-menu-item:active {
  background-color: rgb(243, 241, 241)!important;
}
</style>