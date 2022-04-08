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
      <el-switch
        v-model="certification"
        active-text="只看学校认证"
        inactive-text="展示所有岗位"
        :active-value="1"
        :inactive-value="0"
        active-color="#72b3f0"
        v-show="!isEmploymentDetails && !isCompanyDetails && !isSchoolDetails "
        @change="switchRecommend"
      >
      </el-switch>
      <el-table
        :data="recommendList"
        style="width: 100%"
        @row-click="tableClick"
        v-if="certification"
        class="recommend"
        header-cell-style="text-align:center"
        cell-style="text-align:center"
      >
        <el-table-column
          prop="type"
          label="类型"
          width="140"
        >
        </el-table-column>
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
          prop="area"
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
      <div
        id="employmentListBox"
        v-show="!isEmploymentDetails && !isCompanyDetails && !isSchoolDetails && !certification"
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
                <el-option
                  label="3K以下"
                  :value="1"
                ></el-option>
                <el-option
                  label="3-5K"
                  :value="2"
                ></el-option>
                <el-option
                  label="5-10K"
                  :value="3"
                ></el-option>
                <el-option
                  label="10-20K"
                  :value="4"
                ></el-option>
                <el-option
                  label="20K以上"
                  :value="5"
                ></el-option>
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
              <el-button
                round
                icon="el-icon-refresh-left"
                @click="refreshSelect"
              >重置</el-button>
            </li>
            <li>
              <el-button
                round
                type="primary"
                icon="el-icon-s-operation"
                @click="getSelectAccountListByPage"
              >筛选</el-button>
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
                :src="item.logo"
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
          @current-change="switchPage(val)"
        >
        </el-pagination>
      </div>
      <employment-details
        v-if="isEmploymentDetails"
        :details="employmentDetails"
        :companyDetails="companyDetails"
        @toList="employmentToList"
        @refresh="getAccountListByPage"
      ></employment-details>
      <div
        id="companyDetails"
        v-if="isCompanyDetails"
      >
        <el-button
          round
          @click="companyToList"
          v-if="!isEmploymentDetails "
        >返回</el-button>
        <el-button
          round
          icon="el-icon-plus"
          type="primary"
          @click="follow"
          v-if="!isFollow"
        >关注</el-button>
        <el-button
          round
          icon="el-icon-check"
          type="primary"
          @click="cancelFollow"
          v-else
        >已关注</el-button>
        <el-link
          icon="el-icon-edit"
          @click="toEditCompany"
        >修改</el-link>
        <div class="listBar">
          <ul class="list">
            <li
              v-for="(item, index) in company_employmentList"
              :key="item.id"
              @click="toEmploymentDetails(item.id)"
            >
              <p class="authorMsg">
                <span>{{item.author}}</span>
                <span>她的职位</span>
              </p>
              <p class="station">{{ item.station }}</p>
              <p class="msg">
                <span class="salary"><span>{{ item.salaryStart }} - {{ item.salaryEnd }}</span></span>
                <span>{{ showLocation(item.location) }}</span>
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
        <div
          class="companyBar"
          v-if="!isEmploymentDetails "
        >
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
        <el-link
          icon="el-icon-edit"
          @click="toEditSchool"
        >修改</el-link>
        <img
          :src="schoolDetails.logo"
          alt="学校logo"
          class="logo"
        >
        <h3>{{schoolDetails.name}}</h3>
        <h6>{{schoolDetails.address}}</h6>
        <div class="concat">
          <ul>
            <li
              v-for="item in teacherList"
              :key="item.username"
            >
              <img
                :src="item.avatar"
                alt="联系人头像"
              />
              <p class="name">{{item.username}}</p>
              <el-button
                type="primary"
                icon="el-icon-chat-line-round"
                circle
                @click="schoolToChat(item.username)"
              ></el-button>
            </li>
          </ul>
        </div>
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
        v-if="searchSelect==1 || searchSelect == ''"
        header-cell-style="text-align:center"
        cell-style="text-align:center"
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
          prop="area"
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
        header-cell-style="text-align:center"
        cell-style="text-align:center"
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
        header-cell-style="text-align:center"
        cell-style="text-align:center"
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
      isFollow: false, //是否关注了这个公司
      showDeleteUpdate: false, //详情是否展示删除修改按钮
      currentPage: 1, // 当前页
      total: 0, // 数据总条数
      searchValue: "", //搜索内容
      searchSelect: "", //选择搜索的类别
      searchList: [], //搜索结果列表
      educationFilter: "", //筛选学历
      salaryFilter: "", //筛选薪资
      locationOptions: provinceAndCityDataPlus,
      locationSelectedOptions: [], //工作地点选择的两个变量
      certification: 0, //筛选学校认证
      employmentList: [], //首页招聘信息列表
      recommendList: [], //学校推荐列表
      companyList: [], //公司列表
      company_employmentList: [], //某个公司的招聘信息列表
      schoolList: [], //学校列表
      employmentDetails: {}, //某个招聘信息的详情
      companyDetails: {}, //招聘信息详情页面的公司信息
      schoolDetails: {}, //学校详情
      teacherList: [], //老师列表
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
    //选择是否展示学校认证
    switchRecommend() {
      if (this.certification == 0) return;
      let that = this;
      this.$ajax.get("/company/getAllCompany").then((res) => {
        let companys = res.data;
        this.$ajax
          .post(
            "/employment/getRecommend",
            qs.stringify({ school: window.localStorage.getItem("school") }),
            {
              "content-type": "application/x-www-form-urlencoded",
            }
          )
          .then((res) => {
            that.recommendList = res.data;
            for (let item in that.recommendList) {
              that.recommendList[item].salary =
                that.recommendList[item].salaryStart +
                " - " +
                that.recommendList[item].salaryEnd;
              that.recommendList[item].location =
                that.recommendList[item].location.split(",");
              that.recommendList[item].area = that.showLocation(
                that.recommendList[item].location
              );
              that.recommendList[item].type = that.showIsFullTime(
                that.recommendList[item].isFullTime
              );
            }
            for (let i in that.recommendList) {
              for (let j in companys) {
                if (that.recommendList[i].companyId == companys[j].id) {
                  that.recommendList[i].companyName = companys[j].name;
                }
              }
            }
          });
      });
    },
    //查看招聘详情
    toEmploymentDetails(id) {
      let that = this;
      this.$ajax.get("/employment/getEmploymentById/" + id).then((res) => {
        that.employmentDetails = res.data;
        that.employmentDetails.location =
          that.employmentDetails.location.split(",");
        that.$ajax
          .get("/company/getCompanyById/" + that.employmentDetails.companyId)
          .then((res) => {
            that.companyDetails = res.data;
            that.companyDetails.location =
              that.companyDetails.location.split(",");
            that.isEmploymentDetails = true;
          });
      });
    },
    //招聘详情返回列表
    employmentToList() {
      this.isEmploymentDetails = false;
    },
    //查看公司详情
    toCompanyDetails(id) {
      let that = this;
      this.$ajax.get("/company/getCompanyById/" + id).then((res) => {
        that.companyDetails = res.data;
        that.companyDetails.location = that.companyDetails.location.split(",");
      });
      this.$ajax.get("/company/getAllEmployment/" + id).then((res) => {
        that.company_employmentList = res.data;
        for (let item in that.company_employmentList) {
          that.company_employmentList[item].location =
            that.company_employmentList[item].location.split(",");
        }
        that.isCompanyDetails = true;
      });
      //判断用户是否关注该公司
      let followList = window.localStorage.getItem("followList");
      followList = followList.split(",");
      for (let item in followList) {
        if (followList[item] == id) {
          this.isFollow = true;
          break;
        }
      }
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
        that.$ajax
          .post(
            "/school/getTeachers",
            qs.stringify({ school: that.schoolDetails.name }),
            {
              "content-type": "application/x-www-form-urlencoded",
            }
          )
          .then((res) => {
            that.teacherList = res.data;
          });
      });
    },
    //学校详情返回列表
    schoolToList() {
      this.isSchoolDetails = false;
    },
    //选择调用哪个分页函数
    switchPage(val) {
      if (
        this.educationFilter != "" ||
        this.salaryFilter != "" ||
        this.locationSelectedOptions.length ||
        this.certification != ""
      ) {
        this.handleSelectCurrentChange(val);
      } else {
        this.handleCurrentChange(val);
      }
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
    //筛选条件下的：按照分页显示数据的函数
    getSelectAccountListByPage() {
      let that = this;
      let salaryStart = 0;
      let salaryEnd = 0;
      switch (this.salaryFilter) {
        case 1:
          salaryEnd = 3000;
          break;
        case 2:
          salaryStart = 3000;
          salaryEnd = 5000;
          break;
        case 3:
          salaryStart = 5000;
          salaryEnd = 10000;
          break;
        case 4:
          salaryStart = 10000;
          salaryEnd = 20000;
          break;
        case 5:
          salaryStart = 20000;
      }
      let obj = {
        education: this.educationFilter,
        salaryStart: salaryStart,
        salaryEnd: salaryEnd,
        location: this.locationSelectedOptions.join(","),
      };
      this.$ajax
        .post("/employment/getSelectAccountListByPage/1", qs.stringify(obj), {
          "content-type": "application/x-www-form-urlencoded",
        })
        .then((res) => {
          // 接收后端返回的数据总条数 total 和 对应页码的数据 data
          let { total, results } = res.data;
          // 赋值给对应的变量即可
          that.total = total;
          that.employmentList = results;
          for (let item in that.employmentList) {
            that.employmentList[item].location =
              that.employmentList[item].location.split(",");
          }
          // 如果当前页没有数据 且 排除第一页
          if (!data.length && this.currentPage !== 1) {
            // 页码减去 1
            that.currentPage -= 1;
            // 再调用自己
            that.getSelectAccountListByPage();
          }
        });
    },
    //重置筛选条件
    refreshSelect() {
      this.educationFilter = "";
      this.salaryFilter = "";
      this.locationSelectedOptions = [];
      this.certification = "";
      let that = this;
      this.$ajax.get("/employment/getAccountListByPage/1").then((res) => {
        that.employmentList = res.data.results;
        that.total = res.data.total;
        for (let item in that.employmentList) {
          that.employmentList[item].location =
            that.employmentList[item].location.split(",");
        }
      });
    },
    //筛选条件下的分页函数
    handleSelectCurrentChange(val) {
      this.currentPage = val; // 保存当前页码
      this.getSelectAccountListByPage(); // 调用分页函数
    },
    //根据关键字搜索职位
    searchEmployment(isFullTime) {
      if (this.searchValue == "") {
        this.$message.warning("请输入搜索内容");
        return;
      }
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
              let location = that.searchList[item].location.split(",");
              that.searchList[item].area =
                CodeToText[location[0]] + "" + CodeToText[location[1]];
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
      if (this.searchValue == "") {
        this.$message.warning("请输入搜索内容");
        return;
      }
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
      if (this.searchValue == "") {
        this.$message.warning("请输入搜索内容");
        return;
      }
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
      let that = this;
      this.$ajax.get("/employment/getEmploymentById/" + row.id).then((res) => {
        that.employmentDetails = res.data;
        that.employmentDetails.location =
          that.employmentDetails.location.split(",");
        that.$ajax
          .get("/company/getCompanyById/" + that.employmentDetails.companyId)
          .then((res) => {
            that.companyDetails = res.data;
            that.companyDetails.location =
              that.companyDetails.location.split(",");
            that.isEmploymentDetails = true;
          });
      });
    },
    //关注公司
    follow() {
      let that = this;
      this.$ajax
        .post(
          "/company/follow/" +
            window.localStorage.getItem("username") +
            "/" +
            this.companyDetails.id
        )
        .then((res) => {
          window.localStorage.setItem("followList", res.data.join(","));
          that.isFollow = true;
          that.$message.success("关注成功");
        });
    },
    //取消关注
    cancelFollow() {
      let that = this;
      this.$ajax
        .post(
          "/company/cancelFollow/" +
            window.localStorage.getItem("username") +
            "/" +
            this.companyDetails.id
        )
        .then((res) => {
          window.localStorage.setItem("followList", res.data.join(","));
          that.isFollow = false;
          that.$message.success("取消关注");
        });
    },
    //学校列表点击聊天
    schoolToChat(username) {
      window.sessionStorage.setItem("toChat", username);
      this.$router.replace("/messages");
    },
    //公司详情页面点击修改
    toEditCompany() {
      window.sessionStorage.setItem("editCompany", true);
      this.$router.replace("/userCompany");
    },
    //学校详情页面点击修改
    toEditSchool() {
      window.sessionStorage.setItem("editSchool", true);
      this.$router.replace("/userSchool");
    },
  },
  mounted() {
    let that = this;
    //获取分页招聘信息
    this.$ajax.get("/employment/getAccountListByPage/1").then((res) => {
      that.employmentList = res.data.results;
      that.total = res.data.total;
      for (let item in that.employmentList) {
        that.employmentList[item].location =
          that.employmentList[item].location.split(",");
      }
    });
    //获取公司分页
    this.$ajax.get("/company/getAccountListByPage/1").then((res) => {
      that.companyList = res.data.results;
      for (let item in that.companyList) {
        that.companyList[item].location =
          that.companyList[item].location.split(",");
      }
    });
    //获取学校分页
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
/* 学校认证 */
#employment .el-switch {
  position: absolute;
  top: -10px;
  right: 0;
}
#employment .el-switch__label.el-switch__label--right.is-active,
#employment .el-switch__label.el-switch__label--left.is-active {
  color: #72b3f0;
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
/* 公司详情，学校详情的返回按钮和修改 */
#companyDetails .el-button,
#schoolDetails .el-button {
  float: right;
  margin-right: 3%;
}
#companyDetails .el-link,
#schoolDetails .el-link {
  float: right;
  margin-right: 3%;
  margin-top: 15px;
}
#companyDetails .list {
  clear: both;
  margin-top: 2%;
  height: 70vh;
  width: 100%;
}
#companyDetails .list li {
  width: 96%;
  margin-bottom: 5px;
  padding: 2%;
}
#companyDetails .list li:not(:last-of-type) {
  border-bottom: #8e909444 1px solid;
}
#companyDetails .list li:hover {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
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
#schoolDetails .logo {
  width: 120px;
  height: 120px;
  position: relative;
  top: 20px;
  left: -70px;
}
/* 学校名 */
#schoolDetails h3 {
  width: 66%;
  position: relative;
  top: -80px;
  left: 175px;
  font-size: 1.4rem;
  font-weight: 600;
}
#schoolDetails h6 {
  position: relative;
  top: -60px;
  left: 175px;
}
/* 学校详情-联系人列表 */
#schoolDetails .concat ul {
  width: 28%;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  float: left;
  padding: 1%;
}
#schoolDetails .concat li {
  position: relative;
  padding: 15px;
}
#schoolDetails .concat img {
  width: 48px;
  height: 48px;
}
#schoolDetails .concat .name {
  position: absolute;
  top: 30px;
  left: 80px;
}
#schoolDetails .concat .el-button {
  margin-top: 5px;
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
/* 展示学校认证 */
#employment .recommend {
  position: relative;
  top: 20px;
  height: 550px;
  overflow-y: auto;
}
</style>