<template>
  <div id="userStudent">
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
        v-if="!isEmploymentDetails && !isPostDetails"
        :value="tabValue"
      >
        <el-tab-pane
          label="我的账号信息"
          class="user"
          name="1"
        >
          <h5 class="boxTitle">账号信息</h5>
          <el-upload
            action="#"
            list-type="picture-card"
            :on-remove="handleRemove"
            :on-change="handleChange"
            :show-file-list="true"
            :auto-upload="false"
            :limit="1"
            :class="{ hide: notShowUpload }"
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
        </el-tab-pane>
        <el-tab-pane
          label="我的简历"
          class="resume"
          name="2"
        >
          <resume
            :resumeInfo="resumeInfo"
            :educationInfo="educationInfo"
            :internshipInfo="internshipInfo"
            :projectInfo="projectInfo"
            :campusExperienceInfo="campusExperienceInfo"
            :skillInfo="skillInfo"
            :certificateInfo="certificateInfo"
          ></resume>
        </el-tab-pane>
        <el-tab-pane
          label="我的收藏"
          class="collection"
          name="3"
        >
          <ul v-if="!isEmploymentDetails">
            <li
              v-for="item in collectionList"
              :key="item.employmentid"
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
          label="我的投递"
          class="resumeSent"
          name="4"
        >
          <ul>
            <li
              v-for="item in resumeSentList"
              :key="item.sentid"
            >
              <p class="company">{{ item.company }}</p>
              <p class="position">{{ item.position }}</p>
              <el-steps
                :active="item.now"
                finish-status="success"
                :process-status="item.state"
              >
                <el-step
                  v-for="(item2, index) in item.total"
                  :key="index"
                  :title="item2"
                ></el-step>
              </el-steps>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane
          label="我的发布"
          name="5"
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
        @collect="collect"
        @cancelCollect="cancelCollect"
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
import { CodeToText } from "element-china-area-data";
import qs from "qs";
import Resume from "../components/resume.vue";
import EmploymentDetails from "../components/employmentDetails.vue";
import ForumDetails from "../components/forumDetails.vue";

export default {
  components: { Resume, EmploymentDetails, ForumDetails },
  data() {
    return {
      tabValue: "1", //选项卡的值，默认为第一个
      isUpdatePassword: false, //修改密码界面，默认为否
      isEmploymentDetails: false, //是否是招聘信息详情页，默认为否
      isPostDetails: false, //是否是帖子详情页，默认为否
      notShowUpload: false, //不显示上传图标，默认为否
      avatarUrl: "", //编辑头像
      oldPassword: "", //旧密码
      newPassword: "", //新密码
      userInfo: {}, //用户信息
      resumeInfo: {}, //简历信息
      educationInfo: [], //教育信息
      internshipInfo: [], //实习经历
      projectInfo: [], //项目经历
      skillInfo: [], //技能
      certificateInfo: [], //证书
      campusExperienceInfo: [], //校内经历
      collectionList: [], //收藏招聘信息列表
      employmentDetails: {}, //某个招聘信息的详情
      companyDetails: {
        //详情页面的公司信息
        id: 1,
        logo: "",
        name: "字节跳动",
        trade: "互联网",
        level: "已上市",
        location: "北京",
        introduction:
          "1、对国家政策、产业环境、市场规模等进行洞察，结合客户需求进行痛点分析，聚焦功能需求，适配相关解决方案。2、根据市场洞察，结合客户需求，孵化数字政府相关解决方案，协同合作伙伴进行落地支撑；3、进行产业环境分析，对服务区域的主导产业进行分析研究，结合方案进行信息化平台的售前工作，4、根据项目需求进行实地调研，可独立输出PPT以及WORD等相关报告，能够适应中短期出差。",
      },
      resumeSentList: [
        {
          sentid: 1,
          username: "",
          company: "字节跳动", //投递的公司
          position: "前端开发", //投递的职位
          total: ["笔试", "面试", "面试"], //各个流程名字
          now: 1, //现在在第几个流程
          state: "error", //当前流程的状态
        },
      ], //已经投递的简历列表
      postList: [], //发布的帖子列表
      postDetails: {}, //某个帖子的详情
      commentList: [], //评论列表
    };
  },
  methods: {
    //删除照片
    handleRemove(file, fileList) {
      if (fileList.length < 1) {
        this.notShowUpload = false;
      }
      this.avatarUrl = "";
    },
    //照片上传按钮的动态显示
    handleChange(file, fileList) {
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
          .post(
            "/user/updateAvatar/" + window.localStorage.getItem("username"),
            qs.stringify(obj),
            {
              "content-type": "application/x-www-form-urlencoded",
            }
          )
          .then((res) => {
            that.userInfo.avatar = that.avatarUrl;
            that.$message.success("更换头像成功");
          });
      };
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
    //实习或全职转文字显示
    showIsFullTime(val) {
      switch (val) {
        case 0:
          return "实习";
        case 1:
          return "全职";
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
    //地区码转中文
    showLocation(location) {
      return CodeToText[location[0]] + "" + CodeToText[location[1]];
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
      this.isEmploymentDetails = false;
    },
    //收藏招聘信息
    collect() {
      this.employmentDetails.isCollect = true;
    },
    //取消收藏招聘信息
    cancelCollect() {
      this.employmentDetails.isCollect = false;
    },
    //投递简历
    sendResume() {},
    //查看我发布的帖子详情
    toPostDetails(id) {
      this.isPostDetails = true;
      this.tabValue = "5";
      let that = this;
      this.$ajax.get("/forum/getPostById/" + id).then((res) => {
        that.postDetails = res.data.post;
        that.commentList = res.data.commentList;
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
      .get("/user/getResume/" + window.localStorage.getItem("username"))
      .then((res) => {
        that.resumeInfo = res.data.resume;
        that.educationInfo = res.data.education;
        that.internshipInfo = res.data.internship;
        that.projectInfo = res.data.project;
        that.campusExperienceInfo = res.data.campusExperience;
        that.skillInfo = res.data.skill;
        that.certificateInfo = res.data.certificate;
        for (let item in that.educationInfo) {
          that.educationInfo[item].duration =
            that.educationInfo[item].duration.split(",");
        }
        for (let item in that.internshipInfo) {
          that.internshipInfo[item].duration =
            that.internshipInfo[item].duration.split(",");
        }
        for (let item in that.projectInfo) {
          that.projectInfo[item].duration =
            that.projectInfo[item].duration.split(",");
        }
        for (let item in that.campusExperienceInfo) {
          that.campusExperienceInfo[item].duration =
            that.campusExperienceInfo[item].duration.split(",");
        }
      });
    this.$ajax
      .get("/user/getCollectList/" + window.localStorage.getItem("username"))
      .then((res) => {
        that.collectionList = res.data;
        for (let item in that.collectionList) {
          that.collectionList[item].location =
            that.collectionList[item].location.split(",");
        }
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
#userStudent {
  position: relative;
}
#userStudent .userInfo {
  clear: both;
  width: 100%;
  height: 500px;
  float: left;
  margin-top: 5vh;
  margin-left: 3vw;
}
#userStudent .userInfo .el-tab-pane {
  margin-left: 2vw;
}
#userStudent .userInfo .el-tabs__content {
  position: static;
}
#userStudent .userInfo .boxTitle {
  width: 100%;
  font-size: 1.1rem;
  height: 5vh;
  line-height: 5vh;
  margin-bottom: 5vh;
}
/* 账号信息 */
#userStudent .user li {
  margin-bottom: 3vh;
}
#updatePassword {
  width: 30%;
}
#updatePassword .el-input {
  margin-bottom: 2vh;
}
/* 头像 */
#userStudent .el-upload {
  margin-bottom: 24px;
}
#userStudent .el-upload img {
  width: 146px;
  height: 146px;
}
#userStudent .hide .el-upload--picture-card {
  display: none;
}
/* 我的收藏 */
#userStudent .collection {
  width: 87%;
  padding: 1%;
  height: 500px;
  overflow: auto;
}
#userStudent .collection .isFullTime {
  float: left;
  margin-right: 20px;
}
#userStudent .collection li {
  width: 95%;
  height: 18%;
  padding: 1.8%;
  margin-bottom: 2%;
  border: #8e909421 1px solid;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.05);
}
#userStudent .collection .salary {
  float: right;
  color: #72b3f0;
  font-size: 1.2rem;
  width: 50%;
  text-align: right;
}
#userStudent .collection .jobMsg,
#userStudent .collection .companyMsg {
  color: #8e9094;
  margin-top: 1%;
  font-size: 0.8rem;
}
#userStudent .collection li:hover {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
}
#userStudent .collection li:hover .station {
  color: #72b3f0;
}
#userStudent .collection span {
  margin-right: 0.5%;
}
/* 投递简历 */
#userStudent .resumeSent {
  width: 87%;
  overflow: auto;
  height: 500px;
}
#userStudent .resumeSent li {
  width: 95%;
  height: 18%;
  padding: 1.8%;
  margin-bottom: 2%;
  border: #8e909421 1px solid;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.05);
}
#userStudent .resumeSent .company {
  float: left;
  font-weight: 600;
  margin-right: 2%;
}
#userStudent .resumeSent .position {
  font-size: 0.9rem;
  font-weight: 600;
  height: 1.2rem;
  line-height: 1.2rem;
  vertical-align: bottom;
}
#userStudent .resumeSent .el-steps {
  margin-top: 2%;
}
#userStudent .resumeSent .el-step__title {
  font-size: 0.9rem;
}
/* 我的发布 */
#userStudent .list {
  width: 90%;
  padding: 1%;
  height: 500px;
  overflow: auto;
}
#userStudent .list li {
  width: 96%;
  padding: 2%;
}
#userStudent .list li:not(:last-of-type) {
  border-bottom: #8e90943d 1px solid;
}
#userStudent .list li:last-of-type {
  margin-bottom: 20px;
}
#userStudent .list h6 {
  margin-bottom: 0.5%;
}
#userStudent .list .el-tag {
  float: right;
}
#userStudent .list span:not(.el-tag) {
  font-size: 0.8rem;
  color: #8e9094;
  margin-right: 1%;
}
#userStudent .list li:hover {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  z-index: 999;
}
</style>