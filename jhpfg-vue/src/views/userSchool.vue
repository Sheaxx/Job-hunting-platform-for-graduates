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
        v-show="!isPostDetails && !isEmploymentDetails"
      >
        <el-tab-pane
          label="我的信息"
          class="user"
          name="1"
        >
          <div class="accountBox">
            <h5 class="boxTitle">账号信息</h5>
            <el-upload
              action="#"
              list-type="picture-card"
              :on-remove="handleRemoveAvatar"
              :on-change="handleChangeAvatar"
              :show-file-list="true"
              :auto-upload="false"
              :limit="1"
              :class="{ hide: notShowUploadAvatar }"
            >
              <img
                v-if="avatarUrl"
                :src="avatarUrl"
              />
              <i
                v-else
                class="el-icon-plus"
              ></i>
            </el-upload>
            <ul>
              <li>
                <span class="itemTitle">用户名：{{ userInfo.username }}</span>
              </li>
              <li>
                <span class="itemTitle">角色：{{ showRole(userInfo.role) }}</span>
              </li>
              <li>
                <el-button
                  round
                  v-if="!isUpdatePassword"
                  @click="openUpdatePassword"
                >修改密码</el-button>
                <el-button
                  round
                  v-if="isUpdatePassword"
                  @click="cancelUpdatePassword"
                >取消修改</el-button>
                <el-button
                  type="primary"
                  round
                  v-if="isUpdatePassword"
                  @click="updatePassword"
                >确认修改</el-button>
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
          <div
            id="schoolReadBox"
            v-if="!isUpdateSchool"
          >
            <el-button
              type="primary"
              round
              @click="openUpdateSchool"
            >更新信息</el-button>
            <h6 class="name">{{schoolDetails.name}}</h6>
            <img
              :src="schoolDetails.logo"
              alt="校徽"
            >
            <p><i class="el-icon-location"></i>{{schoolDetails.address}}</p>
            <div class="introduction">
              <h6>学校简介</h6>
              <p>{{schoolDetails.introduction}}</p>
            </div>
          </div>
          <div
            id="schoolUpdateBox"
            v-else
          >
            <el-form label-width="100px">
              <el-form-item label="LOGO">
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :on-remove="handleRemoveLogo"
                  :on-change="handleChangeLogo"
                  :show-file-list="true"
                  :auto-upload="false"
                  :limit="1"
                  :class="{ hide: notShowUploadLogo }"
                >
                  <img
                    v-if="logoUrl"
                    :src="logoUrl"
                  />
                  <i
                    v-else
                    class="el-icon-plus"
                  ></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="学校名">
                <el-input v-model="editSchool.name" />
              </el-form-item>
              <el-form-item label="详细地址">
                <el-input v-model="editSchool.address" />
              </el-form-item>
              <el-form-item label="内容">
                <el-input
                  type="textarea"
                  v-model="editSchool.introduction"
                  resize="none"
                  :rows="6"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="updateSchool"
                >确认修改</el-button>
                <el-button @click="cancelUpdateSchool">取消修改</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="认证招聘信息"
          name="3"
          class="employmentList"
        >
          <ul v-if="!isEmploymentDetails" >
            <li
              v-for="item in employmentList"
              :key="item.id"
              @click="toEmploymentDetails(item.id)"
            >
              <p class="salary"><span>{{ item.salaryStart }} - {{ item.salaryEnd }}</span></p>
              <el-tag class="isFullTime">{{showIsFullTime(item.isFullTime)}}</el-tag>
              <p class="station">{{ item.station }}</p>
              <p class="jobMsg">
                <span>{{ showLocation(item.location) }}</span>
                <span>{{ item.education }}</span>
              </p>
              <p class="companyMsg">
                <span>{{ item.companyName }}</span>
                <span>{{ item.trade }}</span>
                <span>{{ item.level }}</span>
              </p>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane
          label="我的发布"
          name="4"
        >
          <ul class="list">
            <li
              v-for="(item) in postList"
              :key="item.id"
              @click="toPostDetails(item.id)"
            >
              <el-tag>{{showZone(item.zone)}}</el-tag>
              <h6>{{item.title}}</h6>
              <span>{{item.author}}</span>
              <span>{{item.createTime}}</span>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
      <employment-details
        v-if="isEmploymentDetails"
        :details="employmentDetails"
        :companyDetails="companyDetails"
        @toList="toEmploymentList"
        @sendResume="sendResume"
      ></employment-details>
      <forum-details
        v-if="isPostDetails"
        :details="postDetails"
        :commentList="commentList"
        @toList="toPostList"
        @refresh="toPostDetails"
      ></forum-details>
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
import ForumDetails from "../components/forumDetails.vue";

export default {
  components: { EmploymentDetails, ForumDetails },
  data() {
    return {
      tabValue: "1", //选项卡的值，默认为第一个
      isUpdatePassword: false, //修改密码界面，默认为否
      isUpdatePersonal: false, //更新个人信息界面，默认为否
      isUpdateSchool: false, //更新学校信息页面，默认为否
      isEmploymentDetails: false, //是否是招聘信息详情页，默认为否
      isPostDetails: false, //是否是帖子详情页，默认为否
      notShowUploadAvatar: false, //（用户头像）不显示上传图标，默认为否
      notShowUploadLogo: false, //（学校LOGO）不显示上传图标，默认为否
      avatarUrl: "", //编辑头像
      logoUrl: "", //编辑logo
      oldPassword: "", //旧密码
      newPassword: "", //新密码
      userInfo: {
        //用户信息
        username: "zhalisu", //用户名
        password: "", //密码
        role: "学校", //角色身份
        avatar: "", //头像
      },
      personalInfo: {}, //个人信息
      editPersonal: {
        realname: "",
        school: "",
        position: "",
      },
      schoolDetails: {}, //学校详情
      editSchool: {
        id: "",
        name: "",
        logo: "",
        address: "",
        introduction: "",
      }, //学校编辑信息
      employmentList: [], //招聘信息列表
      employmentDetails: {}, //招聘信息详情
      companyDetails: {}, //公司详情
      postList: [], //帖子列表
      postDetails: {}, //某个帖子的详情
      commentList: [], //评论列表
    };
  },
  methods: {
    //删除头像
    handleRemoveAvatar(file, fileList) {
      if (fileList.length < 1) {
        this.notShowUpload = false;
      }
      this.avatarUrl = "";
    },
    //头像上传按钮的动态显示
    handleChangeAvatar(file, fileList) {
      if (fileList.length >= 1) {
        this.notShowUpload = true;
      } else {
        this.notShowUpload = false;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      let that = this;
      reader.onload = function () {
        that.avatarUrl = reader.result;
        let obj = {
          avatar: that.avatarUrl,
        };
        that.$ajax
          .post("/user/updateAvatar/" + "aaa", qs.stringify(obj), {
            "content-type": "application/x-www-form-urlencoded",
          })
          .then((res) => {
            that.userInfo.avatar = that.avatarUrl;
            that.$message.success("更换头像成功");
          });
      };
    },
    //身份显示
    showRole(role) {
      switch (role) {
        case 0:
          return "学生";
        case 1:
          return "企业";
        case 2:
          return "学校";
      }
    },
    //根据zone显示文字
    showZone(zone) {
      switch (zone) {
        case 1:
          return "我要提问";
        case 2:
          return "笔试经验";
        case 3:
          return "面试经验";
        case 4:
          return "工作分享";
        case 5:
          return "企业招聘";
      }
    },
    //实习或全职转文字显示
    showIsFullTime(val) {
      switch (val) {
        case 0:
          return "实习";
        case 1:
          return "全职";
      }
    },
    //地区码转中文
    showLocation(location) {
      return CodeToText[location[0]] + "" + CodeToText[location[1]];
    },
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
      if (this.oldPassword == "" || this.newPassword == "") {
        this.$message.warning("新密码或旧密码不能为空");
      } else if (this.oldPassword == this.newPassword) {
        this.$message.warning("新密码和旧密码不能相同");
      } else {
        let that = this;
        let obj = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        };
        this.$ajax
          .post(
            "/user/updatePassword/" + window.localStorage.getItem("username"),
            qs.stringify(obj),
            {
              "content-type": "application/x-www-form-urlencoded",
            }
          )
          .then((res) => {
            if (res.data == "error") {
              that.$message.error("旧密码错误");
            } else {
              window.localStorage.setItem("password", that.newPassword);
              that.$message.success("修改密码成功");
              that.isUpdatePassword = false;
            }
          });
      }
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
    //点击更新学校信息
    openUpdateSchool() {
      Object.assign(this.editSchool, this.schoolDetails);
      this.logoUrl = this.schoolDetails.logo;
      this.isUpdateSchool = true;
    },
    //删除logo
    handleRemoveLogo(file, fileList) {
      if (fileList.length < 1) {
        this.notShowUploadLogo = false;
      }
      this.logoUrl = "";
    },
    //logo上传按钮的动态显示
    handleChangeLogo(file, fileList) {
      if (fileList.length >= 1) {
        this.notShowUploadLogo = true;
      } else {
        this.notShowUploadLogo = false;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      let that = this;
      reader.onload = function () {
        that.logoUrl = reader.result;
      };
    },
    //确认修改学校信息
    updateSchool() {
      let obj = Object.assign({}, this.editSchool);
      obj.logo = this.logoUrl;
      let that = this;
      this.$ajax
        .post("/school/updateSchool", qs.stringify(obj), {
          "content-type": "application/x-www-form-urlencoded",
        })
        .then((res) => {
          Object.assign(that.schoolDetails, that.editSchool);
          that.schoolDetails.logo = that.logoUrl;
          that.isUpdateSchool = false;
          that.$message.success("更新成功");
        });
    },
    //取消修改学校信息
    cancelUpdateSchool() {
      this.isUpdateSchool = false;
    },
    //查看招聘信息详情
    toEmploymentDetails(id) {
      let that = this;
      this.$ajax.get("/employment/getEmploymentById/" + id).then((res) => {
        that.employmentDetails = res.data;
        that.employmentDetails.location =
          that.employmentDetails.location.split(",");
        that.$ajax
          .get("/company/getCompanyById/" + that.employmentDetails.companyId)
          .then((res) => {
            that.companyDetails = res.data;
            that.companyDetails.location =
              that.companyDetails.location.split(",");
            that.isEmploymentDetails = true;
            that.tabValue = "3";
          });
      });
    },
    //招聘信息详情返回列表
    toEmploymentList() {
      let that = this;
      this.$ajax
        .get("/user/getCollectList/" + window.localStorage.getItem("username"))
        .then((res) => {
          that.employmentList = res.data;
          for (let item in that.employmentList) {
            that.employmentList[item].location =
              that.employmentList[item].location.split(",");
          }
          that.isEmploymentDetails = false;
        });
    },
    //查看我发布的帖子详情
    toPostDetails(id) {
      let that = this;
      this.$ajax.get("/forum/getPostById/" + id).then((res) => {
        that.postDetails = res.data.post;
        that.commentList = res.data.commentList;
        that.isPostDetails = true;
        that.tabValue = "4";
      });
    },
    //帖子详情返回列表
    toPostList() {
      this.isPostDetails = false;
    },
  },
  mounted() {
    let that = this;
    this.$ajax
      .get("/user/getPersonal/" + window.localStorage.getItem("username"))
      .then((res) => {
        that.personalInfo = res.data;
        that.$ajax
          .get("/school/getSchoolByName/" + res.data.school)
          .then((res) => {
            that.schoolDetails = res.data;
            that.$ajax
              .get("/school/getRecommendList/" + that.schoolDetails.id)
              .then((res) => {
                that.employmentList = res.data;
                for (let item in that.employmentList) {
                  that.employmentList[item].location =
                    that.employmentList[item].location.split(",");
                }
              });
          });
      });
    this.$ajax
      .get("/user/getUser/" + window.localStorage.getItem("username"))
      .then((res) => {
        that.userInfo = res.data;
        that.avatarUrl = that.userInfo.avatar;
      });
    this.$ajax
      .get(
        "/forum/getPostByUsername/" + window.localStorage.getItem("username")
      )
      .then((res) => {
        that.postList = res.data;
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
/* 头像 */
#userSchool .el-upload {
  margin-bottom: 24px;
}
#userSchool .el-upload img {
  width: 146px;
  height: 146px;
}
#userSchool .hide .el-upload--picture-card {
  display: none;
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
/* 学校信息 */
/* 查看 */
#userSchool #schoolReadBox,
#userSchool #schoolUpdateBox {
  width: 85%;
  height: 500px;
}
#userSchool #schoolReadBox .el-button:first-of-type {
  float: right;
  margin-right: 3vw;
}
#userSchool #schoolReadBox .name {
  font-size: 1.4rem;
  height: 4vh;
  line-height: 4vh;
  margin-bottom: 60px;
  font-weight: 600;
  letter-spacing: 1px;
}
#userSchool #schoolReadBox img {
  height: 146px;
  width: 146px;
  float: left;
  margin-right: 50px;
}
#userSchool #schoolReadBox p {
  width: 100%;
  position: relative;
  top: 40px;
  font-size: 14px;
  height: 15px;
  line-height: 15px;
  vertical-align: middle;
  letter-spacing: 1px;
  color: #272736;
}
#userSchool #schoolReadBox i {
  display: inline-block;
  margin-right: 10px;
  color: #99bddf;
}
#userSchool #schoolReadBox .introduction h6 {
  font-size: 1.2rem;
  padding-bottom: 10px;
  margin-top: 160px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
}
#userSchool #schoolReadBox .introduction p {
  line-height: 1.5rem;
  letter-spacing: 1px;
}
/* 更新 */
#userSchool #schoolUpdateBox .el-button {
  float: right;
  margin-left: 10px;
}
#userSchool #schoolUpdateBox {
  height: 500px;
  overflow: auto;
  padding-right: 5%;
}
#userSchool .employmentList {
  width: 87%;
  padding: 1%;
  height: 500px;
  overflow: auto;
}
#userSchool .employmentList .isFullTime {
  float: left;
  margin-right: 20px;
}
#userSchool .employmentList li {
  width: 95%;
  height: 18%;
  padding: 1.8%;
  margin-bottom: 2%;
  border: #8e909421 1px solid;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.05);
}
#userSchool .employmentList .salary {
  float: right;
  color: #72b3f0;
  font-size: 1.2rem;
  width: 50%;
  text-align: right;
}
#userSchool .employmentList .jobMsg,
#userSchool .employmentList .companyMsg {
  color: #8e9094;
  margin-top: 1%;
  font-size: 0.8rem;
}
#userSchool .employmentList li:hover {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
}
#userSchool .employmentList li:hover .station {
  color: #72b3f0;
}
#userSchool .employmentList span {
  margin-right: 0.5%;
}
/* 我的发布 */
#userSchool .list {
  width: 90%;
  padding: 1%;
  height: 500px;
  overflow: auto;
}
#userSchool .list li {
  width: 96%;
  padding: 2%;
}
#userSchool .list li:not(:last-of-type) {
  border-bottom: #8e90943d 1px solid;
}
#userSchool .list li:last-of-type {
  margin-bottom: 20px;
}
#userSchool .list h6 {
  margin-bottom: 0.5%;
}
#userSchool .list .el-tag {
  float: right;
}
#userSchool .list span:not(.el-tag) {
  font-size: 0.8rem;
  color: #8e9094;
  margin-right: 1%;
}
#userSchool .list li:hover {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  z-index: 999;
}
</style>