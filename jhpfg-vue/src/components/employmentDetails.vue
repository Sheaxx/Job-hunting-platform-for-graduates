<template>
  <div id="employmentDetails">
    <el-button
      round
      @click="toList"
      class="detailsButton"
    >返回</el-button>
    <el-button
      type="primary"
      round
      @click="openSendResume"
      v-if="showSendResume && isStudent"
      class="detailsButton"
    >投递简历</el-button>
    <el-button
      type="primary"
      round
      disabled
      @click="openSendResume"
      v-if="!showSendResume && isStudent"
      class="detailsButton"
    >已投递简历</el-button>
    <div
      class="collectBox"
      v-if="isStudent"
    >
      <el-link
        icon="el-icon-star-off"
        class="collect"
        v-if="!isCollect"
        @click="collect"
      >收藏</el-link>
      <el-link
        icon="el-icon-star-on"
        class="collect"
        v-else
        @click="cancelCollect"
      >已收藏</el-link>
    </div>
    <div
      class="deleteLink"
      v-if="isCompany"
    >
      <el-link
        icon="el-icon-delete"
        class="delete"
        @click="openDelete"
      >删除</el-link>
      <el-link
        icon="el-icon-edit"
        class="delete"
        @click="openAddEmployment"
      >修改</el-link>
      <el-link
        icon="el-icon-tickets"
        class="delete"
        @click="toSentResume"
      >查看投递</el-link>
      <el-link
        icon="el-icon-collection"
        class="delete"
        @click="toRecommendation"
      >推荐列表</el-link>
    </div>
    <div
      class="recommendBox"
      v-if="isSchool"
    >
      <el-link
        icon="el-icon-coordinate"
        class="delete"
        @click="recommend"
        v-if="!isRecommed"
      >推荐</el-link>
      <el-link
        icon="el-icon-s-check"
        class="delete"
        @click="cancelRecommend"
        v-else
      >取消推荐</el-link>
    </div>
    <div class="topBar">
      <el-tag class="isFullTime">{{showIsFullTime(details.isFullTime)}}</el-tag>
      <h5>{{ details.station }}</h5>
      <h6><span>{{ details.salaryStart }}</span> - <span>{{ details.salaryEnd }}</span></h6>
      <p class="jobMsg">
        <span>{{ showLocation(details.location) }}</span>
        <span>{{ details.education }}</span>
        <span>招聘 {{ details.total }} 人</span>
      </p>
    </div>
    <div class="introduction section">
      <h5 class="sectionTitle">
        <i class="el-icon-suitcase sectionIcon"></i>职位介绍
      </h5>
      <p class="sectionContent">{{ details.introduction }}</p>
    </div>
    <div class="requirements section">
      <h5 class="sectionTitle">
        <i class="el-icon-notebook-2 sectionIcon"></i>职位要求
      </h5>
      <p class="sectionContent">{{ details.requirements }}</p>
    </div>
    <div class="companyBar">
      <img
        :src="companyDetails.logo"
        alt="公司logo"
        class="logo"
      />
      <p class="companyName">{{ companyDetails.name }}</p>
      <div class="msg">
        <span class="location">{{ showLocation(companyDetails.location) }}</span>
        <span class="trade">{{ companyDetails.trade }}</span>
        <span class="level">{{ companyDetails.level }}</span>
      </div>
      <p class="introduction">{{ companyDetails.introduction }}</p>
    </div>
    <div
      id="openSendResume"
      v-if="isOpenSendResume"
    >
      <div class="askBox">
        <i class="el-icon-s-promotion"></i>
        <p>将投递您的在线简历，是否继续？</p>
        <el-button
          type="primary"
          plain
          @click="sendResume"
        >确定</el-button>
        <el-button
          plain
          @click="cancelSendResume"
        >取消</el-button>
      </div>
    </div>
    <div
      class="deleteBox"
      v-if="isOpenDelete"
    >
      <div class="askBox">
        <i class="el-icon-delete-solid"></i>
        <p>将删除该帖子，是否继续？</p>
        <el-button
          type="primary"
          plain
          @click="deleteEmployment"
        >确定</el-button>
        <el-button
          plain
          @click="cancelDelete"
        >取消</el-button>
      </div>
    </div>
    <!-- 编辑详情 -->
    <edit-employment
      v-if="isEditEmployment"
      :editEmployment="details"
      @updateEmployment="updateEmployment"
      @cancelUpdateEmployment="cancelUpdateEmployment"
    ></edit-employment>
    <!-- 查看简历投递者 -->
    <sent-resume
      v-if="isSentResume"
      :employment="details"
      @sentResumeBack="sentResumeBack"
    ></sent-resume>
    <!-- 查看推荐人选 -->
    <div
      id="recommendation"
      v-if="isRecommendation"
    >
      <div class="container">
        <ul>
          <h5>以下同学求职意向为<span>{{details.zone}}</span></h5>
          <li
            v-for="item in recommendationList"
            :key="item.username"
          >
            <h6>{{item.username}}</h6>
            <i
              class="el-icon-s-comment chat"
              @click="chatRecommendation"
            ></i>
          </li>
          <div class="close">
            <i
              class="el-icon-circle-close"
              @click="recommendationBack"
            ></i>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { CodeToText } from "element-china-area-data";
import EditEmployment from "../components/editEmployment.vue";
import SentResume from "../components/sentResume.vue";

export default {
  components: { EditEmployment, SentResume },
  data() {
    return {
      isStudent: false, //用户身份是否是学生
      isCompany: false, //用户身份是否是企业
      isSchool: false, //用户身份是否是学校
      isOpenSendResume: false, //是否打开投递简历窗口，默认为否
      isOpenDelete: false, //是否打开删除招聘信息窗口，默认为否
      isEditEmployment: false, //是否打开编辑窗口，默认为否
      isSentResume: false, //是否打开查看投递者页面，默认为否
      isCollect: false, //该详情是否已被收藏
      isRecommed: false, //该详情是否被学校推荐
      isRecommendation: false, //是否打开推荐人选页面，默认为否
      showSendResume: false, //是否展示投递简历按钮
      detailsForm: {}, //备份
      recommendationList: [], //推荐人选列表
    };
  },
  props: {
    details: Object,
    companyDetails: Object,
  },
  methods: {
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
    //详情返回列表
    toList() {
      this.$emit("toList");
    },
    //收藏招聘信息
    collect() {
      let that = this;
      this.$ajax
        .post(
          "/user/collect/" +
            window.localStorage.getItem("username") +
            "/" +
            this.details.id
        )
        .then((res) => {
          window.localStorage.setItem("collectList", res.data.join(","));
          that.isCollect = true;
          that.$message.success("收藏成功");
        });
    },
    //取消收藏招聘信息
    cancelCollect() {
      let that = this;
      this.$ajax
        .post(
          "/user/cancelCollect/" +
            window.localStorage.getItem("username") +
            "/" +
            this.details.id
        )
        .then((res) => {
          window.localStorage.setItem("collectList", res.data.join(","));
          that.isCollect = false;
          that.$message.success("取消收藏");
        });
    },
    //学校推荐
    recommend() {
      let that = this;
      this.$ajax
        .post(
          "/school/recommend/" +
            window.localStorage.getItem("school") +
            "/" +
            this.details.id
        )
        .then((res) => {
          that.isRecommed = true;
          that.$message.success("推荐成功");
        });
    },
    //取消学校推荐
    cancelRecommend() {
      let that = this;
      this.$ajax
        .post(
          "/school/cancelRecommend/" +
            window.localStorage.getItem("school") +
            "/" +
            this.details.id
        )
        .then((res) => {
          that.isRecommed = false;
          that.$message.success("取消推荐");
        });
    },
    //点击投递简历按钮
    openSendResume() {
      this.isOpenSendResume = true;
      document.documentElement.style.overflow = "hidden";
    },
    //确定投递简历
    sendResume() {
      let that = this;
      this.$ajax
        .post(
          "/user/sendResume/" +
            this.details.id +
            "/" +
            window.localStorage.getItem("username")
        )
        .then((res) => {
          that.$message.success("投递成功");
          let list = window.localStorage.getItem("sentList").split(",");
          list[list.length] = this.details.id;
          list.join(",");
          window.localStorage.setItem("sentList", list);
          console.log(list);
          that.showSendResume = false;
          that.isOpenSendResume = false;
          document.documentElement.style.overflow = "auto";
        });
    },
    //取消投递简历
    cancelSendResume() {
      this.isOpenSendResume = false;
      document.documentElement.style.overflow = "auto";
    },
    //查看投递者
    toSentResume() {
      this.isSentResume = true;
    },
    //投递者返回详情页面
    sentResumeBack() {
      this.isSentResume = false;
    },
    //查看推荐人选
    toRecommendation() {
      let that = this;
      this.$ajax
        .get("/employment/getUsersByStation/" + this.details.id)
        .then((res) => {
          that.recommendationList = res.data;
          that.isRecommendation = true;
          document.documentElement.style.overflow = "hidden";
        });
    },
    //推荐人选点击聊天
    chatRecommendation() {
      this.$router.replace("/messages");
    },
    //推荐人选返回详情页面
    recommendationBack() {
      this.isRecommendation = false;
      document.documentElement.style.overflow = "auto";
    },
    //点击删除按钮
    openDelete() {
      this.isOpenDelete = true;
      document.documentElement.style.overflow = "hidden";
    },
    //确定删除
    deleteEmployment() {
      let that = this;
      this.$ajax
        .post("/employment/deleteEmployment/" + this.details.id)
        .then((res) => {
          this.isOpenDelete = false;
          document.documentElement.style.overflow = "auto";
          this.$message.success("删除成功");
          this.toList();
          this.$emit("refresh");
        });
    },
    //取消删除
    cancelDelete() {
      this.isOpenDelete = false;
      document.documentElement.style.overflow = "auto";
    },
    //打开编辑招聘信息页面
    openAddEmployment() {
      this.isEditEmployment = true;
    },
    //确定更新招聘信息
    updateEmployment() {
      this.isEditEmployment = false;
    },
    //取消编辑招聘信息
    cancelUpdateEmployment() {
      this.isEditEmployment = false;
      Object.assign(this.details, this.detailsForm);
    },
  },
  created() {
    let that = this;
    Object.assign(this.detailsForm, this.details);
    //判断用户身份
    switch (window.localStorage.getItem("role")) {
      case "0": {
        this.isStudent = true;
        //判断该信息是否已投递简历
        let list = window.localStorage.getItem("sentList").split(",");
        if (list.indexOf(String(this.details.id)) != -1) {
          this.showSendResume = false;
        } else {
          this.showSendResume = true;
        }
        //判断是否是用户收藏的信息
        let collectList = window.localStorage.getItem("collectList");
        collectList = collectList.split(",");
        for (let item in collectList) {
          if (collectList[item] == this.details.id) {
            this.isCollect = true;
            break;
          }
        }
        break;
      }
      case "1":
        this.isCompany = true;
        break;
      case "2": {
        this.isSchool = true;
        //判断是否是学校推荐的招聘信息
        this.$ajax
          .get(
            "school/getSchoolByName/" + window.localStorage.getItem("school")
          )
          .then((res) => {
            let recommendList = res.data.recommend;
            recommendList = recommendList.split(",");
            for (let item in recommendList) {
              if (recommendList[item] == this.details.id) {
                that.isRecommed = true;
                break;
              }
            }
          });
      }
    }
  },
};
</script>

<style>
#employmentDetails {
  margin-top: 1%;
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  height: 80vh;
}
#employmentDetails .detailsButton {
  float: right;
  margin-right: 3%;
}
#employmentDetails .el-link {
  float: right;
  line-height: 5vh;
  margin-right: 2vw;
}
#employmentDetails .topBar {
  clear: both;
  width: 100%;
}
#employmentDetails .isFullTime {
  float: left;
  margin-right: 1vw;
}
#employmentDetails .topBar h5 {
  float: left;
  margin-right: 4vw;
  font-size: 1.5rem;
}
#employmentDetails .topBar h6 {
  font-size: 1.5rem;
  color: #72b3f0;
}
#employmentDetails .topBar .jobMsg {
  margin-top: 2vh;
}
#employmentDetails .topBar .jobMsg span {
  margin-right: 1vw;
  color: #8e9094;
}
#employmentDetails .section {
  margin-top: 5vh;
  width: 70%;
}
#employmentDetails .sectionTitle {
  font-size: 1.1rem;
  color: #70728f;
  font-weight: 700;
  margin-bottom: 2vh;
}
#employmentDetails .sectionIcon {
  margin-right: 0.5vw;
}
#employmentDetails .sectionContent {
  line-height: 1.6rem;
}
/* 公司信息 */
#employmentDetails .companyBar {
  position: fixed;
  width: 22%;
  height: 70vh;
  top: 25vh;
  left: 71vw;
  border-left: #8e909444 1px solid;
}
/* 全部居中 */
#employmentDetails .logo,
#employmentDetails .companyName,
#employmentDetails .msg,
#employmentDetails .companyBar .introduction {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
}
#employmentDetails .logo {
  width: 50px;
  height: 50px;
  top: 15%;
}
#employmentDetails .companyName {
  top: 28%;
  font-size: 1.1rem;
  font-weight: 600;
}
#employmentDetails .msg {
  width: 100%;
  top: 35%;
  font-size: 0.85rem;
  display: flex;
  justify-content: center;

  color: #75777a;
}
#employmentDetails .msg span:not(.level) {
  margin-right: 5px;
}
#employmentDetails .companyBar .introduction {
  top: 63%;
  width: 85%;
  line-height: 1.5rem;
  font-size: 0.9rem;
}
/* 投递简历提示窗口 */
#openSendResume {
  position: absolute;
  z-index: 9;
  width: 100vw;
  height: 100vh;
  top: -16.8vh;
  left: -10vw;
  background: rgba(0, 0, 0, 0.3);
}
#openSendResume .askBox {
  background: #fff;
  width: 38%;
  height: 20%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#openSendResume i {
  margin: 7% 1% auto 15%;
  font-size: 1.5rem;
  float: left;
}
#openSendResume p {
  margin: 8% auto 4% 18%;
}
/* 删除招聘信息提示窗口 */
#employmentDetails .deleteBox {
  position: absolute;
  z-index: 9;
  width: 100vw;
  height: 100vh;
  top: -16.8vh;
  left: -10vw;
  background: rgba(0, 0, 0, 0.3);
}
#employmentDetails .deleteBox .askBox {
  background: #fff;
  width: 38%;
  height: 20%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#employmentDetails .deleteBox i {
  margin: 7% 1% auto 15%;
  font-size: 1.5rem;
  float: left;
}
#employmentDetails .deleteBox p {
  margin: 8% auto 4% 18%;
}
/* 推荐列表 */
#employmentDetails #recommendation {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  top: -16.8vh;
  left: -10vw;
  z-index: 9;
}
#employmentDetails #recommendation .container {
  height: 100vh;
  width: 25vw;
  margin: 0 auto;
}
#employmentDetails #recommendation h5 {
  margin-bottom: 20px;
}
#employmentDetails #recommendation span {
  font-weight: 600;
}
#employmentDetails #recommendation ul {
  background: #fff;
  padding: 2%;
  width: 24vw;
  min-height: 12%;
  max-height: 85%;
  position: absolute;
  flex: 0 1 auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
#employmentDetails #recommendation li {
  height: 40px;
  line-height: 40px;
  margin: 10px 0;
  padding: 0 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
}
#employmentDetails #recommendation .chat {
  float: right;
  margin-top: -28px;
  font-size: 18px;
}
#employmentDetails #recommendation .close {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  font-size: 22px;
}
#employmentDetails #recommendation i:hover {
  color: #99bddf;
}
</style>