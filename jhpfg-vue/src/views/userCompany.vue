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
        v-if="!isEmploymentDetails && !isAddEmployment && !isPostDetails"
      >
        <el-tab-pane
          label="我的信息"
          class="user"
          name="1"
        >
          <div class="accountBox">
            <h5 class="boxTitle">账号信息</h5>
            <el-upload
              action="#"
              list-type="picture-card"
              :on-remove="handleRemoveAvatar"
              :on-change="handleChangeAvatar"
              :show-file-list="true"
              :auto-upload="false"
              :limit="1"
              :class="{ hide: notShowUploadAvatar }"
            >
              <img
                v-if="avatarUrl"
                :src="avatarUrl"
              />
              <i
                v-else
                class="el-icon-plus"
              ></i>
            </el-upload>
            <ul>
              <li>
                <span class="itemTitle">用户名：{{ userInfo.username }}</span>
              </li>
              <li>
                <span class="itemTitle">角色：{{ showRole(userInfo.role) }}</span>
              </li>
              <li>
                <el-button
                  round
                  v-if="!isUpdatePassword"
                  @click="openUpdatePassword"
                >修改密码</el-button>
                <el-button
                  round
                  v-if="isUpdatePassword"
                  @click="cancelUpdatePassword"
                >取消修改</el-button>
                <el-button
                  type="primary"
                  round
                  v-if="isUpdatePassword"
                  @click="updatePassword"
                >确认修改</el-button>
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
            </div>
          </div>
          <div class="personalBox">
            <div id="personalReadBox">
              <h5 class="boxTitle">个人信息</h5>
              <div
                class="personalReadBox"
                v-if="!isUpdatePersonal"
              >
                <el-button
                  type="primary"
                  round
                  @click="openUpdatePersonal"
                >更新信息</el-button>
                <div v-if="personalInfo.realname != ''">
                  <h6 class="name">{{personalInfo.realname}}</h6>
                  <p class="school"><i class="el-icon-s-home"></i>{{companyDetails.name}}</p>
                  <p class="position"><i class="el-icon-s-cooperation"></i>{{personalInfo.position}}</p>
                </div>
              </div>
              <el-empty
                description="暂未填写个人信息"
                v-if="personalInfo.realname == '' && !isUpdatePersonal"
              ></el-empty>
              <div
                class="personalUpdateBox"
                v-if="isUpdatePersonal"
              >
                <el-button
                  type="primary"
                  round
                  @click="updatePersonal"
                >确认更新</el-button>
                <el-button
                  round
                  @click="cancelUpdatePersonal"
                >取消更新</el-button>
                <el-form label-width="100px">
                  <el-form-item label="姓名">
                    <el-input
                      v-model="editPersonal.realname"
                      placeholder="请填写真实姓名"
                    />
                  </el-form-item>
                  <el-form-item label="公司">
                    <el-input
                      :disabled="!isEditPersonCompany"
                      v-model="personCompany"
                      placeholder="请注意：仅能填写一次。请填写公司全称"
                    />
                  </el-form-item>
                  <el-form-item label="职位">
                    <el-input
                      v-model="editPersonal.position"
                      placeholder="请填写担任职位"
                    />
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="我的公司"
          name="2"
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
            <div v-if="personalInfo.company != ''">
              <h6 class="companyName">{{companyDetails.name}}</h6>
              <img
                :src="companyDetails.logo"
                alt="公司logo"
              >
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
            <el-empty
              description="暂未填写公司信息"
              v-if="personalInfo.company == '' && !isUpdateCompany"
            ></el-empty>
          </div>
          <div
            id="companyUpdateBox"
            v-if="isUpdateCompany"
          >
            <el-form label-width="100px">
              <el-form-item label="LOGO">
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :on-remove="handleRemoveLogo"
                  :on-change="handleChangeLogo"
                  :show-file-list="true"
                  :auto-upload="false"
                  :limit="1"
                  :class="{ hide: notShowUploadLogo }"
                >
                  <img
                    v-if="logoUrl"
                    :src="logoUrl"
                  />
                  <i
                    v-else
                    class="el-icon-plus"
                  ></i>
                </el-upload>
              </el-form-item>
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
                  :rows="6"
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
          name="3"
          class="companyRecruitment"
        >
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="openAddEmployment"
          >发布招聘</el-button>
          <ul v-if="!isEmploymentDetails">
            <li
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
        </el-tab-pane>
        <el-tab-pane
          label="我的发布"
          name="4"
        >
          <ul class="list">
            <li
              v-for="(item) in postList"
              :key="item.id"
              @click="toPostDetails(item.id)"
            >
              <el-tag>{{showZone(item.zone)}}</el-tag>
              <h6>{{item.title}}</h6>
              <span>{{item.author}}</span>
              <span>{{item.createTime}}</span>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
    <employment-details
      v-if="isEmploymentDetails"
      :details="employmentDetails"
      :companyDetails="companyDetails"
      @toList="toEmploymentList"
      @collect=""
      @cancelCollect=""
      @sendResume=""
    ></employment-details>
    <edit-employment
      v-if="isAddEmployment"
      :editEmployment="editEmployment"
      @updateEmployment="updateEmployment"
      @cancelUpdateEmployment="cancelUpdateEmployment"
    ></edit-employment>
    <forum-details
      v-if="isPostDetails"
      :details="postDetails"
      :commentList="commentList"
      @toList="toPostList"
      @refresh="toPostDetails"
    ></forum-details>
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
import ForumDetails from "../components/forumDetails.vue";
import EditEmployment from "../components/editEmployment.vue";

export default {
  components: { TradeSelect, EmploymentDetails, ForumDetails, EditEmployment },
  data() {
    return {
      tabValue: "1", //选项卡的值，默认为第一个
      isUpdatePassword: false, //修改密码界面，默认为否
      isUpdatePersonal: false, //更新个人信息界面，默认为否
      isUpdateCompany: false, //更新公司信息页面，默认为否
      isAddEmployment: false, //发布招聘页面，默认为否
      isEmploymentDetails: false, //是否是招聘信息详情页，默认为否
      isPostDetails: false, //是否是帖子详情页，默认为否
      notShowUploadAvatar: false, //（用户头像）不显示上传图标，默认为否
      notShowUploadLogo: false, //（公司LOGO）不显示上传图标，默认为否
      avatarUrl: "", //编辑头像
      logoUrl: "", //编辑logo
      oldPassword: "", //旧密码
      newPassword: "", //新密码
      tradeValue: [], // 公司更新行业选择
      options: provinceAndCityData,
      locationValue: [], //地区选择
      userInfo: {}, //用户信息
      personalInfo: {}, //个人信息
      personCompany: "", //个人所属公司
      isEditPersonCompany: true, //是否可以编辑个人所属公司
      editPersonal: {
        realname: "",
        company: "",
        position: "",
      },
      companyDetails: {}, //公司详情
      employmentDetails: {}, //招聘信息详情
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
      editEmployment: {
        id: "",
        station: "",
        isFullTime: "",
        zone: [],
        location: [],
        salaryStart: "",
        salaryEnd: "",
        education: "",
        introduction: "",
        requirements: "",
        author: "",
        sentUsers: "",
        total: 0,
        progressList: "",
      }, //招聘信息编辑
      employmentList: [], //公司发布的招聘信息列表
      postList: [], //发布的帖子列表
      postDetails: {}, //某个帖子的详情
      commentList: [], //评论列表
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
    //实习或全职转文字显示
    showIsFullTime(val) {
      switch (val) {
        case 0:
          return "实习";
        case 1:
          return "全职";
      }
    },
    //身份显示
    showRole(role) {
      switch (role) {
        case 0:
          return "学生";
        case 1:
          return "企业";
        case 2:
          return "学校";
      }
    },
    //根据zone显示文字
    showZone(zone) {
      switch (zone) {
        case 1:
          return "我要提问";
        case 2:
          return "笔试经验";
        case 3:
          return "面试经验";
        case 4:
          return "工作分享";
        case 5:
          return "企业招聘";
      }
    },
    //地区码转中文
    showLocation(location) {
      return CodeToText[location[0]] + "" + CodeToText[location[1]];
    },
    //删除头像
    handleRemoveAvatar(file, fileList) {
      if (fileList.length < 1) {
        this.notShowUploadAvatar = false;
      }
      this.avatarUrl = "";
    },
    //头像上传按钮的动态显示
    handleChangeAvatar(file, fileList) {
      if (fileList.length >= 1) {
        this.notShowUploadAvatar = true;
      } else {
        this.notShowUploadAvatar = false;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      let that = this;
      reader.onload = function () {
        that.avatarUrl = reader.result;
        let obj = {
          avatar: that.avatarUrl,
        };
        that.$ajax
          .post(
            "/user/updateAvatar/" + window.localStorage.getItem("username"),
            qs.stringify(obj),
            {
              "content-type": "application/x-www-form-urlencoded",
            }
          )
          .then((res) => {
            that.userInfo.avatar = that.avatarUrl;
            window.localStorage.setItem("avatar", that.avatarUrl);
            that.$router.go(0);
          });
      };
    },
    //点击修改密码
    openUpdatePassword() {
      this.oldPassword = "";
      this.newPassword = "";
      this.isUpdatePassword = true;
    },
    //取消修改密码
    cancelUpdatePassword() {
      this.isUpdatePassword = false;
    },
    //确认修改密码
    updatePassword() {
      if (this.oldPassword == "" || this.newPassword == "") {
        this.$message.warning("新密码或旧密码不能为空");
      } else if (this.oldPassword == this.newPassword) {
        this.$message.warning("新密码和旧密码不能相同");
      } else {
        let that = this;
        let obj = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        };
        this.$ajax
          .post(
            "/user/updatePassword/" + window.localStorage.getItem("username"),
            qs.stringify(obj),
            {
              "content-type": "application/x-www-form-urlencoded",
            }
          )
          .then((res) => {
            if (res.data == "error") {
              that.$message.error("旧密码错误");
            } else {
              window.localStorage.setItem("password", that.newPassword);
              that.$message.success("修改密码成功");
              that.isUpdatePassword = false;
            }
          });
      }
    },
    //点击更新个人信息
    openUpdatePersonal() {
      Object.assign(this.editPersonal, this.personalInfo);
      this.isUpdatePersonal = true;
    },
    //取消更新个人信息
    cancelUpdatePersonal() {
      this.isUpdatePersonal = false;
    },
    //确认更新个人信息
    updatePersonal() {
      if (
        this.personCompany == "" ||
        this.editPersonal.realname == "" ||
        this.editPersonal.position == ""
      ) {
        this.$message.warning("2请填写完毕信息");
        return;
      }
      let that = this;
      let obj = Object.assign({}, this.editPersonal);
      this.$ajax
        .post("/user/updatePersonal", qs.stringify(obj), {
          "content-type": "application/x-www-form-urlencoded",
        })
        .then((res) => {
          if (!that.personalInfo.company) {
            that.$ajax
              .post(
                "/company/updateResumeByName",
                qs.stringify({
                  name: that.personCompany,
                  username: window.localStorage.getItem("username"),
                }),
                {
                  "content-type": "application/x-www-form-urlencoded",
                }
              )
              .then((res) => {
                that.isEditPersonCompany = false;
              });
          }
          that.$router.go(0);
          that.personalInfo = obj;
          that.isUpdatePersonal = false;
          that.$message.success("更新成功");
        });
    },
    //点击更新公司信息
    openUpdateCompany() {
      Object.assign(this.editCompany, this.companyDetails);
      this.tradeValue = [this.companyDetails.trade];
      this.logoUrl = this.companyDetails.logo;
      this.isUpdateCompany = true;
    },
    //公司行业值设置
    setTradeValue(value) {
      this.editCompany.trade = value;
    },
    //删除logo
    handleRemoveLogo(file, fileList) {
      if (fileList.length < 1) {
        this.notShowUploadLogo = false;
      }
      this.logoUrl = "";
    },
    //logo上传按钮的动态显示
    handleChangeLogo(file, fileList) {
      if (fileList.length >= 1) {
        this.notShowUploadLogo = true;
      } else {
        this.notShowUploadLogo = false;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      let that = this;
      reader.onload = function () {
        that.logoUrl = reader.result;
      };
    },
    //确认修改公司信息
    updateCompany() {
      let obj = Object.assign({}, this.editCompany);
      obj.location = this.locationValue.join(",");
      obj.logo = this.logoUrl;
      let that = this;
      this.$ajax
        .post("/company/updateCompany", qs.stringify(obj), {
          "content-type": "application/x-www-form-urlencoded",
        })
        .then((res) => {
          Object.assign(that.companyDetails, that.editCompany);
          that.companyDetails.logo = that.logoUrl;
          that.isUpdateCompany = false;
          that.$message.success("更新成功");
          that.tabValue = "2";
        });
    },
    //取消修改公司信息
    cancelUpdateCompany() {
      this.isUpdateCompany = false;
      this.tabValue = "2";
    },
    //查看招聘信息详情
    toEmploymentDetails(id) {
      let that = this;
      this.$ajax.get("/employment/getEmploymentById/" + id).then((res) => {
        that.employmentDetails = res.data;
        that.employmentDetails.location =
          that.employmentDetails.location.split(",");
        that.isEmploymentDetails = true;
      });
      this.tabValue = "3";
    },
    //招聘信息详情返回列表
    toEmploymentList() {
      this.isEmploymentDetails = false;
    },
    //打开编辑招聘信息页面
    openAddEmployment() {
      this.isAddEmployment = true;
      for (let item in this.editEmployment) {
        this.editEmployment[item] = "";
      }
      this.editEmployment.zone = [];
      this.editEmployment.location = [];
      this.editEmployment.author = window.localStorage.getItem("username");
      this.editEmployment.companyId = this.companyDetails.id;
    },
    //确定更新招聘信息
    updateEmployment() {
      this.isAddEmployment = false;
      this.tabValue = "3";
    },
    //取消编辑招聘信息
    cancelUpdateEmployment() {
      this.isAddEmployment = false;
      this.tabValue = "3";
    },
    //查看我发布的帖子详情
    toPostDetails(id) {
      this.isPostDetails = true;
      this.tabValue = "4";
      let that = this;
      this.$ajax.get("/forum/getPostById/" + id).then((res) => {
        that.postDetails = res.data.post;
        that.commentList = res.data.commentList;
      });
    },
    //帖子详情返回列表
    toPostList() {
      this.isPostDetails = false;
    },
  },
  created() {
    let that = this;
    this.$ajax
      .get("/user/getPersonal/" + window.localStorage.getItem("username"))
      .then((res) => {
        that.personalInfo = res.data;
        if (res.data.company) {
          that.$ajax
            .get("/company/getCompanyById/" + res.data.company)
            .then((res) => {
              that.isEditPersonCompany = false;
              that.personCompany = res.data.name;
              that.companyDetails = res.data;
              that.companyDetails.location = that.locationValue =
                that.companyDetails.location.split(",");
            });
          that.$ajax
            .get("/company/getAllEmployment/" + res.data.company)
            .then((res) => {
              that.employmentList = res.data;
              for (let item in that.employmentList) {
                that.employmentList[item].location =
                  that.employmentList[item].location.split(",");
              }
            });
        }
      });
    this.$ajax
      .get("/user/getUser/" + window.localStorage.getItem("username"))
      .then((res) => {
        that.userInfo = res.data;
        that.avatarUrl = that.userInfo.avatar;
      });
    this.$ajax
      .get(
        "/forum/getPostByUsername/" + window.localStorage.getItem("username")
      )
      .then((res) => {
        that.postList = res.data;
      });
    let editCompany = window.sessionStorage.getItem("editCompany");
    if (editCompany) {
      this.tabValue = "2";
      window.sessionStorage.removeItem("editCompany");
    }
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
#userCompany .user {
  display: flex;
  width: 90%;
  height: 500px;
  align-items: center;
}
#userCompany .accountBox,
#userCompany .personalBox {
  height: 98%;
  flex: 1;
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
/* 头像 */
#userCompany .el-upload {
  margin-bottom: 24px;
}
#userCompany .el-upload img {
  width: 146px;
  height: 146px;
}
#userCompany .hide .el-upload--picture-card {
  display: none;
}
/* 个人信息 */
/* 查看界面 */
#userCompany .personalBox {
  border-left: #8e90944d 1px solid;
  padding-left: 50px;
}
#userCompany .personalBox .el-button {
  float: right;
  margin-left: 10px;
}
#userCompany .personalBox .name {
  font-size: 1.4rem;
  height: 4vh;
  line-height: 4vh;
  margin-bottom: 40px;
  font-weight: 600;
  letter-spacing: 1px;
}
#userCompany .personalBox p {
  margin-bottom: 15px;
  letter-spacing: 1px;
}
#userCompany .personalBox i {
  margin-right: 10px;
}
#userCompany .personalBox .el-empty {
  position: relative;
  top: 30px;
}
/* 修改界面 */
#userCompany .personalUpdateBox .el-form {
  clear: both;
  position: relative;
  top: 20px;
  width: 90%;
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
#userCompany #companyReadBox img {
  height: 146px;
  width: 146px;
  float: left;
  margin-right: 50px;
}
#userCompany #companyReadBox ul {
  width: 100%;
  position: relative;
  top: 40px;
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
  margin-top: 130px;
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
#userCompany #companyUpdateBox {
  height: 500px;
  overflow: auto;
  padding-right: 5%;
}
/* 公司发布招聘 */
#userCompany .companyRecruitment {
  width: 87%;
  padding: 1%;
  height: 500px;
  overflow: auto;
}
#userCompany .companyRecruitment .isFullTime {
  float: left;
  margin-right: 20px;
}
#userCompany .companyRecruitment ul {
  position: relative;
  top: 10px;
  padding-top: 10px;
  height: 420px;
  overflow-y: auto;
}
#userCompany .companyRecruitment li {
  width: 92%;
  height: 10%;
  padding: 1.8%;
  margin: 1% auto;
  border: #8e909421 1px solid;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.05);
}
#userCompany .companyRecruitment .salary {
  float: right;
  color: #72b3f0;
  font-size: 1.2rem;
  width: 50%;
  text-align: right;
}
#userCompany .companyRecruitment .jobMsg,
#userCompany .companyRecruitment .companyMsg {
  color: #8e9094;
  margin-top: 1%;
  font-size: 0.8rem;
}
#userCompany .companyRecruitment li:hover {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
}
#userCompany .companyRecruitment li:hover .station {
  color: #72b3f0;
}
#userCompany .companyRecruitment span {
  margin-right: 0.5%;
}
/* 我的发布 */
#userCompany .list {
  width: 90%;
  padding: 1%;
  height: 500px;
  overflow: auto;
}
#userCompany .list li {
  width: 96%;
  padding: 2%;
}
#userCompany .list li:not(:last-of-type) {
  border-bottom: #8e90943d 1px solid;
}
#userCompany .list li:last-of-type {
  margin-bottom: 20px;
}
#userCompany .list h6 {
  margin-bottom: 0.5%;
}
#userCompany .list .el-tag {
  float: right;
}
#userCompany .list span:not(.el-tag) {
  font-size: 0.8rem;
  color: #8e9094;
  margin-right: 1%;
}
#userCompany .list li:hover {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  z-index: 999;
}
</style>