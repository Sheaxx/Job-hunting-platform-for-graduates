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
      <el-button
        icon="el-icon-arrow-right"
        circle
        @click="changeCollapse"
        v-if="isCollapse"
      ></el-button>
      <el-button
        icon="el-icon-arrow-left"
        circle
        @click="changeCollapse"
        v-if="!isCollapse"
      ></el-button>
      <el-menu-item index="/employment">
        <i class="el-icon-suitcase-1"></i>
        <span>招聘信息</span>
      </el-menu-item>
      <el-menu-item index="/forum">
        <i class="el-icon-chat-dot-square"></i>
        <span>论坛</span>
      </el-menu-item>
      <el-menu-item
        index="/calendar"
        v-if="!isCompany"
      >
        <i class="el-icon-date"></i>
        <span>日程表</span>
      </el-menu-item>
      <el-menu-item index="/messages">
        <i class="el-icon-bell"></i>
        <span>消息列表</span>
      </el-menu-item>
      <el-menu-item
        index="/userStudent"
        v-if="isStudent"
      >
        <i class="el-icon-user"></i>
        <span>个人信息</span>
      </el-menu-item>
      <el-menu-item
        index="/userCompany"
        v-if="isCompany"
      >
        <i class="el-icon-user"></i>
        <span>个人信息</span>
      </el-menu-item>
      <el-menu-item
        index="/userSchool"
        v-if="isSchool"
      >
        <i class="el-icon-user"></i>
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
      isStudent: false, //学生身份
      isCompany: false, //企业身份
      isSchool: false, //学校身份
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
    },
  },
  created() {
    switch (window.localStorage.getItem("role")) {
      case "0":
        this.isStudent = true;
        break;
      case "1":
        this.isCompany = true;
        break;
      case "2":
        this.isSchool = true;
    }
  },
};
</script>

<style>
#menu {
  position: fixed;
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
  background: #99bddf;
  color: #fff;
  position: relative;
  left: 12.5px;
  top: 10px;
  margin-bottom: 30px;
}
.el-menu-item:hover,
.el-menu-item:active {
  background-color: rgb(243, 241, 241) !important;
}
.el-menu-item i {
  font-size: 21px !important;
  margin-right: 10px !important;
}
</style>