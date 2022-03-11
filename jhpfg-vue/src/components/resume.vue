<template>
  <div id="resume">
    <el-button
      type="primary"
      round
      v-if="!isUpdateResume"
      @click="openUpdateResume"
    >更新简历</el-button>
    <div
      id="resumeReadBox"
      v-if="!isUpdateResume"
    >
      <div id="resumeRead">
        <p>{{ resumeInfo.realname }}</p>
        <ul class="row1">
          <li>
            {{ resumeInfo.sex }}
          </li>
          <li>
            <img
              src="../assets/image/icon/birth.svg"
              alt="生日图标"
            />
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
            <img
              src="../assets/image/icon/tel.svg"
              alt="电话图标"
            />
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
            <img
              src="../assets/image/icon/position.svg"
              alt="职位图标"
            />
            {{ resumeInfo.expectedPosition }}
          </li>
        </ul>
      </div>
      <div id="educationRead">
        <h6 class="readTitle">教育经历</h6>
        <ul>
          <li
            v-for="item in educationInfo"
            :key="item.id"
          >
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
        <h6 class="readTitle">实习经历</h6>
        <ul>
          <li
            v-for="item in internshipInfo"
            :key="item.id"
          >
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
        <h6 class="readTitle">项目经历</h6>
        <ul>
          <li
            v-for="item in projectInfo"
            :key="item.id"
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
      <div id="campusExperienceRead">
        <h6 class="readTitle">校内经历</h6>
        <ul>
          <li
            v-for="item in campusExperienceInfo"
            :key="item.id"
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
          <h6 class="readTitle">技能</h6>
          <ul>
            <li
              v-for="(item, index) in skillInfo"
              :key="index"
            >
              <img
                src="../assets/image/icon/skill.svg"
                alt="技能图标"
              />{{
                item
              }}
            </li>
          </ul>
        </div>
        <div id="certificateRead">
          <h6 class="readTitle">证书</h6>
          <ul>
            <li
              v-for="(item, index) in certificateInfo"
              :key="index"
            >
              <img
                src="../assets/image/icon/certificate.svg"
                alt="证书图标"
              />{{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      id="updateResume"
      v-if="isUpdateResume"
    >
      <el-button
        type="primary"
        round
        v-if="isUpdateResume"
        @click="updateResume"
        class="updateButton"
      >确认更新</el-button>
      <el-button
        round
        v-if="isUpdateResume"
        @click="cancelUpdateResume"
        class="cancelButton"
      >取消更新</el-button>
      <div id="updateResumeBox">
        <h5>个人信息</h5>
        <el-form
          ref="editResume.resumeInfo"
          :model="editResume.resumeInfo"
          label-width="80px"
        >
          <el-form-item label="姓名">
            <el-input v-model="editResume.resumeInfo.realname" />
          </el-form-item>
          <el-form-item label="期待职位">
            <el-input v-model="editResume.resumeInfo.expectedPosition" />
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="editResume.resumeInfo.birth"
              type="date"
            />
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="editResume.resumeInfo.sex">
              <el-option
                label="男"
                value="0"
              ></el-option>
              <el-option
                label="女"
                value="1"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="editResume.resumeInfo.tel" />
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="editResume.resumeInfo.email" />
          </el-form-item>
          <el-form-item label="毕业学校">
            <el-input v-model="editResume.resumeInfo.school" />
          </el-form-item>
          <el-form-item label="最高学历">
            <el-input v-model="editResume.resumeInfo.highesteducation" />
          </el-form-item>
        </el-form>
      </div>
      <div id="updateEducationBox">
        <h5>教育信息</h5>
        <el-button
          type="primary"
          icon="el-icon-plus"
          circle
          @click="addEducation"
          class="addButton"
          size="small"
        />
        <el-form
          v-for="(item, index) in educationLength"
          :key="index"
          :model="editResume.educationInfo[item]"
          label-width="80px"
        >
          <el-form-item label="学校">
            <el-input v-model="editResume.educationInfo[index].school" />
          </el-form-item>
          <el-form-item label="学历">
            <el-input v-model="editResume.educationInfo[index].qualification" />
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="editResume.educationInfo[index].specialty" />
          </el-form-item>
          <el-form-item label="绩点">
            <el-input v-model="editResume.educationInfo[index].gpa" />
          </el-form-item>
          <el-form-item label="时间段">
            <el-date-picker
              v-model="editResume.educationInfo[index].duration"
              unlink-panels
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-minus"
              circle
              @click="reduceEducation(index)"
              class="reduceButton"
              size="small"
            />
          </el-form-item>
        </el-form>
      </div>
      <div id="updateInternshipBox">
        <h5>实习经历</h5>
        <el-button
          type="primary"
          icon="el-icon-plus"
          circle
          @click="addInternship"
          class="addButton"
          size="small"
        />
        <el-form
          v-for="(item, index) in internshipLength"
          :key="index"
          :model="editResume.internshipInfo[item]"
          label-width="80px"
        >
          <el-form-item label="公司">
            <el-input v-model="editResume.internshipInfo[index].company" />
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="editResume.internshipInfo[index].position" />
          </el-form-item>
          <el-form-item label="时间段">
            <el-date-picker
              v-model="editResume.internshipInfo[index].duration"
              unlink-panels
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="工作内容"
            class="content"
          >
            <el-input
              type="textarea"
              v-model="editResume.internshipInfo[index].content"
              resize="none"
              :rows="5"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-minus"
              circle
              @click="reduceInternship(index)"
              class="reduceButton"
              size="small"
            />
          </el-form-item>
        </el-form>
      </div>
      <div id="updateProjectBox">
        <h5>项目经历</h5>
        <el-button
          type="primary"
          icon="el-icon-plus"
          circle
          @click="addProject"
          class="addButton"
          size="small"
        />
        <el-form
          v-for="(item, index) in projectLength"
          :key="index"
          :model="editResume.projectInfo[item]"
          label-width="80px"
        >
          <el-form-item label="项目名称">
            <el-input v-model="editResume.projectInfo[index].name" />
          </el-form-item>
          <el-form-item label="项目角色">
            <el-input v-model="editResume.projectInfo[index].role" />
          </el-form-item>
          <el-form-item label="时间段">
            <el-date-picker
              v-model="editResume.projectInfo[index].duration"
              unlink-panels
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="项目内容"
            class="content"
          >
            <el-input
              type="textarea"
              v-model="editResume.projectInfo[index].content"
              resize="none"
              :rows="5"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-minus"
              circle
              @click="reduceProject(index)"
              class="reduceButton"
              size="small"
            />
          </el-form-item>
        </el-form>
      </div>
      <div id="updateCampusExperienceBox">
        <h5>校内经历</h5>
        <el-button
          type="primary"
          icon="el-icon-plus"
          circle
          @click="addCampusExperience"
          class="addButton"
          size="small"
        />
        <el-form
          v-for="(item, index) in campusExperienceLength"
          :key="index"
          :model="editResume.campusExperienceInfo[item]"
          label-width="80px"
        >
          <el-form-item label="部门或活动名称">
            <el-input v-model="editResume.campusExperienceInfo[index].name" />
          </el-form-item>
          <el-form-item label="担任角色">
            <el-input v-model="editResume.campusExperienceInfo[index].role" />
          </el-form-item>
          <el-form-item label="时间段">
            <el-date-picker
              v-model="editResume.campusExperienceInfo[index].duration"
              unlink-panels
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="内容"
            class="content"
          >
            <el-input
              type="textarea"
              v-model="editResume.campusExperienceInfo[index].content"
              resize="none"
              :rows="5"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-minus"
              circle
              @click="reduceCampusExperience(index)"
              class="reduceButton"
              size="small"
            />
          </el-form-item>
        </el-form>
      </div>
      <div id="updateSkillBox">
        <h5>技能</h5>
        <el-button
          type="primary"
          icon="el-icon-plus"
          circle
          @click="addSkill"
          class="addButton"
          size="small"
        />
        <el-form
          v-for="(item, index) in skillLength"
          :key="index"
          :model="editResume.skillInfo[item]"
          label-width="80px"
        >
          <el-form-item label="名称">
            <el-input v-model="editResume.skillInfo[index]" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-minus"
              circle
              @click="reduceSkill(index)"
              class="reduceButton"
              size="small"
            />
          </el-form-item>
        </el-form>
      </div>
      <div id="updateCertificateBox">
        <h5>证书</h5>
        <el-button
          type="primary"
          icon="el-icon-plus"
          circle
          @click="addCertificate"
          class="addButton"
          size="small"
        />
        <el-form
          v-for="(item, index) in certificateLength"
          :key="index"
          :model="editResume.certificateInfo[item]"
          label-width="80px"
        >
          <el-form-item label="名称">
            <el-input v-model="editResume.certificateInfo[index]" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-minus"
              circle
              @click="reduceCertificate(index)"
              class="reduceButton"
              size="small"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      isUpdateResume: false, //是否打开更新简历窗口，默认为否
      educationLength: 1, //教育经历的长度
      internshipLength: 1, //实习经历的长度
      projectLength: 1, //项目经历的长度
      campusExperienceLength: 1, //校内经历的长度
      skillLength: 2, //技能的长度
      certificateLength: 2, //证书的长度
      editResume: {
        resumeInfo: {
          id: 1, //简历编号
          username: "aaa",
          realname: "查理苏", //真实姓名
          birth: "1998.1.2", //出生日期
          sex: "女", //性别
          tel: "13711447629", //联系方式
          email: "605697557@qq.com", //电子邮箱
          highesteducation: "本科", //最高学历
          school: "", //毕业学校
          expectedPosition: "总裁", //期望职位
        },
        educationInfo: [
          {
            id: 1, //教育信息编号
            username: "aaa",
            school: "哈佛大学", //学校名
            duration: [], //时间段
            qualification: "本科", //学历
            specialty: "挖掘机", //专业
            gpa: "4.0", //绩点
          },
          {
            id: 2, //教育信息编号
            username: "aaa",
            school: "哈佛大学", //学校名
            duration: [], //时间段
            qualification: "本科", //学历
            specialty: "挖掘机", //专业
            gpa: "4.0", //绩点
          },
        ],
        internshipInfo: [
          //实习经历
          {
            id: 1, //实习经历编号
            username: "aaa",
            company: "某某公司", //公司名称
            duration: [], //时间段
            position: "前端开发", //职位名称
            content:
              "◆ 实现商城平台及其管理，包含商品搜索、订单管理等功能。◆ 前端使用 layui 框架，后台使用 mybatis+springboot+springmvc 技术。", //工作内容
          },
        ],
        projectInfo: [
          //项目经历
          {
            id: 1, //项目经历编号
            username: "aaa",
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
            id: 1, //校内经历编号
            username: "aaa",
            name: "计算机学院团委红十字会", //部门或活动名称
            role: "副部长", //在部门或活动中担任的角色
            duration: [], //时间段
            content:
              "带领小干策划组织游园、防艾讲座、成分血献血等活动。◆ 获得红十字会先进个人及 2019-2020 年度优秀学生干部奖学金。", //部门工作内容或活动内容
          },
        ],
      },
    };
  },
  props: {
    resumeInfo: Object,
    educationInfo: Array,
    internshipInfo: Array,
    projectInfo: Array,
    skillInfo: Array,
    certificateInfo: Array,
    campusExperienceInfo: Array,
  },
  methods: {
    //点击更新简历按钮
    openUpdateResume() {
      this.isUpdateResume = true;
    },
    //确定更新简历
    updateResume() {
      let skill = this.editResume.skillInfo.join(",");
      let certificate = this.editResume.certificateInfo.join(",");
      let obj = Object.assign({}, this.editResume.resumeInfo);
      obj.skill = skill;
      obj.certificate = certificate;
      let that = this;
      this.$ajax
        .post("/user/updateResume", qs.stringify(obj), {
          "content-type": "application/x-www-form-urlencoded",
        })
        .then(() => {
          for (let item in that.editResume.educationInfo) {
            that.$ajax.post(
              "/user/updateEducation",
              qs.stringify(that.editResume.educationInfo[item]),
              {
                "content-type": "application/x-www-form-urlencoded",
              }
            );
          }
        })
        .then(() => {
          for (let item in that.editResume.internshipInfo) {
            that.$ajax.post(
              "/user/updateInternship",
              qs.stringify(that.editResume.internshipInfo[item]),
              {
                "content-type": "application/x-www-form-urlencoded",
              }
            );
            console.log(that.internshipInfo[item])
          }
        })
        .then(() => {
          for (let item in that.editResume.projectInfo) {
            that.$ajax.post(
              "/user/updateProject",
              qs.stringify(that.editResume.projectInfo[item]),
              {
                "content-type": "application/x-www-form-urlencoded",
              }
            );
          }
        })
        .then(() => {
          for (let item in that.editResume.campusExperienceInfo) {
            that.$ajax.post(
              "/user/updateCampusExperience",
              qs.stringify(that.editResume.campusExperienceInfo[item]),
              {
                "content-type": "application/x-www-form-urlencoded",
              }
            );
          }
        })
        .then(() => {
          that.$message.success("更新成功");
          that.isUpdateResume = false;
        });
    },
    //取消更新简历
    cancelUpdateResume() {
      this.isUpdateResume = false;
    },
    //添加一项教育经历
    addEducation() {
      let obj = {};
      obj.educationid = "";
      obj.username = "";
      obj.school = "";
      obj.duration = [];
      obj.qualification = "";
      obj.specialty = "";
      obj.gpa = "";
      this.editResume.educationInfo[this.editResume.educationInfo.length] = obj;
      this.educationLength += 1;
    },
    //减少一项教育经历
    reduceEducation(index) {
      this.editResume.educationInfo.splice(index, 1);
      this.educationLength -= 1;
    },
    //添加一项实习经历
    addInternship() {
      let obj = {};
      obj.internshipid = "";
      obj.username = "";
      obj.company = "";
      obj.duration = [];
      obj.position = "";
      obj.content = "";
      this.editResume.internshipInfo[this.editResume.internshipInfo.length] =
        obj;
      this.internshipLength += 1;
    },
    //减少一项实习经历
    reduceInternship(index) {
      this.editResume.internshipInfo.splice(index, 1);
      this.internshipLength -= 1;
    },
    //添加一项项目经历
    addProject() {
      let obj = {};
      obj.projectid = "";
      obj.username = "";
      obj.name = "";
      obj.role = "";
      obj.duration = [];
      obj.content = "";
      this.editResume.projectInfo[this.editResume.projectInfo.length] = obj;
      this.projectLength += 1;
    },
    //减少一项项目经历
    reduceProject(index) {
      this.editResume.projectInfo.splice(index, 1);
      this.projectLength -= 1;
    },
    //增加一项校内经历
    addCampusExperience() {
      let obj = {};
      obj.campusExperienceId = "";
      obj.username = "";
      obj.name = "";
      obj.role = "";
      obj.duration = [];
      obj.content = "";
      this.editResume.campusExperienceInfo[
        this.editResume.campusExperienceInfo.length
      ] = obj;
      this.campusExperienceLength += 1;
    },
    //减少一项校内经历
    reduceCampusExperience(index) {
      this.editResume.campusExperienceInfo.splice(index, 1);
      this.campusExperienceLength -= 1;
    },
    //添加一项技能
    addSkill() {
      let str = "";
      this.editResume.skillInfo[this.editResume.skillInfo.length] = str;
      this.skillLength += 1;
    },
    //减少一项技能
    reduceSkill(index) {
      this.editResume.skillInfo.splice(index, 1);
      this.skillLength -= 1;
    },
    //添加一项证书
    addCertificate() {
      let str = "";
      this.editResume.certificateInfo[this.editResume.certificateInfo.length] =
        str;
      this.certificateLength += 1;
    },
    //减少一项证书
    reduceCertificate(index) {
      this.editResume.certificateInfo.splice(index, 1);
      this.certificateLength -= 1;
    },
  },
};
</script>

<style>
#resume .el-button:first-of-type {
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
#resumeReadBox,
#updateResume {
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
#resume .readTitle {
  font-size: 1.2rem;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
}
#resume .readTitle::before {
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
/* 更新简历窗口 */
#updateResume h5 {
  margin: 4% 0;
  font-weight: 600;
}
#updateResume .el-form {
  display: flex;
  flex-wrap: wrap;
}
#updateResumeBox .el-form-item,
#updateEducationBox .el-form-item:not(:last-of-type),
#updateInternshipBox .el-form-item:nth-of-type(1),
#updateInternshipBox .el-form-item:nth-of-type(2),
#updateProjectBox .el-form-item:nth-of-type(1),
#updateProjectBox .el-form-item:nth-of-type(2),
#updateCampusExperienceBox .el-form-item:nth-of-type(1),
#updateCampusExperienceBox .el-form-item:nth-of-type(2) {
  flex: 0 1 auto;
  width: 44%;
  margin-right: 5%;
  margin-bottom: 1.5%;
}
#updateEducationBox,
#updateInternshipBox,
#updateProjectBox,
#updateCampusExperienceBox,
#updateSkillBox,
#updateCertificateBox {
  position: relative;
}
#updateEducationBox .reduceButton {
  position: absolute;
  left: 20vw;
}
#updateResume .addButton {
  position: absolute;
  top: -11px;
  left: 80px;
}
#updateResume
  .el-form:not(:last-of-type, #updateSkillBox .el-form, #updateCertificateBox
    .el-form) {
  margin-bottom: 3%;
}
/* 更新简历-实习经历，项目经历 */
#updateResume .content {
  width: 85%;
}
#updateInternshipBox .reduceButton,
#updateProjectBox .reduceButton,
#updateCampusExperienceBox .reduceButton {
  position: absolute;
  left: -2.7vw;
  top: 14vh;
}
/* 更新简历-右侧两个按钮 */
#updateResume .updateButton {
  position: absolute;
  right: -3vw;
}
#updateResume .cancelButton {
  position: absolute;
  right: 0vw;
  top: 15vh;
}
</style>