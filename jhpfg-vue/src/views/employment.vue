<template>
  <div id="employment">
    <div v-if="!isSearchList">
      <i
        class="el-icon-suitcase-1 index-icon"
        slot="icon"
      ></i>
      <h4
        class="index-boxTitle"
        slot="boxTitle"
      >招聘信息</h4>
      <div
        id="employmentListBox"
        v-show="!isEmploymentDetails && !isCompanyDetails && !isSchoolDetails"
      >
        <el-input
          placeholder="请输入内容"
          v-model="searchValue"
          class="input-with-select searchInput"
        >
          <el-select
            v-model="searchSelect"
            slot="prepend"
            placeholder="请选择"
          >
            <el-option
              label="搜岗位"
              value="1"
            ></el-option>
            <el-option
              label="搜公司"
              value="2"
            ></el-option>
            <el-option
              label="搜学校"
              value="3"
            ></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            class="searchButton"
            v-if="searchSelect == 1 || searchSelect == ''"
            @click="searchEmployment(0)"
          >找实习</el-button>
          <el-button
            slot="append"
            icon="el-icon-search"
            class="searchButton"
            v-if="searchSelect == 1 || searchSelect == ''"
            @click="searchEmployment(1)"
          >找全职</el-button>
          <el-button
            slot="append"
            icon="el-icon-search"
            class="searchButton"
            v-if="searchSelect == 2"
            @click="searchCompany()"
          >找公司</el-button>
          <el-button
            slot="append"
            icon="el-icon-search"
            class="searchButton"
            v-if="searchSelect == 3"
            @click="searchSchool()"
          >找学校</el-button>
        </el-input>
        <div
          id="employmentContainer"
          v-show="searchSelect == 1 || searchSelect == ''"
        >
          <ul id="filter">
            <li>筛选岗位：</li>
            <li>
              <el-select
                v-model="educationFilter"
                placeholder="学历要求"
              >
                <el-option value="不限"></el-option>
                <el-option value="大专"></el-option>
                <el-option value="本科"></el-option>
                <el-option value="硕士"></el-option>
                <el-option value="博士"></el-option>
              </el-select>
            </li>
            <li>
              <el-select
                v-model="salaryFilter"
                placeholder="薪资待遇"
              >
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
              <el-button
                round
                icon="el-icon-refresh-left"
              >重置</el-button>
            </li>
          </ul>
          <ul id="employmentList">
            <li
              class="employmentItem"
              v-for="item in employmentList"
              :key="item.id"
              @click="toEmploymentDetails(item.id)"
            >
              <p class="salary"><span>{{ item.salaryStart }} - {{ item.salaryEnd }}</span></p>
              <el-tag class="isFullTime">{{showIsFullTime(item.isFullTime)}}</el-tag>
              <p class="station">{{ item.station }}</p>
              <p class="jobMsg">
                <span>{{ showLocation(item.location) }}</span>
                <span>{{ item.education }}</span>
              </p>
              <p class="companyMsg">
                <span>{{ item.companyName }}</span>
                <span>{{ item.trade }}</span>
                <span>{{ item.level }}</span>
              </p>
            </li>
          </ul>
        </div>
        <div
          id="companyContainer"
          v-if="searchSelect == 2"
        >
          <ul id="companyList">
            <li
              class="companyItem"
              v-for="(item, index) in companyList"
              :key="item.id"
              @click="toCompanyDetails(item.id)"
            >
              <img
                :src="item.logo"
                alt="公司logo"
                class="logo"
              />
              <p class="name">{{ item.name }}</p>
              <p class="msg">
                <span>{{ showLocation(item.location) }}</span>
                <span>{{ item.trade }}</span>
                <span>{{ item.level }}</span>
              </p>
            </li>
          </ul>
        </div>
        <div
          id="schoolContainer"
          v-if="searchSelect == 3"
        >
          <ul id="schoolList">
            <li
              class="schoolItem"
              v-for="(item,index) in schoolList"
              :key="item.id"
              @click="toSchoolDetails(item.id)"
            >
              <img
                src="../assets/image/avatar.png"
                alt="学校logo"
                class="logo"
              />
              <p class="name">{{ item.name }}</p>
            </li>
          </ul>
        </div>
        <el-pagination
          :page-size="9"
          :current-page="currentPage"
          :total="total"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
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
        @refresh="getAccountListByPage"
      ></employment-details>
      <div
        id="companyDetails"
        v-if="isCompanyDetails"
      >
        <el-button
          round
          @click="companyToList"
        >返回</el-button>
        <div class="listBar">
          <ul class="list">
            <li
              v-for="(item, index) in company_employmentList"
              :key="item.id"
            >
              <p class="authorMsg">
                <span>发布者名字</span>
                <span>她的职位</span>
              </p>
              <p class="station">{{ item.station }}</p>
              <p class="msg">
                <span class="salary"><span>{{ item.salaryStart }} - {{ item.salaryEnd }}</span></span>
                <span>{{ item.location }}</span>
                <span>{{ item.education }}</span>
              </p>
            </li>
          </ul>
          <!-- <el-pagination
          :page-size="9"
          :current-page="currentPage"
          :total="total"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
        >
        </el-pagination> -->
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
      </div>
      <div
        id="schoolDetails"
        v-if="isSchoolDetails"
      >
        <el-button
          round
          @click="schoolToList"
        >返回</el-button>
        <el-carousel
          :interval="4000"
          type="card"
          height="200px"
        >
          <el-carousel-item
            v-for="item in 6"
            :key="item"
          >
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <div class="concat">
          <ul>
            <li>
              <img
                src="../assets/image/avatar.png"
                alt="联系人头像"
              />
              <p class="name">李老师</p>
              <p class="tel">13700000000</p>
              <el-button
                type="primary"
                icon="el-icon-chat-line-round"
                circle
              ></el-button>
            </li>
            <li>
              <img
                src="../assets/image/avatar.png"
                alt="联系人头像"
              />
              <p class="name">李老师</p>
              <p class="tel">13700000000</p>
              <el-button
                type="primary"
                icon="el-icon-chat-line-round"
                circle
              ></el-button>
            </li>
          </ul>
        </div>
        <h3>{{schoolDetails.name}}</h3>
        <div class="content">
          {{schoolDetails.introduction}}
        </div>
      </div>
    </div>
    <div
      class="searchList"
      v-if="isSearchList"
    >
      <div class="topBar">
        <span class="searchValue">“{{searchValue}}”的搜索结果</span>
        <el-button
          round
          class="toList"
          @click="isSearchList = false"
        >返回</el-button>
      </div>
      <el-table
        :data="searchList"
        stripe
        style="width: 100%"
        @row-click="tableClick"
        v-if="searchSelect==1"
      >
        <el-table-column
          prop="station"
          label="岗位"
        >
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="公司"
        >
        </el-table-column>
        <el-table-column
          prop="salary"
          label="薪水"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="location"
          label="地点"
          width="140"
        >
        </el-table-column>
        <el-table-column
          prop="education"
          label="学历"
          width="140"
        >
        </el-table-column>
      </el-table>
      <el-table
        :data="searchList"
        stripe
        style="width: 100%"
        @row-click="tableClick"
        v-if="searchSelect==2"
      >
        <el-table-column
          prop="name"
          label="公司"
        >
        </el-table-column>
        <el-table-column
          prop="location"
          label="地点"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="trade"
          label="行业"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="level"
          label="融资阶段"
          width="200"
        >
        </el-table-column>
      </el-table>
      <el-table
        :data="searchList"
        stripe
        style="width: 100%"
        @row-click="tableClick"
        v-if="searchSelect==3"
      >
        <el-table-column
          prop="name"
          label="名字"
        >
        </el-table-column>
        <el-table-column
          prop="location"
          label="地点"
          width="200"
        >
        </el-table-column>
      </el-table>
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
import qs from "qs";

export default {
  components: { EmploymentDetails },
  data() {
    return {
      isEmploymentDetails: false, //是否是招聘信息详情页，默认为否
      isCompanyDetails: false, //是否是公司详情页，默认为否
      isSchoolDetails: false, //是否是学校详情页，默认为否
      isSearchList: false, //是否是搜索结果列表，默认为否
      currentPage: 1, // 当前页
      total: 0, // 数据总条数
      searchValue: "", //搜索内容
      searchSelect: "", //选择搜索的类别
      searchList: [], //搜索结果列表
      educationFilter: "", //筛选学历
      salaryFilter: "", //筛选薪资
      locationOptions: provinceAndCityDataPlus,
      locationSelectedOptions: [], //工作地点选择的两个变量
      certification: false, //筛选学校认证
      employmentList: [], //首页招聘信息列表
      companyList: [], //公司列表
      company_employmentList: [], //某个公司的招聘信息列表
      schoolList: [], //学校列表
      employmentDetails: {}, //某个招聘信息的详情
      companyDetails: {}, //招聘信息详情页面的公司信息
      schoolDetails: {}, //学校详情
    };
  },
  watch: {
    searchSelect: function () {
      this.currentPage = 1;
      this.getAccountListByPage();
    },
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
    //查看招聘详情
    toEmploymentDetails(id) {
      this.isEmploymentDetails = true;
      let that = this;
      this.$ajax.get("/employment/getEmploymentById/" + id).then((res) => {
        that.employmentDetails = res.data;
        that.$ajax
          .get("/company/getCompanyById/" + that.employmentDetails.companyId)
          .then((res) => {
            that.companyDetails = res.data;
            that.companyDetails.location =
              that.companyDetails.location.split(",");
          });
      });
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
    toCompanyDetails(id) {
      let that = this;
      this.$ajax.get("/company/getCompanyById/" + id).then((res) => {
        that.companyDetails = res.data;
        that.companyDetails.location = that.companyDetails.location.split(",");
      });
      this.$ajax.get("/company/getAllEmployment/" + id).then((res) => {
        that.company_employmentList = res.data;
        that.isCompanyDetails = true;
      });
    },
    //公司详情返回列表
    companyToList() {
      this.isCompanyDetails = false;
    },
    //查看学校详情
    toSchoolDetails(id) {
      this.isSchoolDetails = true;
      let that = this;
      this.$ajax.get("/school/getSchoolById/" + id).then((res) => {
        that.schoolDetails = res.data;
      });
    },
    //学校详情返回列表
    schoolToList() {
      this.isSchoolDetails = false;
    },
    // 分页显示处理结果
    setAccountList(response) {
      // 接收后端返回的数据总条数 total 和 对应页码的数据 data
      let { total, results } = response.data;
      // 赋值给对应的变量即可
      this.total = total;
      this.employmentList = results;
      // 如果当前页没有数据 且 排除第一页
      if (!data.length && this.currentPage !== 1) {
        // 页码减去 1
        this.currentPage -= 1;
        // 再调用自己
        this.getAccountListByPage();
      }
    },
    // 按照分页显示数据的函数
    getAccountListByPage() {
      // 收集当前页码 和 每页显示条数
      let currentPage = this.currentPage;
      let that = this;
      switch (this.searchSelect) {
        case 1: {
          // 发送ajax请求 把分页数据发送给后端
          this.$ajax
            .get("/employment/getAccountListByPage/" + currentPage)
            .then((response) => {
              that.setAccountList(response);
            });
          break;
        }
        case 2: {
          this.$ajax
            .get("/company/getAccountListByPage/" + currentPage)
            .then((response) => {
              that.setAccountList(response);
            });
          break;
        }
        case 3: {
          this.$ajax
            .get("/school/getAccountListByPage/" + currentPage)
            .then((response) => {
              that.setAccountList(response);
            });
          break;
        }
      }
    },
    // 当前页码改变 就会触发这个函数
    handleCurrentChange(val) {
      this.currentPage = val; // 保存当前页码
      this.getAccountListByPage(); // 调用分页函数
    },
    //根据关键字搜索职位
    searchEmployment(isFullTime) {
      let obj = {
        keyword: this.searchValue,
        isFullTime,
      };
      let that = this;
      this.$ajax.get("/company/getAllCompany").then((res) => {
        let companys = res.data;
        that.$ajax
          .post("/employment/getEmploymentByKeyword", qs.stringify(obj), {
            "content-type": "application/x-www-form-urlencoded",
          })
          .then((res) => {
            that.isSearchList = true;
            that.searchList = res.data;
            for (let item in that.searchList) {
              that.searchList[item].salary =
                that.searchList[item].salaryStart +
                " - " +
                that.searchList[item].salaryEnd;
            }
            for (let i in that.searchList) {
              for (let j in companys) {
                if (that.searchList[i].companyId == companys[j].id) {
                  that.searchList[i].companyName = companys[j].name;
                }
              }
            }
          });
      });
    },
    //根据关键字搜索公司
    searchCompany() {
      let obj = {
        keyword: this.searchValue,
      };
      let that = this;
      this.$ajax
        .get("/company/getCompanyByKeyword", qs.stringify(obj), {
          "content-type": "application/x-www-form-urlencoded",
        })
        .then((res) => {
          that.isSearchList = true;
          that.searchList = res.data;
        });
    },
    //根据关键字搜索学校
    searchSchool() {
      let obj = {
        keyword: this.searchValue,
      };
      let that = this;
      this.$ajax
        .get("school/getSchoolByKeyword", qs.stringify(obj), {
          "content-type": "application/x-www-form-urlencoded",
        })
        .then((res) => {
          that.isSearchList = true;
          that.searchList = res.data;
        });
    },
    //点击搜索列表的行
    tableClick(row, column, event) {
      this.fromSearch = true;
      this.isSearchList = false;
      this.isEmploymentDetails = true;
      let that = this;
      this.$ajax.get("/employment/getEmploymentById/" + row.id).then((res) => {
        that.employmentDetails = res.data;
        that.$ajax
          .get("/company/getCompanyById/" + that.employmentDetails.companyId)
          .then((res) => {
            that.companyDetails = res.data;
          });
      });
    },
  },
  mounted() {
    let that = this;
    this.$ajax.get("/employment/getAccountListByPage/1").then((res) => {
      that.employmentList = res.data.results;
      that.total = res.data.total;
      for (let item in that.employmentList) {
        that.employmentList[item].location =
          that.employmentList[item].location.split(",");
      }
    });
    this.$ajax.get("/company/getAccountListByPage/1").then((res) => {
      that.companyList = res.data.results;
      for (let item in that.companyList) {
        that.companyList[item].location =
          that.companyList[item].location.split(",");
      }
    });
    this.$ajax.get("/school/getAccountListByPage/1").then((res) => {
      that.schoolList = res.data.results;
    });
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
#employment .employmentItem .isFullTime {
  float: left;
}
#employment .employmentItem .salary {
  float: right;
  color: #72b3f0;
  font-size: 1.2rem;
  width: 40%;
  text-align: right;
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
  font-size: 0.85rem;
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
#companyDetails .listBar {
  width: 70%;
}
/* 公司详情，学校详情的返回按钮 */
#companyDetails .el-button,
#schoolDetails .el-button {
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
  font-size: 0.9rem;
}
#companyDetails .authorMsg span:last-of-type::before {
  content: "";
  width: 1px;
  height: 1rem;
  background: #8e909483;
  display: inline-block;
  margin: 0 20px -3px 20px;
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
  width: 100%;
  top: 35%;
  font-size: 0.85rem;
  display: flex;
  justify-content: center;

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
/* 学校详情 */
/* 走马灯 */
#schoolDetails .el-carousel {
  clear: both;
}
#schoolDetails .el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
#schoolDetails .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

#schoolDetails .el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/* 学校详情-联系人列表 */
#schoolDetails .concat ul {
  width: 30%;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  float: left;
}
#schoolDetails .concat li {
  position: relative;
  padding: 15px;
  font-size: 0.9rem;
}
#schoolDetails .concat img {
  width: 48px;
  height: 48px;
}
#schoolDetails .concat .name,
#schoolDetails .concat .tel {
  position: absolute;
  top: 25px;
  left: 80px;
}
#schoolDetails .concat .tel {
  top: 45px;
}
#schoolDetails .concat .el-button {
  margin-top: 5px;
}
/* 学校详情 */
/* 学校名 */
#schoolDetails h3 {
  width: 66%;
  position: relative;
  top: 20px;
  left: 35px;
  font-size: 1.4rem;
  font-weight: 600;
}
/* 介绍 */
#schoolDetails .content {
  width: 66%;
  margin-left: 30%;
  padding: 2%;
}
/* 搜索结果页面 */
#employment .searchList .toList {
  float: right;
}
#employment .searchList .searchValue {
  font-weight: 600;
  font-size: 1.2rem;
}
</style>