<template>
  <div id="userBox">
    <span class="userInfo">欢迎你，{{ nowUser }}！</span>
    <img :src="nowAvatar" alt="头像" @click="showExit = true" />
    <i class="el-icon-switch-button exit" @click="showExit=true"></i>

    <div class="coverBox" v-show="showExit">
      <div class="exitBox">
        <div class="exitContent">
          <i class="el-icon-warning-outline"></i>
          <span>确定退出登录吗？</span>
        </div>
        <div class="exitButton">
          <el-button plain @click="showExit = false"
            >取消</el-button
          >
          <el-button type="primary" @click="exit">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowUser:"",
      nowAvatar:"",
      showExit: false,
    };
  },
  methods: {
    exit() {
      window.localStorage.removeItem("username");
      this.$router.replace("/login");
      this.$message.success("退出登录成功");
    },
  },
  created() {
    this.nowUser = window.localStorage.getItem("username");
    this.nowAvatar = window.localStorage.getItem("avatar");
  }
};
</script>

<style>
#userBox {
  position: relative;
  width: 99%;
  height: 20vh;
}
#userBox .userInfo {
  position: absolute;
  top: 4vh;
  left: 78%;
  text-align: right;
}
#userBox img {
  position: absolute;
  top: 2vh;
  left: 90%;
  width: 40px;
  height: 40px;
}
#userBox .exit {
  position: absolute;
  top: 3vh;
  left: 95%;
  font-size: 1.6rem;
}
#userBox .exit:hover {
  color: #72b3f0;
  cursor: pointer;
}
#userBox .coverBox {
  position: absolute;
  z-index: 999;
  width: 99.7vw;
  height: 99.8vh;
  top: 0vh;
  left: 0vw;
  background: rgba(0, 0, 0, 0.3);
}
#userBox .exitBox {
  position: absolute;
  width: 28%;
  height: 15%;
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3% 3% 0 3%;
}
#userBox .exitContent {
  font-size: 18px;
  width: 100%;
}
#userBox .exitContent i {
  font-size: 25px;
}
#userBox .exitButton {
  position: relative;
  top: 20%;
  left: 70%;
}
</style>