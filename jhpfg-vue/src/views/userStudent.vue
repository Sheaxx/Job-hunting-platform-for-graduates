<template>
  <div id="userStudent">
    <i class="el-icon-user index-icon" slot="icon"></i>
    <h4 class="index-boxTitle" slot="boxTitle">个人中心</h4>
    <div class="userInfo">
      <el-tabs
        tab-position="left"
        style="height: 500px"
        v-if="!isEmploymentDetails && !isPostDetails"
        :value="tabValue"
      >
        <el-tab-pane label="我的账号信息" class="user" name="1">
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
                >修改密码</el-button
              >
              <el-button round v-else @click="cancelUpdatePassword"
                >取消修改</el-button
              >
            </li>
          </ul>
          <div id="updatePassword" v-if="isUpdatePassword">
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
            <el-button type="primary" round @click="updatePassword"
              >确认修改</el-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的简历" class="resume" name="2">
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
        <el-tab-pane label="我的收藏" class="collection" name="3">
          <ul v-if="!isEmploymentDetails">
            <li
              v-for="item in collectionList"
              :key="item.employmentid"
              @click="toEmploymentDetails"
            >
              <p class="salary"><span>{{ item.salaryStart }} - {{ item.salaryEnd }}</span></p>
              <el-tag class="isFullTime">{{showIsFullTime(item.isFullTime)}}</el-tag>
              <p class="station">{{ item.station }}</p>
              <p class="jobMsg">
                <span>{{ item.location }}</span>
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
        <el-tab-pane label="我的投递" class="resumeSent" name="4">
          <ul>
            <li v-for="item in resumeSentList" :key="item.sentid">
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
        <el-tab-pane label="我的发布" name="5">
          <forum-box
            class="forumBox"
            :tab="0"
            :pageSize="6"
            @itemClick="toPostDetails"
          ></forum-box>
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
        @addComment="addComment"
      ></forum-details>
    </div>
  </div>
</template>

<script>
import Resume from "../components/resume.vue";
import EmploymentDetails from "../components/employmentDetails.vue";
import ForumBox from "../components/forumBox.vue";
import ForumDetails from "../components/forumDetails.vue";

export default {
  components: { Resume, EmploymentDetails, ForumBox, ForumDetails },
  data() {
    return {
      tabValue:"1",//选项卡的值，默认为第一个
      isUpdatePassword: false, //修改密码界面，默认为否
      isEmploymentDetails: false, //是否是招聘信息详情页，默认为否
      isPostDetails: false, //是否是帖子详情页，默认为否
      oldPassword: "", //旧密码
      newPassword: "", //新密码
      userInfo: {
        //用户信息
        username: "zhalisu", //用户名
        password: "", //密码
        role: "学生", //角色身份
        collections: [], //收藏的招聘信息列表
      },
      resumeInfo: {},//简历信息
      educationInfo: [],//教育信息
      internshipInfo: [],//实习经历
      projectInfo: [],//项目经历
      skillInfo: [], //技能
      certificateInfo: [], //证书
      campusExperienceInfo: [],//校内经历
      collectionList: [], //收藏招聘信息列表
      employmentDetails: {
        //某个招聘信息的详情
        employmentid: 1,
        isCollect: true, //是否收藏该招聘信息
        isFullTime: true,
        station: "高级产品经理",
        salary: "10-20k",
        location: "北京",
        education: "本科",
        company: "字节跳动",
        trade: "互联网",
        level: "已上市",
        introduction:
          "1、对国家政策、产业环境、市场规模等进行洞察，结合客户需求进行痛点分析，聚焦功能需求，适配相关解决方案。2、根据市场洞察，结合客户需求，孵化数字政府相关解决方案，协同合作伙伴进行落地支撑；3、进行产业环境分析，对服务区域的主导产业进行分析研究，结合方案进行信息化平台的售前工作，4、根据项目需求进行实地调研，可独立输出PPT以及WORD等相关报告，能够适应中短期出差。",
        requirements:
          "1、具备良好的沟通表达能力和组织协调能力，懂政府语言，团队意识强，抗压能力强，有激情，勇于接受挑战，善于开拓创新。2、至少精通生物医药、新一代信息技术等战新产业体系中的一个，熟悉行业领域格局。可独立宇客户进行业务交流。具备需求调研、服务解决方案设计能力。3、5年以上车联网、人工智能、生物医药、文旅行业领域从业经验，过往工作经历中有产业研究，信息化咨询、解决方案售前等相关工作经验，获得相关证书者优先。",
      },
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
      postDetails: {
        //某个帖子的详情
        postid: 1,
        title: "hhh",
        content: "hahaha",
        author: "发布者",
        createTime: "2021.04.07",
        zone: "我要提问",
      },
    };
  },
  methods: {
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
    //实习或全职转文字显示
    showIsFullTime(val) {
      switch (val) {
        case 0:
          return "实习";
        case 1:
          return "全职";
      }
    },
    //查看招聘信息详情
    toEmploymentDetails() {
      this.isEmploymentDetails = true;
      this.tabValue = 3;
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
    toPostDetails() {
      this.isPostDetails = true;
      this.tabValue = 5;
    },
    //帖子详情返回列表
    toPostList() {
      this.isPostDetails = false;
    },
    //发布评论
    addComment() {
      
    },
  },
  mounted() {
    let that = this;
    this.$ajax.get("/user/getResume/" + "aaa").then(res => {
      that.resumeInfo = res.data.resume;
      that.educationInfo = res.data.education;
      that.internshipInfo = res.data.internship;
      that.projectInfo = res.data.project;
      that.campusExperienceInfo = res.data.campusExperience;
      that.skillInfo = res.data.skill;
      that.certificateInfo = res.data.certificate;
      for(let item in that.educationInfo) {
        that.educationInfo[item].duration = that.educationInfo[item].duration.split(',')
      }
      for(let item in that.internshipInfo) {
        that.internshipInfo[item].duration = that.internshipInfo[item].duration.split(',')
      }
      for(let item in that.projectInfo) {
        that.projectInfo[item].duration = that.projectInfo[item].duration.split(',')
      }
      for(let item in that.campusExperienceInfo) {
        that.campusExperienceInfo[item].duration = that.campusExperienceInfo[item].duration.split(',')
      }
    })
    this.$ajax.get("/user/getCollectList/" + "aaa").then(res => {
      that.collectionList = res.data;
    })
  }
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
#userStudent #forumBox {
  width: 87%;
  margin-top: -11vh;
}
#userStudent #forumBox ul {
  height: 440px;
}
</style>