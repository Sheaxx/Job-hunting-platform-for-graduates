<template>
  <div id="userSchool">
    <i
      class="el-icon-user index-icon"
      slot="icon"
    ></i>
    <h4
      class="index-boxTitle"
      slot="boxTitle"
    >个人中心</h4>
    <div class="userInfo">
      <el-tabs
        tab-position="left"
        style="height: 500px"
        :value="tabValue"
      >
        <el-tab-pane
          label="我的账号信息"
          class="user"
          name="1"
        >
          <h5 class="boxTitle">账号信息</h5>
          <ul>
            <li>
              <span class="itemTitle">用户名：{{ userInfo.username }}</span>
            </li>
            <li>
              <span class="itemTitle">角色：{{ userInfo.role }}</span>
            </li>
            <li>
              <el-button
                round
                v-if="!isUpdatePassword"
                @click="openUpdatePassword"
              >修改密码</el-button>
              <el-button
                round
                v-else
                @click="cancelUpdatePassword"
              >取消修改</el-button>
            </li>
          </ul>
          <div
            id="updatePassword"
            v-if="isUpdatePassword"
          >
            <el-input
              placeholder="请输入旧密码"
              v-model="oldPassword"
              show-password
              class="password"
            ></el-input>
            <el-input
              placeholder="请输入新密码"
              v-model="newPassword"
              show-password
              class="password"
            ></el-input>
            <el-button
              type="primary"
              round
              @click="updatePassword"
            >确认修改</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="我的个人信息"
          name="2"
        >
          <h5 class="boxTitle">个人信息</h5>
        </el-tab-pane>
        <el-tab-pane
          label="我的学校信息"
          name="3"
        >
        </el-tab-pane>
        <el-tab-pane
          label="认证招聘信息"
          name="4"
        >
        </el-tab-pane>
        <el-tab-pane
          label="我的发布"
          name="5"
        >
          <!-- <forum-box
            class="forumBox"
            :tab="0"
            :pageSize="6"
            @itemClick="toPostDetails"
          ></forum-box> -->
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  provinceAndCityData,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
import qs from "qs";
import EmploymentDetails from "../components/employmentDetails.vue";
import ForumBox from "../components/forumBox.vue";
import ForumDetails from "../components/forumDetails.vue";

export default {
  data() {
    return {
      tabValue: "1", //选项卡的值，默认为第一个
      isUpdatePassword: false, //修改密码界面，默认为否
      userInfo: {
        //用户信息
        username: "zhalisu", //用户名
        password: "", //密码
        role: "学校", //角色身份
      },
    }
  },
  methods:{
    //点击修改密码
    openUpdatePassword() {
      this.isUpdatePassword = true;
    },
    //取消修改密码
    cancelUpdatePassword() {
      this.oldPassword = "";
      this.newPassword = "";
      this.isUpdatePassword = false;
    },
    //确认修改密码
    updatePassword() {
      this.isUpdatePassword = false;
      this.$message.success("密码修改成功。");
      this.oldPassword = "";
      this.newPassword = "";
    },
  }
};
</script>

<style>
#userSchool {
  position: relative;
}
#userSchool .userInfo {
  clear: both;
  width: 100%;
  height: 500px;
  float: left;
  margin-top: 5vh;
  margin-left: 3vw;
}
#userSchool .userInfo .el-tab-pane {
  margin-left: 2vw;
}
#userSchool .userInfo .el-tabs__content {
  position: static;
}
#userSchool .userInfo .boxTitle {
  width: 100%;
  font-size: 1.1rem;
  height: 5vh;
  line-height: 5vh;
  margin-bottom: 5vh;
}
/* 账号信息 */
#userSchool .user li {
  margin-bottom: 3vh;
}
#updatePassword {
  width: 30%;
}
#updatePassword .el-input {
  margin-bottom: 2vh;
}
</style>