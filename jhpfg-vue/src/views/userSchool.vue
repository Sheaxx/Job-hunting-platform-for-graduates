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
          label="我的信息"
          class="user"
          name="1"
        >
          <div class="accountBox">
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
          </div>
          <div class="personalBox">
            <div id="personalReadBox">
              <h5 class="boxTitle">个人信息</h5>
              <div
                class="personalReadBox"
                v-if="!isUpdatePersonal"
              >
                <el-button
                  type="primary"
                  round
                  @click="openUpdatePersonal"
                >更新信息</el-button>
                <h6 class="name">{{personalInfo.realname}}</h6>
                <p class="school"><i class="el-icon-s-home"></i>{{personalInfo.school}}</p>
                <p class="position"><i class="el-icon-s-cooperation"></i>{{personalInfo.position}}</p>
              </div>
              <div
                class="personalUpdateBox"
                v-else
              >
                <el-button
                  type="primary"
                  round
                  @click="updatePersonal"
                >确认更新</el-button>
                <el-button
                  round
                  @click="cancelUpdatePersonal"
                >取消更新</el-button>
                <el-form label-width="100px">
                  <el-form-item label="姓名">
                    <el-input v-model="editPersonal.realname" />
                  </el-form-item>
                  <el-form-item label="学校">
                    <el-input v-model="editPersonal.school" />
                  </el-form-item>
                  <el-form-item label="职位">
                    <el-input v-model="editPersonal.position" />
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="我的学校"
          name="2"
        >
        </el-tab-pane>
        <el-tab-pane
          label="认证招聘信息"
          name="3"
        >
        </el-tab-pane>
        <el-tab-pane
          label="我的发布"
          name="4"
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
      isUpdatePersonal: false, //更新个人信息界面，默认为否
      userInfo: {
        //用户信息
        username: "zhalisu", //用户名
        password: "", //密码
        role: "学校", //角色身份
      },
      personalInfo: {}, //个人信息
      editPersonal: {
        realname: "",
        school: "",
        position: "",
      },
    };
  },
  methods: {
    //点击修改密码
    openUpdatePassword() {
      this.oldPassword = "";
      this.newPassword = "";
      this.isUpdatePassword = true;
    },
    //取消修改密码
    cancelUpdatePassword() {
      this.isUpdatePassword = false;
    },
    //确认修改密码
    updatePassword() {
      this.isUpdatePassword = false;
      this.$message.success("密码修改成功。");
    },
    //点击更新个人信息
    openUpdatePersonal() {
      this.editPersonal = Object.assign({}, this.personalInfo);
      this.isUpdatePersonal = true;
    },
    //取消更新个人信息
    cancelUpdatePersonal() {
      this.isUpdatePersonal = false;
    },
    //确认更新个人信息
    updatePersonal() {
      let that = this;
      let obj = Object.assign({}, this.editPersonal);
      this.$ajax
        .post("/user/updatePersonal", qs.stringify(obj), {
          "content-type": "application/x-www-form-urlencoded",
        })
        .then((res) => {
          that.personalInfo = obj;
          that.isUpdatePersonal = false;
          that.$message.success("更新成功");
        });
    },
  },
  mounted() {
    let that = this;
    this.$ajax.get("/user/getPersonal/" + "aaa").then((res) => {
      that.personalInfo = res.data;
    });
  },
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
#userSchool .user {
  display: flex;
  width: 90%;
  height: 500px;
  align-items: center;
}
#userSchool .accountBox,
#userSchool .personalBox {
  height: 98%;
  flex: 1;
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
/* 个人信息 */
/* 查看界面 */
#userSchool .personalBox {
  border-left: #8e90944d 1px solid;
  padding-left: 50px;
}
#userSchool .personalBox .el-button {
  float: right;
  margin-left: 10px;
}
#userSchool .personalBox .name {
  font-size: 1.4rem;
  height: 4vh;
  line-height: 4vh;
  margin-bottom: 40px;
  font-weight: 600;
  letter-spacing: 1px;
}
#userSchool .personalBox p {
  margin-bottom: 15px;
  letter-spacing: 1px;
}
#userSchool .personalBox i {
  margin-right: 10px;
}
/* 修改界面 */
#userSchool .personalUpdateBox .el-form {
  clear: both;
  position: relative;
  top: 20px;
  width: 90%;
}
</style>