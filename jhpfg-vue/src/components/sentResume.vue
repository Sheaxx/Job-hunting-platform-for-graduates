<template>
  <div id="sentResume">
    <h4>已投递列表</h4>
    <el-button
      round
      @click="back"
    >返回</el-button>
    <div class="userList">
      <ul>
        <li
          v-for="item in userList"
          :key="item.username"
          @click="itemClick(item.username)"
        >
          <h5>{{item.realname}}</h5>
          <h6>{{item.school}}</h6>
        </li>
      </ul>
    </div>
    <div class="resumeContainer">
      <resume
        :resumeInfo="resumeInfo"
        :educationInfo="educationInfo"
        :internshipInfo="internshipInfo"
        :projectInfo="projectInfo"
        :campusExperienceInfo="campusExperienceInfo"
        :skillInfo="skillInfo"
        :certificateInfo="certificateInfo"
      ></resume>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import Resume from "../components/resume.vue";

export default {
  components: { Resume },
  props: {
    employment: Object,
  },
  data() {
    return {
      userList: [], //投递者列表
      resumeInfo: {},
      educationInfo: [],
      internshipInfo: [],
      projectInfo: [], //项目经历
      skillInfo: [], //技能
      certificateInfo: [], //证书
      campusExperienceInfo: [], //校内经历
    };
  },
  methods: {
    //返回
    back() {
      this.$emit("sentResumeBack");
    },
    //点击用户列表
    itemClick(username) {
      let that = this;
      this.$ajax.get("/user/getResume/" + username).then((res) => {
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
    },
  },
  mounted() {
    console.log(this.employment)
    let that = this;
    this.$ajax
      .get("/user/getRealnameSchool/" + this.employment.sentUsers)
      .then((res) => {
        that.userList = res.data;
        that.$ajax
          .get("/user/getResume/" + that.userList[0].username)
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
      });
  },
};
</script>

<style>
#sentResume {
  height: 76vh;
  width: 81vw;
  background: #fff;
  position: absolute;
  top: -5vh;
  left: -1vw;
  padding: 3vh 3vw;
}
#sentResume .el-button:first-of-type {
  position: absolute;
  top: 2%;
  right: -3%;
}
#sentResume h4 {
  font-size: 1.2rem;
}
#sentResume .userList ul {
  margin-top: 2vh;
  width: 20%;
  height: 74vh;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  overflow-y: auto;
}
#sentResume .userList li {
  height: 30px;
  padding: 7%;
}
#sentResume .userList li:not(:last-of-type) {
  border-bottom: #8e90943d 1px solid;
}
#sentResume .userList li:hover h5,
#sentResume .userList li:hover h6 {
  color: #72b3f0;
}
#sentResume .userList h5 {
  margin-bottom: 5px;
}
#sentResume .userList h6 {
  font-size: 0.8rem;
}
/* 右侧简历 */
#sentResume .resumeContainer {
  width: 80%;
  position: absolute;
  top: 10%;
  left: 25%;
}
</style>