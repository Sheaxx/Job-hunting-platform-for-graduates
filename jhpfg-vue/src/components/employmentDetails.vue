<template>
  <div id="employmentDetails">
    <el-button
      round
      @click="toList"
    >返回</el-button>
    <el-button
      type="primary"
      round
      @click="openSendResume"
    >投递简历</el-button>
    <div
      class="collectBox"
      v-if="false"
    >
      <el-link
        icon="el-icon-star-off"
        class="collect"
        v-if="!details.isCollect"
        @click="collect"
      >收藏</el-link>
      <el-link
        icon="el-icon-star-on"
        class="collect"
        v-else
        @click="cancelCollect"
      >已收藏</el-link>
    </div>
    <div class="deleteLink">
      <el-link
        icon="el-icon-delete"
        class="delete"
        @click="openDelete"
      >删除</el-link>
    </div>
    <div class="topBar">
      <el-tag class="isFullTime">{{showIsFullTime(details.isFullTime)}}</el-tag>
      <h5>{{ details.station }}</h5>
      <h6><span>{{ details.salaryStart }}</span> - <span>{{ details.salaryEnd }}</span></h6>
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
      <img
        :src="companyDetails.logo"
        alt="公司logo"
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
  </div>
</template>

<script>
import { CodeToText } from "element-china-area-data";

export default {
  data() {
    return {
      isOpenSendResume: false, //是否打开投递简历窗口，默认为否
      isOpenDelete: false, //是否打开删除招聘信息窗口，默认为否
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
      return CodeToText[location[0]] + "" + CodeToText[location[1]] 
    },
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
    openSendResume() {
      this.isOpenSendResume = true;
      document.documentElement.style.overflow = "hidden";
    },
    //确定投递简历
    sendResume() {
      this.$emit("sendResume");
      this.isOpenSendResume = false;
      document.documentElement.style.overflow = "auto";
    },
    //取消投递简历
    cancelSendResume() {
      this.isOpenSendResume = false;
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
  },
  mounted() {
    
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
</style>