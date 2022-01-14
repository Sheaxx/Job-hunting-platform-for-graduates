<template>
  <div id="employment">
    <i class="el-icon-s-flag index-icon" slot="icon"></i>
    <h4 class="index-boxTitle" slot="boxTitle">招聘信息</h4>
    <el-input
      placeholder="请输入内容"
      v-model="searchValue"
      class="input-with-select searchInput"
    >
      <el-select v-model="searchSelect" slot="prepend" placeholder="请选择">
        <el-option label="搜岗位" value="1"></el-option>
        <el-option label="搜公司" value="2"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" class="searchButton"
        >找全职</el-button
      >
      <el-button slot="append" icon="el-icon-search" class="searchButton"
        >找实习</el-button
      >
    </el-input>
    <ul id="filter">
      <li>筛选岗位：</li>
      <li>
        <el-select v-model="educationFilter" placeholder="学历要求">
          <el-option value="不限"></el-option>
          <el-option value="大专"></el-option>
          <el-option value="本科"></el-option>
          <el-option value="硕士"></el-option>
          <el-option value="博士"></el-option>
        </el-select>
      </li>
      <li>
        <el-select v-model="salaryFilter" placeholder="薪资待遇">
          <el-option value="不限"></el-option>
          <el-option value="3K以下"></el-option>
          <el-option value="3-5K"></el-option>
          <el-option value="5-10K"></el-option>
          <el-option value="10-20K"></el-option>
          <el-option value="20K以上"></el-option>
        </el-select>
      </li>
      <li>
        <el-cascader
          :options="locationOptions"
          v-model="locationSelectedOptions"
          placeholder="工作地点"
        >
        </el-cascader>
      </li>
      <li>
        <el-switch
          v-model="certification"
          active-text="只看学校认证"
          inactive-text="展示所有岗位"
        >
        </el-switch>
      </li>
      <li>
        <el-button round icon="el-icon-refresh-left">重置</el-button>
      </li>
    </ul>
    <ul id="employmentList">
      <li class="employmentItem" v-for="item in employmentList" :key="item.id">
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
    <el-pagination
      :page-size="20"
      :pager-count="11"
      layout="prev, pager, next"
      :total="1000"
    >
    </el-pagination>
  </div>
</template>

<script>
import {
  provinceAndCityDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";

export default {
  data() {
    return {
      searchValue: "",
      searchSelect: "",
      educationFilter: "",
      salaryFilter: "",
      locationOptions: provinceAndCityDataPlus,
      locationSelectedOptions: [],
      certification: false,
      employmentList: [
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
      ],
      details: {
        employmentid: "",
        isFullTime: false,
        station: "",
        salary: "",
        location: "",
        education: "",
        company: "",
        trade: "",
        level: "",
      },
    };
  },
};
</script>

<style>
.searchInput {
  font-size: 0.9rem !important;
  margin-top: 3vh;
  margin-bottom: 2vh;
}
.el-select .el-input {
  width: 130px;
}
.searchButton {
  width: 125px;
  color: #fff !important;
  font-size: 1rem !important;
}
.searchButton:first-of-type {
  background: #9b9dc3 !important;
}
.searchButton:last-of-type {
  background: #bea4d4 !important;
}
#filter {
  height: 7vh;
  line-height: 7vh;
}
#filter li {
  float: left;
  margin-right: 2vw;
}
#employmentList {
  width: 100%;
  height: 55vh;
  padding-top: 2vh;
  display: flex;
  flex-wrap: wrap;
}
.employmentItem {
  flex: 0 1 auto;
  background: #fff;
  margin: 0 0.9%;
  width: 27.7%;
  height: 18%;
  padding: 1.8%;
  border: #8e909421 1px solid;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.05);
}
.employmentItem .salary {
  float: right;
  color: #72b3f0;
  font-size: 1.2rem;
}
.employmentItem .jobMsg,
.employmentItem .companyMsg {
  color: #8e9094;
  margin-top: 2.5%;
  font-size: 0.8rem;
}
.employmentItem .companyMsg {
  border-top: #8e90943d 1px solid;
  padding-top: 3%;
}
.employmentItem span {
  margin-right: 3%;
}
.employmentItem:hover {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
}
.employmentItem:hover .station {
  color: #72b3f0;
}
.el-pagination {
  text-align: center;
}
</style>