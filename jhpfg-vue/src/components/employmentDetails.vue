<template>
  <div id="employmentDetails">
    <el-button round @click="toList">返回</el-button>
    <el-button type="primary" round @click="sendResumeAsk">投递简历</el-button>
    <el-link
      icon="el-icon-star-off"
      class="collect"
      v-if="!details.isCollect"
      @click="collect"
      >收藏</el-link
    >
    <el-link
      icon="el-icon-star-on"
      class="collect"
      v-else
      @click="cancelCollect"
      >已收藏</el-link
    >
    <div class="topBar">
      <h5>{{ details.station }}</h5>
      <h6>{{ details.salary }}</h6>
      <p class="jobMsg">
        <span>{{ details.location }}</span>
        <span>{{ details.education }}</span>
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
      <img src="../assets/image/avatar.png" alt="公司logo" />
      <p class="companyName">{{ companyDetails.name }}</p>
      <div class="msg">
        <span class="location">{{ companyDetails.location }}</span>
        <span class="trade">{{ companyDetails.trade }}</span>
        <span class="level">{{ companyDetails.level }}</span>
      </div>
      <p class="introduction">{{ companyDetails.introduction }}</p>
    </div>
    <div id="sendResumeAsk" v-if="isSendResumeAsk">
      <div class="askBox">
        <i class="el-icon-s-promotion"></i>
        <p>将投递您的在线简历，是否继续？</p>
        <el-button type="primary" plain @click="sendResume">确定</el-button>
        <el-button plain @click="cancelSendResume">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSendResumeAsk: false,
    };
  },
  props: {
    details: Object,
    companyDetails: Object,
  },
  methods: {
    //详情返回列表
    toList() {
      this.$emit("toList");
    },
    //收藏招聘信息
    collect() {
      this.$emit("collect");
    },
    //取消收藏招聘信息
    cancelCollect() {
      this.$emit("cancelCollect");
    },
    //点击投递简历按钮
    sendResumeAsk() {
      this.isSendResumeAsk = true;
    },
    //确定投递简历
    sendResume() {
      this.$emit("sendResume");
    },
    //取消投递简历
    cancelSendResume() {
      this.isSendResumeAsk = false;
    },
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
#employmentDetails .el-button {
  float: right;
  margin-right: 3%;
}
#employmentDetails .collect {
  float: right;
  line-height: 5vh;
  margin-right: 2vw;
}
#employmentDetails .topBar {
  clear: both;
  width: 100%;
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
  /* background: red; */
  top: 25vh;
  left: 71vw;
  border-left: #8e909444 1px solid;
}
/* 全部居中 */
#employmentDetails img,
#employmentDetails .companyName,
#employmentDetails .msg,
#employmentDetails .companyBar .introduction {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
}
#employmentDetails img {
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
  top: 35%;
  font-size: 0.9rem;
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
#sendResumeAsk {
  position: absolute;
  z-index: 9;
  width: 99.8vw;
  height: 99.2vh;
  top: -16.5vh;
  left: -10vw;
  background: rgba(0, 0, 0, 0.3);
}
#sendResumeAsk .askBox {
  background: #fff;
  width: 38%;
  height: 20%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#sendResumeAsk i {
  margin: 7% 1% auto 15%;
  font-size: 1.5rem;
  float: left;
}
#sendResumeAsk p {
  margin: 8% auto 4% 18%;
}
</style>