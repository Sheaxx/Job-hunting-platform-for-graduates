<template>
  <div id="editEmployment">
    <h5>编辑招聘信息</h5>
    <el-button
      type="primary"
      round
      @click="updateEmployment"
    >确定</el-button>
    <el-button round @click="cancelUpdate">取消</el-button>
    <el-form label-width="80px">
      <el-form-item
        label="职位"
        class="station"
      >
        <el-input v-model="editEmployment.station" />
      </el-form-item>
      <div class="row1">
        <el-form-item
          label="职位领域"
          class="zone"
        >
          <station-select
            :value="zoneValue"
            @setStationValue="setStationValue"
          ></station-select>
        </el-form-item>
        <el-form-item
          label="岗位类型"
          class="isFullTime"
        >
          <el-select v-model="editEmployment.isFullTime">
            <el-option
              label="实习"
              :value="0"
            ></el-option>
            <el-option
              label="全职"
              :value="1"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="工作地点"
          class="location"
        >
          <el-cascader
            size="large"
            :options="options"
            v-model="locationValue"
          ></el-cascader>
        </el-form-item>
      </div>
      <div class="row2">
        <el-form-item
          label="薪资"
          class="salary"
        >
          <el-input v-model="editEmployment.salaryStart" /><span>至</span>
          <el-input v-model="editEmployment.salaryEnd" />
        </el-form-item>
        <el-form-item
          label="学历要求"
          class="education"
        >
          <el-select v-model="editEmployment.education">
            <el-option value="大专"></el-option>
            <el-option value="本科"></el-option>
            <el-option value="硕士"></el-option>
            <el-option value="博士"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item
        label="职位介绍"
        class="introduction"
      >
        <el-input
          v-model="editEmployment.introduction"
          type="textarea"
          resize="none"
          :rows="8"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="职位要求"
        class="requirements"
      >
        <el-input
          v-model="editEmployment.requirements"
          type="textarea"
          resize="none"
          :rows="8"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qs from "qs";
import { provinceAndCityData } from "element-china-area-data";
import StationSelect from "../components/stationSelect.vue";

export default {
  components: { StationSelect },
  props: {
    editEmployment: Object,
  },
  data() {
    return {
      options: provinceAndCityData,
      locationValue: [], //地区选择
      zoneValue:[], //职位选择
      editForm:{},//备份编辑
    };
  },
  methods: {
    //设置职业领域值
    setStationValue(value) {
      this.zoneValue = value;
    },
    //编辑完成
    updateEmployment() {
      let obj = Object.assign({}, this.editEmployment);
      obj.zone = this.zoneValue.join(" / ");
      obj.location = this.locationValue.join(",")
      let that = this;
      this.$ajax
        .post("/employment/updateEmployment", qs.stringify(obj), {
          "content-type": "application/x-www-form-urlencoded",
        })
        .then(() => {
          that.$message.success("编辑成功");
          that.$emit("updateEmployment");
        });
    },
    //取消编辑
    cancelUpdate() {
      this.$emit("cancelUpdateEmployment");
    },
  },
  created() {
    this.locationValue = this.editEmployment.location;
    this.zoneValue = this.editEmployment.zone;
    if (this.zoneValue.length) this.zoneValue = this.zoneValue.split(" / ");
  }
};
</script>

<style>
#editEmployment {
  position: absolute;
  background: #fff;
  top: -5vh;
  left: -1vw;
  height: 76vh;
  width: 81vw;
  overflow: auto;
  padding: 3vh 3vw;
}
#editEmployment h5 {
  font-size: 1.2rem;
}
#editEmployment .el-button {
  float: right;
  margin-left: 20px;
  margin-bottom: 20px;
}
#editEmployment .el-form {
  clear: both;
  width: 90%;
  margin: 0 auto;
}
#editEmployment .station {
  width: 50%;
}
#editEmployment .row1,
#editEmployment .row2 {
  display: flex;
}
#editEmployment .row1 .el-form-item {
  width: 33%;
  flex: 0 1 auto;
}
#editEmployment .salary {
  float: left;
}
#editEmployment .salary .el-input {
  width: 40%;
}
#editEmployment .salary span {
  margin: 0 10px;
}
</style>