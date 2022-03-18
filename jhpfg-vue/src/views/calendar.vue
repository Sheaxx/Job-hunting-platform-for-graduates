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
        <p
          :class="data.isSelected ? 'is-selected' : ''"
          @click="changeDay(data.day)"
        >
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
            v-if="isAuthor"
          ></i>
          <div
            v-for="(item,index) in dayMap"
            :key="index"
            style="display:none"
          ></div>
          <ul>
            <li
              v-for="(item,index) in contentList"
              :key="index"
            >
              <i class="el-icon-s-flag" />
              <span>{{item.name}}</span>
              <i class="el-icon-location" />
              <span>{{item.location}}</span>
              <i class="el-icon-time" />
              <span>{{item.clock}}</span>
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
      v-if="!isEdit && isAuthor"
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
              value-format="yyyy-MM-dd HH:mm:ss"
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
          :key="item.id"
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
                value-format="yyyy-MM-dd HH:mm:ss"
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
                @click="openDeleteJobFair(item.id, index)"
                class="delete"
                icon="el-icon-delete"
              >删除</el-link>
            </el-form-item>
          </el-form>
        </li>
      </ul>
      <div
        id="deleteJobFair"
        v-if="isDelete"
      >
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
import qs from "qs";

export default {
  data() {
    return {
      isAdd: false, //是否打开添加窗口，默认为否
      isEdit: false, //是否打开修改窗口，默认为否
      isDelete: false, //是否打开删除窗口，默认为否
      isAuthor:false,//是否有更新的权力
      dayMap: [], //{招聘会名字，地点，时间}
      jobFair: {}, //日期：[招聘会名字]
      contentList: [], //当天的{招聘会名字，地点，时间}
      editContent: {
        name: "",
        time: "",
        location: "",
      }, //添加招聘会
      editDay: "", //要修改内容的日期
      editList: [], //修改某天招聘会列表
      currentId: "", //当前要删除的id
      currentIndex: "", //当前要删除的索引
      school:"",//用户所在学校
    };
  },
  methods: {
    changeDay(day) {
      this.contentList = [];
      for (let item in this.dayMap) {
        if (String(this.dayMap[item].time).search(day) != -1) {
          this.contentList.push(this.dayMap[item]);
        }
      }
    },
    //关闭日历详情
    closeDetails(data) {
      let theClass = document.getElementsByClassName("is-selected")[0];
      theClass.classList.remove("is-selected");
    },
    //点击添加信息按钮
    openAddJobFair() {
      for (let item in this.editContent) {
        this.editContent[item] = "";
      }
      this.isAdd = true;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      document.documentElement.style.overflow = "hidden";
    },
    //确定添加
    addJobFair() {
      let that = this;
      let obj = Object.assign({}, this.editContent);
      this.$ajax
        .post("/calendar/add", qs.stringify(obj), {
          "content-type": "application/x-www-form-urlencoded",
        })
        .then((res) => {
          that.dayMap.splice(that.dayMap.length, 1, obj);
          console.log(obj);
          let date = obj.time.split(" ");
          if (String(date[0]) in that.jobFair) {
            that.jobFair[date[0]].push(obj.name);
          } else {
            that.jobFair[date[0]] = [obj.name];
          }
          that.isAdd = false;
          that.$message.success("添加成功");
          document.documentElement.style.overflow = "auto";
        });
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
      this.editList = JSON.parse(JSON.stringify(this.contentList));
    },
    //确认修改
    editJobFair() {
      let that = this;
      new Promise((resolve, reject) => {
        for (let item in this.editList) {
          let obj = Object.assign({}, this.editList[item]);
          delete obj.clock;
          this.$ajax.post("/calendar/update", qs.stringify(obj), {
            "content-type": "application/x-www-form-urlencoded",
          });
        }
        resolve();
      }).then(() => {
        that.isEdit = false;
        that.$message.success("更新成功");
      });
    },
    //取消修改
    cancelEditJobFair() {
      this.isEdit = false;
      let that = this;
      this.$ajax.get("/calendar/getAll").then((res) => {
        that.dayMap = res.data;
        that.jobFair = {};
        for (let item in that.dayMap) {
          let date = that.dayMap[item].time.split(" ");
          //抽取时间
          that.dayMap[item].clock = date[1];
          //整理每一天有的宣讲会
          if (String(date[0]) in that.jobFair) {
            that.jobFair[date[0]].push(that.dayMap[item].name);
          } else {
            that.jobFair[date[0]] = [that.dayMap[item].name];
          }
        }
      });
    },
    //点击删除
    openDeleteJobFair(id, index) {
      this.isDelete = true;
      document.documentElement.style.overflow = "hidden";
      this.currentId = id;
      this.currentIndex = index;
    },
    //确认删除
    deleteJobFair() {
      let that = this;
      this.$ajax.post("/calendar/delete/" + this.currentId).then((res) => {
        that.editList.splice(that.currentIndex, 1);
        that.$message.success("删除成功");
        that.isDelete = false;
        document.documentElement.style.overflow = "auto";
      });
    },
    //取消删除
    cancelDeleteJobFair() {
      this.isDelete = false;
      document.documentElement.style.overflow = "auto";
    },
  },
  created() {
    let that = this;
    this.$ajax.get("/calendar/getAll").then((res) => {
      that.dayMap = res.data;
      for (let item in that.dayMap) {
        let date = that.dayMap[item].time.split(" ");
        //抽取时间
        that.dayMap[item].clock = date[1];
        //整理每一天有的宣讲会
        if (!(String(date[0]) in that.jobFair)) {
          that.jobFair[date[0]] = [];
        }
        that.jobFair[date[0]].splice(
          that.jobFair[date[0]].length,
          1,
          that.dayMap[item].name
        );
      }
    });
    this.$ajax.get("/user/getResume/" + window.localStorage.getItem("username")).then(res => {
      that.school = res.data.school;
      if (window.localStorage.getItem("role") == 3 ) {
        that.isAuthor = true;
      }
    })
  },
};
</script>

<style>
.el-calendar {
  margin: 0 auto;
  width: 80%;
}
.el-calendar p {
  width: 100%;
  height: 100%;
}
/* 选中的详情 */
.is-selected .content {
  position: relative;
  z-index: 9;
  width: 460px;
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