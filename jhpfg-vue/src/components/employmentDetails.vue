<template>
  <div id="employmentDetails">
    <el-button round @click="toList">返回</el-button>
    <el-button type="primary" round @click="sendResume">投递简历</el-button>
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
      <h5>公司基本信息</h5>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    details: Object,
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
    //投递简历
    sendResume() {
      this.$emit("sendResume");
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
  z-index: 99999999;
  background: #fff;
  height: 80vh;
  overflow: auto;
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
#employmentDetails .companyBar {
  position: fixed;
  width: 22%;
  height: 70vh;
  background: red;
  top: 25vh;
  left: 71vw;
}
</style>