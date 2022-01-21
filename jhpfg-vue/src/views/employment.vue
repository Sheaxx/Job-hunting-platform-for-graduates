<template>
  <div id="employment">
    <i class="el-icon-suitcase-1 index-icon" slot="icon"></i>
    <h4 class="index-boxTitle" slot="boxTitle">招聘信息</h4>
    <div id="employmentListBox" v-if="!isDetails">
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
          @click="toDetails"
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
      <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </div>
    <employment-details
      v-else
      :details="details"
      @toList="toList"
      @collect="collect"
      @cancelCollect="cancelCollect"
      @sendResume="sendResume"
    ></employment-details>
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
      isDetails: false, //是否是详情页，默认为否
      searchValue: "", //搜索内容
      searchSelect: "", //选择搜索的类别
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
    };
  },
  methods: {
    //查看详情
    toDetails() {
      this.isDetails = true;
    },
    //详情返回列表
    toList() {
      this.isDetails = false;
    },
    //收藏招聘信息
    collect() {
      this.details.isCollect = true;
    },
    //取消收藏招聘信息
    cancelCollect() {
      this.details.isCollect = false;
    },
    //投递简历
    sendResume() {
      
    }
  },
};
</script>

<style>
#employment {
  position: relative;
}
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
#employment .employmentItem {
  flex: 0 1 auto;
  background: #fff;
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
  text-align: center;
}
</style>