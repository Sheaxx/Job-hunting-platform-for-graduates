<template>
  <div id="sentResume">
    <h4>已投递列表</h4>
    <el-button
      round
      @click="back"
      class="back"
    >返回</el-button>
    <div class="select">
      <el-select
        v-model="selectCondition"
        slot="prepend"
        placeholder="筛选条件"
      >
        <el-option
          label="专业"
          value="1"
        ></el-option>
        <el-option
          label="绩点"
          value="2"
        ></el-option>
        <el-option
          label="学历"
          value="3"
        ></el-option>
      </el-select>
      <el-input
        placeholder="筛选内容"
        v-model="selectContent"
      ></el-input>
    </div>
    <div class="selectButton">
      <el-button
        icon="el-icon-refresh-left"
        round
        size="mini"
        @click="refresh"
      ></el-button>
      <el-button
        type="primary"
        icon="el-icon-search"
        round
        size="mini"
        @click="select"
      ></el-button>
    </div>
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
      <div class="progress">
        <h5>TA的招聘流程</h5>
        <el-button-group v-if="showButton">
          <el-button
            type="primary"
            icon="el-icon-check"
            size="mini"
            @click="openNext"
          >进入下一个流程</el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-close"
            @click="openStop"
          >终止流程</el-button>
        </el-button-group>
        <el-steps
          :active="progress.current"
          finish-status="success"
          :process-status="progress.currentState"
        >
          <el-step
            v-for="item in progress.progressList"
            :key="item"
            :title="item"
          ></el-step>
        </el-steps>
      </div>
      <resume
        class="resume"
        :resumeInfo="resumeInfo"
        :educationInfo="educationInfo"
        :internshipInfo="internshipInfo"
        :projectInfo="projectInfo"
        :campusExperienceInfo="campusExperienceInfo"
        :skillInfo="skillInfo"
        :certificateInfo="certificateInfo"
      ></resume>
    </div>
    <div
      class="askContainer"
      v-if="showNext"
    >
      <div class="askBox">
        <i class="el-icon-check"></i>
        <p>将使该为应聘者进入下一个流程，此操作不可逆，是否继续？</p>
        <el-button
          type="primary"
          plain
          @click="nextProgress"
        >确定</el-button>
        <el-button
          plain
          @click="cancelNext"
        >取消</el-button>
      </div>
    </div>
    <div
      class="askContainer"
      v-if="showStop"
    >
      <div class="askBox">
        <i class="el-icon-close"></i>
        <p>将停止该应聘者的招聘流程，此操作不可逆，是否继续？</p>
        <el-button
          type="primary"
          plain
          @click="stopProgress"
        >确定</el-button>
        <el-button
          plain
          @click="cancelStop"
        >取消</el-button>
      </div>
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
      progress: {}, //招聘流程
      showNext: false, //下一个流程提示窗口，默认为否
      showStop: false, //终止流程提示窗口，默认为否
      showButton: true, //是否展示操作流程的按钮
      selectCondition: "", //筛选条件
      selectContent: "", //筛选内容
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
      this.$ajax
        .get("/user/getSent/" + that.employment.id + "/" + username)
        .then((res) => {
          that.progress = res.data;
          that.progress.progressList = that.progress.progressList.split(",");
        });
    },
    //打开下一个流程窗口
    openNext() {
      this.showNext = true;
      document.documentElement.style.overflow = "hidden";
    },
    //确定下一个流程
    nextProgress() {
      let that = this;
      this.$ajax
        .post("/employment/nextProgress/" + this.progress.id)
        .then((res) => {
          that.progress = res.data;
          that.isShowButton();
          that.progress.progressList = that.progress.progressList.split(",");
          that.showNext = false;
          document.documentElement.style.overflow = "auto";
          that.$message.success("操作成功");
        });
    },
    //关闭下一个流程窗口
    cancelNext() {
      this.showNext = false;
      document.documentElement.style.overflow = "auto";
    },
    //打开终止流程窗口
    openStop() {
      this.showStop = true;
      document.documentElement.style.overflow = "hidden";
    },
    //确定终止流程
    stopProgress() {
      let that = this;
      this.$ajax
        .post("/employment/stopProgress/" + this.progress.id)
        .then((res) => {
          that.progress = res.data;
          that.isShowButton();
          that.progress.progressList = that.progress.progressList.split(",");
          that.showStop = false;
          document.documentElement.style.overflow = "auto";
          that.$message.success("操作成功");
        });
    },
    //关闭终止流程窗口
    cancelStop() {
      this.showStop = false;
      document.documentElement.style.overflow = "auto";
    },
    //判断是否展示操作流程按钮
    isShowButton() {
      if (
        this.progress.current == this.progress.total ||
        this.progress.currentState == "error"
      ) {
        this.showButton = false;
      }
    },
    //筛选搜索
    select() {
      switch (this.selectCondition) {
        case "1": {
          let arr = [];
          for (let item in this.userList) {
            if (this.userList[item].specialty == this.selectContent) {
              arr.push(this.userList[item]);
            }
          }
          if (arr.length == 0) {
            this.$message.warning("没有找到符合条件的应聘者");
          } else {
            this.userList = arr;
          }
          break;
        }
        case "2": {
          let arr = [];
          for (let item in this.userList) {
            if (this.userList[item].gpa >= this.selectContent) {
              arr.push(this.userList[item]);
            }
          }
          if (arr.length == 0) {
            this.$message.warning("没有找到符合条件的应聘者");
          } else {
            this.userList = arr;
          }
          break;
        }
        case "3": {
          let arr = [];
          for (let item in this.userList) {
            if (this.userList[item].highesteducation == this.selectContent) {
              arr.push(this.userList[item]);
            }
          }
          if (arr.length == 0) {
            this.$message.warning("没有找到符合条件的应聘者");
          } else {
            this.userList = arr;
          }
          break;
        }
        default: {
          this.$message.warning("请先选择筛选条件");
        }
      }
    },
    //重置筛选条件
    refresh() {
      this.init();
      this.selectCondition = "";
      this.selectContent = "";
    },
    //初始化
    init() {
      let that = this;
      this.$ajax
        .get("/user/getSenderList/" + this.employment.sentUsers)
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
          that.$ajax
            .get(
              "/user/getSent/" +
                that.employment.id +
                "/" +
                that.userList[0].username
            )
            .then((res) => {
              that.progress = res.data;
              that.isShowButton();
              that.progress.progressList =
                that.progress.progressList.split(",");
            });
        });
    },
  },
  mounted() {
    this.init();
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
#sentResume .back {
  position: absolute;
  top: 2%;
  right: 0;
}
#sentResume h4 {
  font-size: 1.2rem;
}
/* 筛选条件 */
#sentResume .select {
  width: 20%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  top: 2vh;
}
#sentResume .el-select {
  width: 40%;
}
#sentResume .el-input {
  width: 45%;
}
#sentResume .selectButton {
  position: relative;
  top: 3vh;
  width: 19%;
  display: flex;
  justify-content: right;
  padding-right: 1%;
}
/* 左侧列表 */
#sentResume .userList ul {
  margin-top: 2vh;
  width: 20%;
  height: 66vh;
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
#sentResume .progress {
  width: 76%;
  height: 90px;
  box-shadow: 0px 15px 10px -15px rgba(0, 0, 0, 0.3);
  margin-left: -2%;
  padding: 1% 5%;
}
#sentResume .el-steps {
  margin-top: 20px;
}
#sentResume .el-step__title {
  font-size: 0.9rem;
}
#sentResume .resumeContainer {
  width: 80%;
  position: absolute;
  top: 10%;
  left: 25%;
}
#sentResume #resumeReadBox {
  height: 420px;
  position: relative;
  top: 15px;
}
#sentResume .el-button-group {
  position: absolute;
  top: -1%;
  right: 18%;
}
/* 提示窗口 */
#sentResume .askContainer {
  position: absolute;
  z-index: 9;
  width: 100vw;
  height: 100vh;
  top: -11.8vh;
  left: -9vw;
  background: rgba(0, 0, 0, 0.3);
}
#sentResume .askContainer .askBox {
  background: #fff;
  width: 38%;
  height: 20%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#sentResume .askContainer i {
  margin: 7% 1% auto 10%;
  font-size: 1.5rem;
  float: left;
}
#sentResume .askContainer p {
  margin: 8% auto 4% 18%;
}
#sentResume .askContainer .el-button {
  float: right;
  margin-right: 30px;
}
</style>