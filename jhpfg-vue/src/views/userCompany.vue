<template>
  <div id="userCompany">
    <i
      class="el-icon-user index-icon"
      slot="icon"
    ></i>
    <h4
      class="index-boxTitle"
      slot="boxTitle"
    >个人中心</h4>
    <div class="userInfo">
      <el-tabs
        tab-position="left"
        style="height: 500px"
        :value="tabValue"
      >
        <el-tab-pane
          label="我的账号信息"
          class="user"
          name="1"
        >
          <h5 class="boxTitle">账号信息</h5>
          <ul>
            <li>
              <span class="itemTitle">用户名：{{ userInfo.username }}</span>
            </li>
            <li>
              <span class="itemTitle">角色：{{ userInfo.role }}</span>
            </li>
            <li>
              <el-button
                round
                v-if="!isUpdatePassword"
                @click="openUpdatePassword"
              >修改密码</el-button>
              <el-button
                round
                v-else
                @click="cancelUpdatePassword"
              >取消修改</el-button>
            </li>
          </ul>
          <div
            id="updatePassword"
            v-if="isUpdatePassword"
          >
            <el-input
              placeholder="请输入旧密码"
              v-model="oldPassword"
              show-password
              class="password"
            ></el-input>
            <el-input
              placeholder="请输入新密码"
              v-model="newPassword"
              show-password
              class="password"
            ></el-input>
            <el-button
              type="primary"
              round
              @click="updatePassword"
            >确认修改</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="我的个人信息"
          name="2"
        >
          <h5 class="boxTitle">个人信息</h5>
        </el-tab-pane>
        <el-tab-pane
          label="我的公司信息"
          name="3"
        >
          <div
            id="companyReadBox"
            v-if="!isUpdateCompany"
          >
            <el-button
              type="primary"
              round
              @click="openUpdateCompany"
            >更新信息</el-button>
            <h6 class="companyName">{{companyDetails.name}}</h6>
            <ul class="row1">
              <li>
                <i class="el-icon-menu"></i>{{companyDetails.trade}}
              </li>
              <li>
                <i class="el-icon-s-check"></i>{{companyDetails.level}}
              </li>
            </ul>
            <ul class="row2">
              <li>
                <i class="el-icon-location"></i>{{companyDetails.address}}
              </li>
            </ul>
            <div class="introduction">
              <h6>公司简介</h6>
              <p>{{companyDetails.introduction}}</p>
            </div>
          </div>
          <div
            id="companyUpdateBox"
            v-else
          >
            <el-form label-width="100px">
              <el-form-item label="公司名">
                <el-input v-model="editCompany.name" />
              </el-form-item>
              <el-form-item label="行业">
                <trade-select
                  :value="tradeValue"
                  @setTradeValue="setTradeValue"
                >
                </trade-select>
              </el-form-item>
              <el-form-item label="融资">
                <el-select v-model="editCompany.level">
                  <el-option
                    v-for="item in level"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="地区">
                <el-cascader
                  size="large"
                  :options="options"
                  v-model="locationValue"
                >
                </el-cascader>
              </el-form-item>
              <el-form-item label="详细地址">
                <el-input v-model="editCompany.address" />
              </el-form-item>
              <el-form-item label="内容">
                <el-input
                  type="textarea"
                  v-model="editCompany.introduction"
                  resize="none"
                  :rows="4"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="updateCompany"
                >确认修改</el-button>
                <el-button @click="cancelUpdateCompany">取消修改</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="公司招聘"
          name="4"
        >
          <el-button
            type="primary"
            icon="el-icon-plus"
          >发布招聘</el-button>
          <ul v-if="!isEmploymentDetails">
            <li
              v-for="item in employmentList"
              :key="item.employmentid"
              @click="toEmploymentDetails"
            >
              <p class="salary"><span>{{ item.salaryStart }} - {{ item.salaryEnd }}</span></p>
              <el-tag class="isFullTime">{{showIsFullTime(item.isFullTime)}}</el-tag>
              <p class="station">{{ item.station }}</p>
              <p class="jobMsg">
                <span>{{ item.location }}</span>
                <span>{{ item.education }}</span>
              </p>
              <p class="companyMsg">
                <span>{{ item.companyName }}</span>
                <span>{{ item.trade }}</span>
                <span>{{ item.level }}</span>
              </p>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane
          label="我的发布"
          name="5"
        >
          <!-- <forum-box
            class="forumBox"
            :tab="0"
            :pageSize="6"
            @itemClick="toPostDetails"
          ></forum-box> -->
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  provinceAndCityData,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
import qs from "qs";
import TradeSelect from "../components/tradeSelect.vue";
import Resume from "../components/resume.vue";
import EmploymentDetails from "../components/employmentDetails.vue";
import ForumBox from "../components/forumBox.vue";
import ForumDetails from "../components/forumDetails.vue";

export default {
  components: { TradeSelect },
  data() {
    return {
      tabValue: "1", //选项卡的值，默认为第一个
      isUpdatePassword: false, //修改密码界面，默认为否
      isUpdateCompany: false, //更新公司信息页面，默认为否
      isEmploymentDetails: false, //是否是招聘信息详情页，默认为否
      oldPassword: "", //旧密码
      newPassword: "", //新密码
      tradeValue: [], //公司更新行业选择
      options: provinceAndCityData,
      locationValue: [], //地区选择
      userInfo: {
        //用户信息
        username: "zhalisu", //用户名
        password: "", //密码
        role: "企业", //角色身份
        collections: [], //收藏的招聘信息列表
      },
      companyDetails: {}, //公司详情
      editCompany: {
        id: "",
        logo: "",
        name: "",
        trade: "",
        level: "",
        location: "",
        address: "",
        introduction: "",
      }, //公司编辑信息
      employmentList: [], //公司发布的招聘信息列表
      level: [
        {
          value: "未融资",
          label: "未融资",
        },
        {
          value: "天使轮",
          label: "天使轮",
        },
        {
          value: "A轮",
          label: "A轮",
        },
        {
          value: "B轮",
          label: "B轮",
        },
        {
          value: "C轮",
          label: "C轮",
        },
        {
          value: "D轮及以上",
          label: "D轮及以上",
        },
        {
          value: "已上市",
          label: "已上市",
        },
        {
          value: "不需要融资",
          label: "不需要融资",
        },
      ], //融资阶段
    };
  },
  methods: {
    //点击修改密码
    openUpdatePassword() {
      this.isUpdatePassword = true;
    },
    //取消修改密码
    cancelUpdatePassword() {
      this.oldPassword = "";
      this.newPassword = "";
      this.isUpdatePassword = false;
    },
    //确认修改密码
    updatePassword() {
      this.isUpdatePassword = false;
      this.$message.success("密码修改成功。");
      this.oldPassword = "";
      this.newPassword = "";
    },
    //点击更新公司信息
    openUpdateCompany() {
      Object.assign(this.editCompany, this.companyDetails);
      this.tradeValue = [this.companyDetails.trade];
      this.isUpdateCompany = true;
    },
    //公司行业值设置
    setTradeValue(value) {
      this.editCompany.trade = value;
    },
    //确认修改公司信息
    updateCompany() {
      let obj = Object.assign({}, this.editCompany);
      obj.location = this.locationValue.join(",")
      let that = this;
      this.$ajax
        .post("/company/updateCompany", qs.stringify(obj), {
          "content-type": "application/x-www-form-urlencoded",
        })
        .then((res) => {
          Object.assign(that.companyDetails, that.editCompany);
          that.isUpdateCompany = false;
          that.$message.success("更新成功");
        });
    },
    //取消修改公司信息
    cancelUpdateCompany() {
      this.isUpdateCompany = false;
    },
  },
  mounted() {
    let that = this;
    this.$ajax.get("/company/getCompanyById/" + 1).then((res) => {
      that.companyDetails = res.data;
      that.locationValue = that.companyDetails.location.split(",");
    });
  },
};
</script>

<style>
#userCompany {
  position: relative;
}
#userCompany .userInfo {
  clear: both;
  width: 100%;
  height: 500px;
  float: left;
  margin-top: 5vh;
  margin-left: 3vw;
}
#userCompany .userInfo .el-tab-pane {
  margin-left: 2vw;
}
#userCompany .userInfo .el-tabs__content {
  position: static;
}
#userCompany .userInfo .boxTitle {
  width: 100%;
  font-size: 1.1rem;
  height: 5vh;
  line-height: 5vh;
  margin-bottom: 5vh;
}
/* 账号信息 */
#userCompany .user li {
  margin-bottom: 3vh;
}
#updatePassword {
  width: 30%;
}
#updatePassword .el-input {
  margin-bottom: 2vh;
}
/* 公司信息 */
/* 查看 */
#userCompany #companyReadBox,
#userCompany #companyUpdateBox {
  width: 85%;
  height: 500px;
}
#userCompany #companyReadBox .el-button:first-of-type {
  float: right;
  margin-right: 3vw;
}
#userCompany #companyReadBox .companyName {
  font-size: 1.4rem;
  height: 4vh;
  line-height: 4vh;
  margin-bottom: 60px;
  font-weight: 600;
  letter-spacing: 1px;
}
#userCompany #companyReadBox ul {
  width: 100%;
}
#userCompany #companyReadBox li:not(:last-child) {
  float: left;
}
#userCompany #companyReadBox li {
  font-size: 14px;
  height: 15px;
  line-height: 15px;
  vertical-align: middle;
  letter-spacing: 1px;
  color: #272736;
}
#userCompany #companyReadBox .row1,
#userCompany #companyReadBox .row2 {
  margin-bottom: 20px;
}
#userCompany #companyReadBox li:not(:last-child)::after {
  content: "";
  display: inline-block;
  height: 12px;
  width: 1px;
  background: #70707077;
  vertical-align: middle;
  margin: 0 20px;
}
#userCompany #companyReadBox i {
  display: inline-block;
  margin-right: 10px;
  color: #99bddf;
}
#userCompany #companyReadBox .introduction h6 {
  font-size: 1.2rem;
  padding-bottom: 10px;
  margin-top: 50px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
}
#userCompany #companyReadBox .introduction p {
  line-height: 1.5rem;
  letter-spacing: 1px;
}
/* 更新 */
#userCompany #companyUpdateBox .el-button {
  float: right;
  margin-left: 10px;
}
</style>