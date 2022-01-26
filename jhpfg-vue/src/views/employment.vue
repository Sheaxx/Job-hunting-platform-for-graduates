<template>
  <div id="employment">
    <i class="el-icon-suitcase-1 index-icon" slot="icon"></i>
    <h4 class="index-boxTitle" slot="boxTitle">招聘信息</h4>
    <div
      id="employmentListBox"
      v-if="!isEmploymentDetails && !isCompanyDetails"
    >
      <el-input
        placeholder="请输入内容"
        v-model="searchValue"
        class="input-with-select searchInput"
      >
        <el-select v-model="searchSelect" slot="prepend" placeholder="请选择">
          <el-option label="搜岗位" value="1"></el-option>
          <el-option label="搜公司" value="2"></el-option>
          <el-option label="搜学校" value="3"></el-option>
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-search"
          class="searchButton"
          v-if="searchSelect == 1 || searchSelect == ''"
          >找实习</el-button
        >
        <el-button
          slot="append"
          icon="el-icon-search"
          class="searchButton"
          v-if="searchSelect == 1 || searchSelect == ''"
          >找全职</el-button
        >
        <el-button
          slot="append"
          icon="el-icon-search"
          class="searchButton"
          v-if="searchSelect == 2"
          >找公司</el-button
        >
        <el-button
          slot="append"
          icon="el-icon-search"
          class="searchButton"
          v-if="searchSelect == 3"
          >找学校</el-button
        >
      </el-input>
      <div
        id="employmentContainer"
        v-if="searchSelect == 1 || searchSelect == ''"
      >
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
              active-color="#72b3f0"
            >
            </el-switch>
          </li>
          <li>
            <el-button round icon="el-icon-refresh-left">重置</el-button>
          </li>
        </ul>
        <ul id="employmentList">
          <li
            class="employmentItem"
            v-for="item in employmentList"
            :key="item.id"
            @click="toEmploymentDetails"
          >
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
      </div>
      <div id="companyContainer" v-if="searchSelect == 2">
        <ul id="companyList">
          <li
            class="companyItem"
            v-for="(item,index) in companyList"
            :key="item.companyid"
            @click="toCompanyDetails(index)"
          >
            <img src="../assets/image/avatar.png" alt="公司logo" class="logo" />
            <p class="name">{{ item.name }}</p>
            <p class="msg">
              <span>{{ item.location }}</span>
              <span>{{ item.trade }}</span>
              <span>{{ item.level }}</span>
            </p>
          </li>
        </ul>
      </div>
      <div id="schoolContainer" v-if="searchSelect == 3">
        <ul id="schoolList">
          <li
            class="schoolItem"
            v-for="item in schoolList"
            :key="item.schoolid"
          >
            <img src="../assets/image/avatar.png" alt="学校logo" class="logo" />
            <p class="name">{{ item.name }}</p>
            <p class="msg">
              <span>{{ item.location }}</span>
            </p>
          </li>
        </ul>
      </div>
      <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </div>
    <employment-details
      v-if="isEmploymentDetails"
      :details="employmentDetails"
      :companyDetails="companyDetails"
      @toList="employmentToList"
      @collect="collect"
      @cancelCollect="cancelCollect"
      @sendResume="sendResume"
    ></employment-details>
    <div id="companyDetails" v-if="isCompanyDetails">
      <el-button round @click="companyToList">返回</el-button>
      <div class="listBar">
        <ul class="list">
        <li v-for="(item,index) in employmentList" :key="item.employmentid">
          <p class="authorMsg">
            <span>发布者名字</span>
            <span>她的职位</span>
          </p>
          <p class="station">{{ item.station }}</p>
          <p class="msg">
            <span class="salary">{{ item.salary }}</span>
            <span>{{ item.location }}</span>
            <span>{{ item.education }}</span>
          </p>
        </li>
      </ul>
      <el-pagination
        :page-size="7"
        :pager-count="11"
        layout="prev, pager, next"
        :total="1000"
      >
      </el-pagination>
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
    </div>
  </div>
</template>

<script>
import {
  provinceAndCityDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
import EmploymentDetails from "../components/employmentDetails.vue";

export default {
  components: { EmploymentDetails },
  data() {
    return {
      isEmploymentDetails: false, //是否是招聘信息详情页，默认为否
      isCompanyDetails: true, //是否是公司详情页，默认为否
      isSchoolDetails: false, //是否是学校详情页，默认为否
      searchValue: "", //搜索内容
      searchSelect: "2", //选择搜索的类别
      educationFilter: "", //筛选学历
      salaryFilter: "", //筛选薪资
      locationOptions: provinceAndCityDataPlus,
      locationSelectedOptions: [], //工作地点选择的两个变量
      certification: false, //筛选学校认证
      employmentList: [
        //首页招聘信息列表
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
      companyList: [
        {
          //详情页面的公司信息
          companyid: 1,
          logo: "../assets/image/avatar.png",
          name: "字节跳动",
          trade: "互联网",
          level: "已上市",
          location: "北京",
          introduction:
            "1、对国家政策、产业环境、市场规模等进行洞察，结合客户需求进行痛点分析，聚焦功能需求，适配相关解决方案。2、根据市场洞察，结合客户需求，孵化数字政府相关解决方案，协同合作伙伴进行落地支撑；3、进行产业环境分析，对服务区域的主导产业进行分析研究，结合方案进行信息化平台的售前工作，4、根据项目需求进行实地调研，可独立输出PPT以及WORD等相关报告，能够适应中短期出差。",
        },
        {
          //详情页面的公司信息
          companyid: 1,
          logo: "../assets/image/avatar.png",
          name: "字节跳动",
          trade: "互联网",
          level: "已上市",
          location: "北京",
          introduction:
            "1、对国家政策、产业环境、市场规模等进行洞察，结合客户需求进行痛点分析，聚焦功能需求，适配相关解决方案。2、根据市场洞察，结合客户需求，孵化数字政府相关解决方案，协同合作伙伴进行落地支撑；3、进行产业环境分析，对服务区域的主导产业进行分析研究，结合方案进行信息化平台的售前工作，4、根据项目需求进行实地调研，可独立输出PPT以及WORD等相关报告，能够适应中短期出差。",
        },
        {
          //详情页面的公司信息
          companyid: 1,
          logo: "../assets/image/avatar.png",
          name: "字节跳动",
          trade: "互联网",
          level: "已上市",
          location: "北京",
          introduction:
            "1、对国家政策、产业环境、市场规模等进行洞察，结合客户需求进行痛点分析，聚焦功能需求，适配相关解决方案。2、根据市场洞察，结合客户需求，孵化数字政府相关解决方案，协同合作伙伴进行落地支撑；3、进行产业环境分析，对服务区域的主导产业进行分析研究，结合方案进行信息化平台的售前工作，4、根据项目需求进行实地调研，可独立输出PPT以及WORD等相关报告，能够适应中短期出差。",
        },
        {
          //详情页面的公司信息
          companyid: 1,
          logo: "../assets/image/avatar.png",
          name: "字节跳动",
          trade: "互联网",
          level: "已上市",
          location: "北京",
          introduction:
            "1、对国家政策、产业环境、市场规模等进行洞察，结合客户需求进行痛点分析，聚焦功能需求，适配相关解决方案。2、根据市场洞察，结合客户需求，孵化数字政府相关解决方案，协同合作伙伴进行落地支撑；3、进行产业环境分析，对服务区域的主导产业进行分析研究，结合方案进行信息化平台的售前工作，4、根据项目需求进行实地调研，可独立输出PPT以及WORD等相关报告，能够适应中短期出差。",
        },
        {
          //详情页面的公司信息
          companyid: 1,
          logo: "../assets/image/avatar.png",
          name: "字节跳动",
          trade: "互联网",
          level: "已上市",
          location: "北京",
          introduction:
            "1、对国家政策、产业环境、市场规模等进行洞察，结合客户需求进行痛点分析，聚焦功能需求，适配相关解决方案。2、根据市场洞察，结合客户需求，孵化数字政府相关解决方案，协同合作伙伴进行落地支撑；3、进行产业环境分析，对服务区域的主导产业进行分析研究，结合方案进行信息化平台的售前工作，4、根据项目需求进行实地调研，可独立输出PPT以及WORD等相关报告，能够适应中短期出差。",
        },
        {
          //详情页面的公司信息
          companyid: 1,
          logo: "../assets/image/avatar.png",
          name: "字节跳动",
          trade: "互联网",
          level: "已上市",
          location: "北京",
          introduction:
            "1、对国家政策、产业环境、市场规模等进行洞察，结合客户需求进行痛点分析，聚焦功能需求，适配相关解决方案。2、根据市场洞察，结合客户需求，孵化数字政府相关解决方案，协同合作伙伴进行落地支撑；3、进行产业环境分析，对服务区域的主导产业进行分析研究，结合方案进行信息化平台的售前工作，4、根据项目需求进行实地调研，可独立输出PPT以及WORD等相关报告，能够适应中短期出差。",
        },
        {
          //详情页面的公司信息
          companyid: 1,
          logo: "../assets/image/avatar.png",
          name: "字节跳动",
          trade: "互联网",
          level: "已上市",
          location: "北京",
          introduction:
            "1、对国家政策、产业环境、市场规模等进行洞察，结合客户需求进行痛点分析，聚焦功能需求，适配相关解决方案。2、根据市场洞察，结合客户需求，孵化数字政府相关解决方案，协同合作伙伴进行落地支撑；3、进行产业环境分析，对服务区域的主导产业进行分析研究，结合方案进行信息化平台的售前工作，4、根据项目需求进行实地调研，可独立输出PPT以及WORD等相关报告，能够适应中短期出差。",
        },
        {
          //详情页面的公司信息
          companyid: 1,
          logo: "../assets/image/avatar.png",
          name: "字节跳动",
          trade: "互联网",
          level: "已上市",
          location: "北京",
          introduction:
            "1、对国家政策、产业环境、市场规模等进行洞察，结合客户需求进行痛点分析，聚焦功能需求，适配相关解决方案。2、根据市场洞察，结合客户需求，孵化数字政府相关解决方案，协同合作伙伴进行落地支撑；3、进行产业环境分析，对服务区域的主导产业进行分析研究，结合方案进行信息化平台的售前工作，4、根据项目需求进行实地调研，可独立输出PPT以及WORD等相关报告，能够适应中短期出差。",
        },
        {
          //详情页面的公司信息
          companyid: 1,
          logo: "../assets/image/avatar.png",
          name: "字节跳动",
          trade: "互联网",
          level: "已上市",
          location: "北京",
          introduction:
            "1、对国家政策、产业环境、市场规模等进行洞察，结合客户需求进行痛点分析，聚焦功能需求，适配相关解决方案。2、根据市场洞察，结合客户需求，孵化数字政府相关解决方案，协同合作伙伴进行落地支撑；3、进行产业环境分析，对服务区域的主导产业进行分析研究，结合方案进行信息化平台的售前工作，4、根据项目需求进行实地调研，可独立输出PPT以及WORD等相关报告，能够适应中短期出差。",
        },
        {
          //详情页面的公司信息
          companyid: 1,
          logo: "../assets/image/avatar.png",
          name: "字节跳动",
          trade: "互联网",
          level: "已上市",
          location: "北京",
          introduction:
            "1、对国家政策、产业环境、市场规模等进行洞察，结合客户需求进行痛点分析，聚焦功能需求，适配相关解决方案。2、根据市场洞察，结合客户需求，孵化数字政府相关解决方案，协同合作伙伴进行落地支撑；3、进行产业环境分析，对服务区域的主导产业进行分析研究，结合方案进行信息化平台的售前工作，4、根据项目需求进行实地调研，可独立输出PPT以及WORD等相关报告，能够适应中短期出差。",
        },
        {
          //详情页面的公司信息
          companyid: 1,
          logo: "../assets/image/avatar.png",
          name: "字节跳动",
          trade: "互联网",
          level: "已上市",
          location: "北京",
          introduction:
            "1、对国家政策、产业环境、市场规模等进行洞察，结合客户需求进行痛点分析，聚焦功能需求，适配相关解决方案。2、根据市场洞察，结合客户需求，孵化数字政府相关解决方案，协同合作伙伴进行落地支撑；3、进行产业环境分析，对服务区域的主导产业进行分析研究，结合方案进行信息化平台的售前工作，4、根据项目需求进行实地调研，可独立输出PPT以及WORD等相关报告，能够适应中短期出差。",
        },
        {
          //详情页面的公司信息
          companyid: 1,
          logo: "../assets/image/avatar.png",
          name: "字节跳动",
          trade: "互联网",
          level: "已上市",
          location: "北京",
          introduction:
            "1、对国家政策、产业环境、市场规模等进行洞察，结合客户需求进行痛点分析，聚焦功能需求，适配相关解决方案。2、根据市场洞察，结合客户需求，孵化数字政府相关解决方案，协同合作伙伴进行落地支撑；3、进行产业环境分析，对服务区域的主导产业进行分析研究，结合方案进行信息化平台的售前工作，4、根据项目需求进行实地调研，可独立输出PPT以及WORD等相关报告，能够适应中短期出差。",
        },
        {
          //详情页面的公司信息
          companyid: 1,
          logo: "../assets/image/avatar.png",
          name: "字节跳动",
          trade: "互联网",
          level: "已上市",
          location: "北京",
          introduction:
            "1、对国家政策、产业环境、市场规模等进行洞察，结合客户需求进行痛点分析，聚焦功能需求，适配相关解决方案。2、根据市场洞察，结合客户需求，孵化数字政府相关解决方案，协同合作伙伴进行落地支撑；3、进行产业环境分析，对服务区域的主导产业进行分析研究，结合方案进行信息化平台的售前工作，4、根据项目需求进行实地调研，可独立输出PPT以及WORD等相关报告，能够适应中短期出差。",
        },
      ], //公司列表
      schoolList: [
        {
          schoolid: 1,
          logo: "",
          name: "北京大学",
          location: "北京",
        },
      ], //学校列表
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
        companyid: 1,
        logo: "",
        name: "字节跳动",
        trade: "互联网",
        level: "已上市",
        location: "北京",
        introduction:
          "1、对国家政策、产业环境、市场规模等进行洞察，结合客户需求进行痛点分析，聚焦功能需求，适配相关解决方案。2、根据市场洞察，结合客户需求，孵化数字政府相关解决方案，协同合作伙伴进行落地支撑；3、进行产业环境分析，对服务区域的主导产业进行分析研究，结合方案进行信息化平台的售前工作，4、根据项目需求进行实地调研，可独立输出PPT以及WORD等相关报告，能够适应中短期出差。",
      },
    };
  },
  methods: {
    //查看招聘详情
    toEmploymentDetails() {
      this.isEmploymentDetails = true;
    },
    //招聘详情返回列表
    employmentToList() {
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
    //查看公司详情
    toCompanyDetails(index) {
      this.isCompanyDetails = true;
    },
    //公司详情返回列表
    companyToList() {
      this.isCompanyDetails = false;
    },
    //查看学校详情
    toSchoolDetails() {
      this.isSchoolDetails = true;
    },
    //学校详情返回列表
    schoolToList() {
      this.isCompanyDetails = false;
    },
  },
};
</script>

<style>
#employment {
  position: relative;
}
/* 搜索框 */
#employment .searchInput {
  font-size: 0.9rem !important;
  margin-top: 3vh;
  margin-bottom: 2vh;
}
#employment .el-select .el-input {
  width: 130px;
}
#employment .searchButton {
  width: 125px;
  color: #fff !important;
  font-size: 1rem !important;
}
#employment .searchButton:first-of-type {
  background: #9b9dc3 !important;
}
#employment .searchButton:last-of-type {
  background: #bea4d4 !important;
}
/* 招聘信息-筛选 */
#filter {
  height: 7vh;
  line-height: 7vh;
}
#filter li {
  float: left;
  margin-right: 2vw;
}
/* 招聘信息，公司信息，学校信息-列表 */
#employmentList,
#companyList,
#schoolList {
  width: 100%;
  height: 55vh;
  padding-top: 2vh;
  display: flex;
  flex-wrap: wrap;
}
#companyList,
#schoolList {
  height: 61vh;
}
/* 招聘列表每一项 */
#employment .employmentItem {
  flex: 0 1 auto;
  margin: 0 0.9%;
  width: 27.7%;
  height: 18%;
  padding: 1.8%;
  border: #8e909421 1px solid;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.05);
}
#employment .employmentItem .salary {
  float: right;
  color: #72b3f0;
  font-size: 1.2rem;
}
#employment .employmentItem .jobMsg,
#employment .employmentItem .companyMsg {
  color: #8e9094;
  margin-top: 2.5%;
  font-size: 0.8rem;
}
#employment .employmentItem .companyMsg {
  border-top: #8e90943d 1px solid;
  padding-top: 3%;
}
#employment .employmentItem span {
  margin-right: 3%;
}
#employment .employmentItem:hover {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
}
.employmentItem:hover .station {
  color: #72b3f0;
}
#employment .el-switch__label.el-switch__label--right.is-active,
#employment .el-switch__label.el-switch__label--left.is-active {
  color: #72b3f0;
}
#employment .el-pagination {
  margin-top: 1%;
  text-align: center;
}
/* 公司、学校列表每一项 */
#companyList .companyItem,
#schoolList .schoolItem {
  position: relative;
  flex: 0 1 auto;
  margin: 0.5% 1%;
  padding: 1.3%;
  width: 20%;
  height: 15%;
  border: #8e909421 1px solid;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.05);
}
#companyList .logo,
#schoolList .logo {
  width: 60px;
  height: 60px;
}
#companyList .name,
#schoolList .name {
  position: absolute;
  top: 30px;
  left: 90px;
  font-weight: 600;
}
#companyList .msg,
#schoolList .msg {
  position: absolute;
  top: 57px;
  left: 90px;
  font-size: 0.9rem;
  color: #8e9094;
}
#companyList .msg span {
  margin-right: 5px;
}
#companyList .companyItem:hover,
#schoolList .schoolItem:hover {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
}
#companyList .companyItem:hover .name,
#schoolList .schoolItem:hover .name {
  color: #72b3f0;
}
/* 公司详情 */
#companyDetails .listBar{
  width: 70%;
}
#companyDetails .el-button {
  float: right;
  margin-right: 3%;
}
#companyDetails .list {
  clear: both;
  margin-top: 2%;
  height: 70vh;
  width: 100%;
}
#companyDetails .list li {
  width: 97%;
  margin-bottom: 5px;
  padding: 1.5%;
}
#companyDetails .list li:not(:last-of-type) {
  border-bottom: #8e909444 1px solid;
}
#companyDetails .station {
  margin-bottom: 1%;
}
#companyDetails .salary {
  color: #72b3f0;
  margin-right: 10px;
}
#companyDetails .msg span:not(.salary) {
  font-size: 0.9rem;
  margin-right: 5px;
  color: #8e9094;
}
#companyDetails .authorMsg {
  float: right;
  margin-top: 10px;
}
#companyDetails .authorMsg span {
  margin-left: 10px;
}
/* 公司信息 */
#companyDetails .companyBar {
  position: fixed;
  width: 22%;
  height: 70vh;
  top: 25vh;
  left: 71vw;
  border-left: #8e909444 1px solid;
}
/* 全部居中 */
#companyDetails .companyBar img,
#companyDetails .companyName,
#companyDetails .companyBar .msg,
#companyDetails .companyBar .introduction {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
}
#companyDetails .companyBar img {
  width: 50px;
  height: 50px;
  top: 15%;
}
#companyDetails .companyName {
  top: 28%;
  font-size: 1.1rem;
  font-weight: 600;
}
#companyDetails .companyBar .msg {
  top: 35%;
  font-size: 0.9rem;
  color: #75777a;
}
#companyDetails .companyBar .msg span:not(.level) {
  margin-right: 5px;
}
#companyDetails .companyBar .introduction {
  top: 63%;
  width: 85%;
  line-height: 1.5rem;
  font-size: 0.9rem;
}
</style>