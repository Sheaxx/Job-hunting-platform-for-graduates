<template>
  <div id="calendar">
    <i
      class="el-icon-date index-icon"
      slot="icon"
    ></i>
    <h4
      class="index-boxTitle"
      slot="boxTitle"
    >日程表</h4>
    <el-calendar v-show="!isEdit">
      <template
        slot="dateCell"
        slot-scope="{ date, data }"
      >
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split("-").slice(2).join() }}
          <br>
          {{ data.day in jobFair ? jobFair[data.day].join("，") : "" }}
        <div
          class="content"
          v-show="data.isSelected"
        >
          <!-- <i class="el-icon-close close" @click="closeDetails()"/> -->
          <i
            class="el-icon-edit edit"
            @click="openEditJobFair(data.day)"
          ></i>
          <ul>
            <li
              v-for="(item,index) in dayMap"
              :key="index"
            >
              <i class="el-icon-s-flag" />
              <span>{{item.name}}</span>
              <i class="el-icon-location" />
              <span>{{item.location}}</span>
              <i class="el-icon-time" />
              <span>{{item.time}}</span>
            </li>
          </ul>
        </div>
        </p>
      </template>
    </el-calendar>
    <el-button
      type="primary"
      round
      icon="el-icon-plus"
      class="add"
      @click="openAddJobFair"
      v-if="!isEdit"
    >添加信息</el-button>
    <div
      id="addJobFair"
      v-if="isAdd"
    >
      <div class="addBox">
        <el-form
          ref="editJobFair"
          :model="editContent"
          label-width="3rem"
        >
          <el-form-item label="名称">
            <el-input
              v-model="editContent.name"
              placeholder="请输入招聘会活动名称或宣讲会公司名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="editContent.time"
              type="datetime"
              placeholder="请选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="地点">
            <el-input
              v-model="editContent.location"
              placeholder="请输入招聘会或宣讲会地点"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="addJobFair"
            >确定</el-button>
            <el-button @click="cancelAddJobFair">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div
      id="editJobFair"
      v-if="isEdit"
    >
      <h5>{{editDay}}</h5>
      <el-button
        type="primary"
        round
        @click="editJobFair"
        class="affirm"
      >确认修改</el-button>
      <el-button
        round
        @click="cancelEditJobFair"
        class="cancel"
      >取消</el-button>
      <ul>
        <li
          v-for="(item,index) in editList"
          :key="index"
        >
          <el-form
            :model="item"
            label-width="3rem"
          >
            <el-form-item>
              <el-tag>{{index + 1}}</el-tag>
            </el-form-item>
            <el-form-item label="名称">
              <el-input
                v-model="item.name"
                placeholder="请输入招聘会活动名称或宣讲会公司名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="时间">
              <el-date-picker
                v-model="item.time"
                type="datetime"
                placeholder="请选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="地点">
              <el-input
                v-model="item.location"
                placeholder="请输入招聘会或宣讲会地点"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-link
                type="danger"
                @click="openDeleteJobFair(index)"
                class="delete"
                icon="el-icon-delete"
              >删除</el-link>
            </el-form-item>
          </el-form>
        </li>
      </ul>
      <div id="deleteJobFair" v-if="isDelete">
        <div class="deleteBox">
          <i class="el-icon-s-promotion"></i>
          <p>是否删除该项招聘会或宣讲会活动？</p>
          <el-button
            type="primary"
            plain
            @click="deleteJobFair"
            class="affirm"
          >确定</el-button>
          <el-button
            plain
            @click="cancelDeleteJobFair"
            class="cancel"
          >取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAdd: false, //是否打开添加窗口，默认为否
      isEdit: false, //是否打开修改窗口，默认为否
      isDelete: false, //是否打开删除窗口，默认为否
      dayMap: [], //{招聘会名字，地点，时间}
      jobFair: {}, //日期：[招聘会名字]
      editContent: {
        name: "",
        time: "",
        location: "",
      }, //添加招聘会
      editDay: "2022-02-09", //要修改内容的日期
      editList: [], //修改某天招聘会列表
    };
  },
  methods: {
    //关闭日历详情
    closeDetails(data) {
      let theClass = document.getElementsByClassName("is-selected")[0];
      theClass.classList.remove("is-selected");
    },
    //点击添加信息按钮
    openAddJobFair() {
      this.isAdd = true;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      document.documentElement.style.overflow = "hidden";
    },
    //确定添加
    addJobFair() {
      this.isAdd = false;
      document.documentElement.style.overflow = "auto";
    },
    //取消添加
    cancelAddJobFair() {
      this.isAdd = false;
      document.documentElement.style.overflow = "auto";
    },
    //点击修改日期内容
    openEditJobFair(day) {
      this.isEdit = true;
      this.editDay = day;
      this.editList = JSON.parse(JSON.stringify(this.dayMap));
      for (let item in this.editList) {
        this.editList[item].time = day + " " + this.editList[item].time;
      }
    },
    //确认修改
    editJobFair() {
      this.isEdit = false;
    },
    //取消修改
    cancelEditJobFair() {
      this.isEdit = false;
    },
    //点击删除
    openDeleteJobFair(index) {
      this.isDelete = true;
      document.documentElement.style.overflow='hidden';
    },
    //确认删除
    deleteJobFair() {
      this.isDelete = false;
      document.documentElement.style.overflow = "auto";
    },
    //取消删除
    cancelDeleteJobFair() {
      this.isDelete = false;
      document.documentElement.style.overflow = "auto";
    },
  },
  computed: {
    // getValues(da) {
    //   let array = [];
    //   console.log(data);
    //   console.log(this.dayMap[day]);
    //   this.dayMap[day].forEach(function (value, key) {
    //     array.push(key);
    //   });
    //   console.log(array);
    //   return array.join("，");
    // },
  },
  created() {
    this.dayMap[0] = { name: "hhh", location: "教六", time: "7:00" };
    this.dayMap[1] = { name: "ggg", location: "教六", time: "6:00" };
    this.jobFair["2022-02-09"] = ["hhh"];
  },
};
</script>

<style>
.el-calendar {
  margin: 0 auto;
  width: 80%;
}
/* 选中的详情 */
.is-selected .content {
  position: relative;
  z-index: 9;
  min-width: 260px;
  background: #fff;
  padding: 20px;
  margin-top: 5px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.3);
  cursor: default;
}
.is-selected .content li {
  color: rgba(0, 0, 0, 0.514);
  width: 96%;
  padding: 2%;
}
.is-selected .content i {
  margin: 3px 7px;
}
.is-selected .content .edit {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 0;
  color: #99bddf;
}
.is-selected .content .edit:hover {
  cursor: pointer;
}
/* 添加信息按钮 */
#calendar .add {
  position: absolute;
  top: 10%;
  right: 3%;
}
/* 添加窗口 */
#addJobFair {
  position: absolute;
  z-index: 9;
  width: 100vw;
  height: 100vh;
  top: -8.5vh;
  left: -7vw;
  background: rgba(0, 0, 0, 0.3);
}
#addJobFair .addBox {
  background: #fff;
  width: 60%;
  height: 28%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 4% 0;
}
#addJobFair .el-form-item {
  width: 85%;
  margin: 0 auto 2% auto;
}
#addJobFair .el-input:not(:nth-of-type(1)) {
  width: 90%;
}
#addJobFair .el-form-item:last-of-type .el-button {
  float: right;
  margin-left: 2%;
}
/* 修改窗口 */
#editJobFair h5 {
  clear: both;
  position: relative;
  top: 30px;
  font-weight: 600;
}
#editJobFair .affirm,
#editJobFair .cancel {
  position: relative;
  left: 73vw;
  top: -0.65vh;
}
#editJobFair .affirmEdit {
  left: 72vw;
}
#editJobFair ul {
  margin-top: 30px;
  height: 480px;
  overflow: auto;
}
#editJobFair .el-tag {
  border-color: #99bddf;
  color: #99bddf;
  background: #eef7fb;
}
#editJobFair .el-form {
  display: flex;
  width: 100%;
}
#editJobFair .el-form-item {
  flex: 0 1 auto;
}
#editJobFair .el-form-item:not(:first-of-type) {
  width: 28%;
  margin-left: 1%;
}
#editJobFair .el-form-item:last-of-type {
  margin-left: -6%;
}
#editJobFair .delete {
  margin-left: 60px;
}
/* 删除窗口 */
#deleteJobFair {
  position: absolute;
  z-index: 9;
  width: 100vw;
  height: 100vh;
  top: -8.8vh;
  left: -7vw;
  background: rgba(0, 0, 0, 0.3);
}
#deleteJobFair .deleteBox {
  background: #fff;
  width: 38%;
  height: 20%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#deleteJobFair i {
  margin: 7% 1% auto 15%;
  font-size: 1.5rem;
  float: left;
}
#deleteJobFair p {
  margin: 8% auto 4% 18%;
}
#deleteJobFair .el-button {
  position: absolute;
  top: 0;
  left: 0;
}
#deleteJobFair .affirm {
  position: absolute;
  top: 80px;
  left: 400px;
}
#deleteJobFair .cancel {
  position: absolute;
  top: 80px;
  left: 480px;
}
</style>