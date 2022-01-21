<template>
  <div id="user">
    <i class="el-icon-user index-icon" slot="icon"></i>
    <h4 class="index-boxTitle" slot="boxTitle">个人中心</h4>
    <div id="userInfo">
      <el-tabs tab-position="left" style="height: 500px">
        <el-tab-pane label="我的个人信息" class="user">
          <h5>个人信息</h5>
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
        <el-tab-pane label="我的简历" class="resume">
          <el-button type="primary" round @click="" id="updateResume"
            >更新简历</el-button
          >
          <h5>简历信息</h5>
          <div id="resumeReadBox">
            <div id="resumeRead">
              <p>{{ resumeInfo.realname }}</p>
              <ul class="row1">
                <li>
                  {{ resumeInfo.sex }}
                </li>
                <li>
                  <img src="../assets/image/icon/birth.svg" alt="生日图标" />
                  {{ resumeInfo.birth }}
                </li>
                <li>
                  <img
                    src="../assets/image/icon/education.svg"
                    alt="学历图标"
                  />
                  {{ resumeInfo.highesteducation }}
                </li>
              </ul>
              <ul class="row2">
                <li>
                  <img src="../assets/image/icon/tel.svg" alt="电话图标" />
                  {{ resumeInfo.tel }}
                </li>
                <li>
                  <img
                    src="../assets/image/icon/email.svg"
                    alt="电子邮箱图标"
                  />
                  {{ resumeInfo.email }}
                </li>
              </ul>
              <ul class="row3">
                <li>
                  <img src="../assets/image/icon/position.svg" alt="职位图标" />
                  {{ resumeInfo.expectedPosition }}
                </li>
              </ul>
            </div>
            <div id="educationRead">
              <h6>教育经历</h6>
              <ul>
                <li v-for="item in educationInfo" :key="item.educationid">
                  <div class="row1">
                    <p class="school">{{ item.school }}</p>
                    <p class="duration">{{ item.duration }}</p>
                  </div>
                  <div class="row2">
                    <p class="qualification">{{ item.qualification }}</p>
                    <p class="specialty">{{ item.specialty }}</p>
                    <p class="gpa">{{ item.gpa }}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div id="internshipRead">
              <h6>实习经历</h6>
              <ul>
                <li v-for="item in internshipInfo" :key="item.internshipid">
                  <div class="row1">
                    <p class="company">{{ item.company }}</p>
                    <p class="duration">{{ item.duration }}</p>
                  </div>
                  <div class="row2">
                    <p class="position">{{ item.position }}</p>
                  </div>
                  <div class="row3">
                    <p class="content">{{ item.content }}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div id="projectRead">
              <h6>项目经历</h6>
              <ul>
                <li v-for="item in projectInfo" :key="item.projectid">
                  <div class="row1">
                    <p class="name">{{ item.name }}</p>
                    <p class="duration">{{ item.duration }}</p>
                  </div>
                  <div class="row2">
                    <p class="role">{{ item.role }}</p>
                  </div>
                  <div class="row3">
                    <p class="content">{{ item.content }}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div id="campusExperienceRead">
              <h6>校内经历</h6>
              <ul>
                <li
                  v-for="item in campusExperienceInfo"
                  :key="item.campusExperienceId"
                >
                  <div class="row1">
                    <p class="name">{{ item.name }}</p>
                    <p class="duration">{{ item.duration }}</p>
                  </div>
                  <div class="row2">
                    <p class="role">{{ item.role }}</p>
                  </div>
                  <div class="row3">
                    <p class="content">{{ item.content }}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div id="skillCertificateBox">
              <div id="skillRead">
                <h6>技能</h6>
                <ul>
                  <li v-for="(item, index) in skillInfo" :key="index">
                    <img
                      src="../assets/image/icon/skill.svg"
                      alt="技能图标"
                    />{{ item }}
                  </li>
                </ul>
              </div>
              <div id="certificateRead">
                <h6>证书</h6>
                <ul>
                  <li v-for="(item, index) in certificateInfo" :key="index">
                    <img
                      src="../assets/image/icon/certificate.svg"
                      alt="证书图标"
                    />{{ item }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="block"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的收藏" class="collection">
          <ul>
            <li v-for="item in collectionList" :key="item.employmentid">
              <p class="salary">{{ item.salary }}</p>
              <p class="station">{{ item.station }}</p>
              <p class="jobMsg">
                <span>{{ item.location }}</span>
                <span>{{ item.education }}</span>
              </p>
              <p class="companyMsg">
                <span>{{ item.company }}</span>
                <span>{{ item.trade }}</span>
                <span>{{ item.level }}</span>
              </p>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="我的投递">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isUpdatePassword: false, //修改密码界面，默认为否
      oldPassword: "", //旧密码
      newPassword: "", //新密码
      userInfo: {
        //用户信息
        username: "zhalisu", //用户名
        password: "", //密码
        role: "学生", //角色身份
        collections: [], //收藏的招聘信息列表
      },
      resumeInfo: {
        //简历信息
        resumeid: "", //简历编号
        username: "",
        realname: "查理苏", //真实姓名
        birth: "1998.1.2", //出生日期
        sex: "男", //性别
        tel: "13711447629", //联系方式
        email: "605697557@qq.com", //电子邮箱
        highesteducation: "本科", //最高学历
        school: "", //毕业学校
        expectedPosition: "总裁", //期望职位
      },
      educationInfo: [
        //教育信息
        {
          educationid: 1, //教育信息编号
          username: "",
          school: "哈佛大学", //学校名
          duration: "2018.9-2022.7", //时间段
          qualification: "本科", //学历
          specialty: "挖掘机", //专业
          gpa: "4.0", //绩点
        },
      ],
      internshipInfo: [
        //实习经历
        {
          internshipid: 1, //实习经历编号
          username: "",
          company: "某某公司", //公司名称
          duration: "2018.9-2022.7", //时间段
          position: "前端开发", //职位名称
          content:
            "◆ 实现商城平台及其管理，包含商品搜索、订单管理等功能。◆ 前端使用 layui 框架，后台使用 mybatis+springboot+springmvc 技术。", //工作内容
        },
      ],
      projectInfo: [
        //项目经历
        {
          projectid: 1, //项目经历编号
          username: "",
          name: "社区管理系统“社区小管家”", //项目名称
          role: "前端开发", //项目角色
          duration: "2018.9-2022.7", //时间段
          content:
            "为帮助社区管理而开发的系统，涵盖了社区内管理多项功能如车位管理、物业人员管理等。◆ 负责系统前端页面开发，独立完成管理员模块首页等功能开发，组件化开发网站菜单栏。◆ 使用 Vue 框架+elementUI 组件库，采用前后端分离进行开发", //项目内容
        },
      ],
      skillInfo: ["html", "css"], //技能
      certificateInfo: ["英语六级", "英语四级"], //证书
      campusExperienceInfo: [
        //校内经历
        {
          campusExperienceId: 1, //校内经历 大写的！！不行改！！！！！
          username: "",
          name: "计算机学院团委红十字会", //部门或活动名称
          role: "副部长", //在部门或活动中担任的角色
          duration: "2018.9-2022.7", //时间段
          content:
            "带领小干策划组织游园、防艾讲座、成分血献血等活动。◆ 获得红十字会先进个人及 2019-2020 年度优秀学生干部奖学金。", //部门工作内容或活动内容
        },
      ],
      collectionList: [
        {
          employmentid: 1,
          isFullTime: true,
          station: "高级产品经理",
          salary: "10-20k",
          location: "北京",
          education: "本科",
          company: "字节跳动",
          trade: "互联网",
          level: "已上市",
        },
        {
          employmentid: 1,
          isFullTime: true,
          station: "高级产品经理",
          salary: "10-20k",
          location: "北京",
          education: "本科",
          company: "字节跳动",
          trade: "互联网",
          level: "已上市",
        },
        {
          employmentid: 1,
          isFullTime: true,
          station: "高级产品经理",
          salary: "10-20k",
          location: "北京",
          education: "本科",
          company: "字节跳动",
          trade: "互联网",
          level: "已上市",
        },
        {
          employmentid: 1,
          isFullTime: true,
          station: "高级产品经理",
          salary: "10-20k",
          location: "北京",
          education: "本科",
          company: "字节跳动",
          trade: "互联网",
          level: "已上市",
        },
        {
          employmentid: 1,
          isFullTime: true,
          station: "高级产品经理",
          salary: "10-20k",
          location: "北京",
          education: "本科",
          company: "字节跳动",
          trade: "互联网",
          level: "已上市",
        },
        {
          employmentid: 1,
          isFullTime: true,
          station: "高级产品经理",
          salary: "10-20k",
          location: "北京",
          education: "本科",
          company: "字节跳动",
          trade: "互联网",
          level: "已上市",
        },
        {
          employmentid: 1,
          isFullTime: true,
          station: "高级产品经理",
          salary: "10-20k",
          location: "北京",
          education: "本科",
          company: "字节跳动",
          trade: "互联网",
          level: "已上市",
        },
        {
          employmentid: 1,
          isFullTime: true,
          station: "高级产品经理",
          salary: "10-20k",
          location: "北京",
          education: "本科",
          company: "字节跳动",
          trade: "互联网",
          level: "已上市",
        },
      ], //收藏招聘信息列表
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
  },
};
</script>

<style>
#userInfo {
  clear: both;
  width: 100%;
  height: 500px;
  float: left;
  margin-top: 5vh;
  margin-left: 3vw;
}
#userInfo .el-tab-pane {
  margin-left: 2vw;
}
#userInfo h5 {
  width: 100%;
  font-size: 1.1rem;
  height: 5vh;
  line-height: 5vh;
  margin-bottom: 5vh;
}
/* 账号信息 */
.user li {
  margin-bottom: 3vh;
}
#updatePassword {
  width: 30%;
}
#updatePassword .el-input {
  margin-bottom: 2vh;
}
#updateResume {
  float: right;
  margin-right: 3vw;
}
/* 模块样式 */
#resumeRead,
#educationRead,
#internshipRead,
#projectRead,
#campusExperienceRead {
  padding-bottom: 30px;
}
#resumeReadBox {
  width: 85%;
  height: 500px;
  overflow: auto;
}
/* 简历信息 */
#resumeRead p {
  font-size: 1.4rem;
  height: 4vh;
  line-height: 4vh;
  margin-bottom: 25px;
  font-weight: 600;
}
#resumeRead ul {
  width: 100%;
}
#resumeRead li:not(:last-child) {
  float: left;
}
#resumeRead li {
  font-size: 14px;
  height: 15px;
  line-height: 15px;
  vertical-align: middle;
}
#resumeRead .row1,
#resumeRead .row2 {
  margin-bottom: 18px;
}
#resumeRead li:not(:last-child)::after {
  content: "";
  display: inline-block;
  height: 12px;
  width: 1px;
  background: #70707077;
  vertical-align: middle;
  margin: 0 20px;
}
#resumeRead img {
  width: 15px;
  height: 15px;
  vertical-align: middle;
  margin-right: 5px;
}
/* 板块标题样式 */
#userInfo h6 {
  font-size: 1.2rem;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
}
#userInfo h6::before {
  content: "";
  display: inline-block;
  width: 5px;
  height: 14px;
  background: #99bddf;
  margin-right: 10px;
}
/* 教育经历，实习经历，项目经历，校内经历 */
#educationRead li,
#internshipRead li,
#projectRead li,
#campusExperienceRead li {
  padding: 20px 50px;
  font-size: 0.9rem;
}
#educationRead p:not(.duration, .gpa),
#internshipRead .company,
#projectRead .name,
#campusExperienceRead .name {
  float: left;
}
#educationRead .school,
#internshipRead .company,
#projectRead .name,
#campusExperienceRead .name {
  margin-right: 20px;
  font-weight: 600;
  font-size: 1rem;
}
#educationRead .duration,
#internshipRead .duration,
#projectRead .duration,
#campusExperienceRead .duration {
  color: #707070be;
}
#educationRead .row1,
#internshipRead .row1,
#projectRead .row1,
#campusExperienceRead .row1 {
  margin-bottom: 15px;
}
#educationRead .row2 p {
  margin-right: 10px;
}
#internshipRead .row2 p,
#projectRead .row2 p,
#campusExperienceRead .row2 p {
  margin-bottom: 15px;
  font-weight: 700;
  color: #707070;
}
#userInfo .content {
  line-height: 1.5rem;
}
/* 技能，证书 */
#skillCertificateBox {
  display: flex;
}
#skillRead,
#certificateRead {
  width: 50%;
  flex: 1;
}
#skillRead img,
#certificateRead img {
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: middle;
  margin-right: 10px;
}
#skillRead li,
#certificateRead li {
  margin-left: 50px;
  font-size: 0.9rem;
  height: 2rem;
  line-height: 2rem;
  vertical-align: middle;
}
#userInfo .block {
  width: 85%;
  height: 100px;
}
/* 我的收藏 */
#user .collection {
  width: 87%;
  padding: 1%;
  height: 500px;
  overflow: auto;
}
#user .collection li {
  width: 95%;
  height: 18%;
  padding: 1.8%;
  margin-bottom: 2%;
  border: #8e909421 1px solid;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.05);
}
#user .collection .salary {
  float: right;
  color: #72b3f0;
  font-size: 1.2rem;
}
#user .collection .jobMsg,
#user .collection .companyMsg {
  color: #8e9094;
  margin-top: 1%;
  font-size: 0.8rem;
}
#user .collection li:hover {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
}
#user .collection li:hover .station{
  color: #72b3f0;
}
#user .collection span {
  margin-right: 0.5%;
}
</style>