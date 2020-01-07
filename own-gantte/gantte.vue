<template>
  <div class="gantteComponent" style="position:relative;">
    <el-table
      class="gantte_table drag"
      ref="gantte_table"
      max-height="550"
      :data="gTable"
      border
      tooltip-effect="dark"
      :span-method="objectSpanMethod"
      header-cell-class-name="tableHeaderCellClass"
      cell-class-name="tableCellClass"
      :cell-style="table_cell_style"
      :style="{
        width: table_width,
        left: '0',
        position: 'absolute',
      }"
    >
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="subprojectName"
        label="子项目名称"
        title="子项目名称"
        width="100"
      >
        <template slot-scope="scope">
          <span
            style="cursor: pointer; color:#1393DC;"
            @click="editCname(scope.row.subprojectId,scope.row.subprojectName)"
            class="underline"
          >{{scope.row.subprojectName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="assignmentName"
        label="任务名称"
        width="100"
      >
        <template slot-scope="scope">
          <span
            style="color:black; cursor: pointer;"
            @click="editTask(scope.row)"
            class="underline"
          >{{scope.row.assignmentName}}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="userName" label="责任人" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.userName!==''">{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="status" label="任务状态" width="100">
        <template slot-scope="scope">
          <span
            v-for="(item,index) in taskstatus"
            :key="index"
          >{{item.id===scope.row.status?item.label:""}}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="planStartTime"
        label="计划开始时间"
        width="100"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.planStartTime"
          >{{$format(new Date(scope.row.planStartTime).getTime()).dates}}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="planEndTime"
        label="计划结束时间"
        width="100"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.planEndTime"
          >{{$format(new Date(scope.row.planEndTime).getTime()).dates}}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="actualStartTime"
        label="实际开始时间"
        width="100"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.actualStartTime"
          >{{$format(new Date(scope.row.actualStartTime).getTime()).dates}}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="actualEndTime"
        label="实际结束时间"
        width="100"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.actualEndTime"
          >{{$format(new Date(scope.row.actualEndTime).getTime()).dates}}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑子项目" :visible.sync="dialogVisible" width="30%">
      <el-form size="mini" ref="form" :rules="rule" :model="form" label-width="100px">
        <el-form-item label="子项目名称" prop="cprojectName">
          <el-input v-model="form.cprojectName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="subChildProjectName('form')">确 定</el-button>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <div
      id="draggable"
      class="drag_border"
      draggable="true"
      @dragstart="dragEvent"
      :style="{
        width:'5px',
        maxHeight:'550px',
        height:'100%',
        position:'absolute',
        display:'block',
        background: '#2C8CF0',
        cursor: 'e-resize',
        left: table_width,
      }"
    ></div>

    <el-table
      class="gantte drag"
      ref="gantte"
      :data="gTable"
      border
      max-height="550"
      header-cell-class-name="tableHeaderCellClass"
      cell-class-name="tableCellClass"
      :style="{
        left: 'calc(' + table_width + ' + 5px)',
        width: 'calc(100% - ' + table_width + ')',
      }"
    >
      <el-table-column :width="header_width">
        <template slot="header" slot-scope="scope">
          <div class="ganteview-toptime">
            <div
              class="ganteview-headercell"
              v-for="(item,key) in top_time_data"
              :title="item.date"
              :key="key"
              :style="{
                width:item.width+'px',
                left:item.left+'px',
              }"
            >{{item.date}}</div>
          </div>

          <div class="ganteview-bottomtime">
            <div
              class="ganteview-headercell"
              :title="item.title"
              v-for="(item) in bottom_time_data"
              :key="item.title"
              :style="{width:item.width+'px',left:item.left+'px'}"
            >
              <p class="header_cells" :style="{background: item.is_rest?'pink':null}">{{item.date}}</p>
            </div>
          </div>
        </template>
        <template slot-scope="scope">
          <!-- 负责人 -->
          <span
            class="charge"
            :style="{
              left:scope.row.left+'px',
            }"
          >{{scope.row.userName}}</span>

          <el-tooltip placement="top">
            <div slot="content">
              <p>计划开始时间：{{$format(new Date(scope.row.planStartTime).getTime()).dates}}</p>
              <p>计划结束时间：{{$format(new Date(scope.row.planEndTime).getTime()).dates}}</p>
            </div>
            <div
              class="progress"
              :style="{
                width:scope.row.width+'px',
                height: '10px',
                left:scope.row.left+'px',
                top: '20px',
                zIndex: 10,
                position: 'absolute',
                background: '#C9C9CB',
                borderRadius: '5px'
              }"
            ></div>
          </el-tooltip>

          <el-tooltip placement="top" :hide-after="10000">
            <div slot="content">
              <p>实际开始时间：{{$format(new Date(scope.row.actualStartTime).getTime()).dates}}</p>
              <p>实际结束时间：{{$format(new Date(scope.row.actualEndTime).getTime()).dates}}</p>
            </div>
            <div
              class="progress"
              :style="{
                width:scope.row.width1+'px',
                height: '10px',
                left:scope.row.left1+'px',
                bottom: '5px',
                zIndex: 10,
                position: 'absolute',
                background: '#34B5FF',
                borderRadius: '5px'
              }"
            ></div>
          </el-tooltip>

          <!-- 边框线 -->
          <div
            v-for="(item) in bottom_time_data"
            :key="item.title"
            :style="{
              width:item.width+'px',
              left:item.left+'px',
              top: 0,
              zIndex: 1,
              borderRight: '1px solid #eee',
              height: '50px',
              position: 'absolute'
            }"
          ></div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/* eslint-disable */
import { Message } from "element-ui";
// 引入接口
import { renewalSubproject } from "../axios/api.js";
export default {
  name: "gantte",
  components: {},
  watch: {
    gantte_data(newValue, oldValue) {
      this.getList(newValue);
    }
  },
  props: {
    gantte_data: Object
  },
  mounted() {
    this.$nextTick(function() {
      let self = this;
      this.drag = document.querySelectorAll(".drag_border")[0];
      this.table = document.querySelectorAll(
        ".gantte_table .el-table__body-wrapper"
      )[0];
      this.table.style.cssText = "overflow: scroll hidden !important";
      this.gantte = document.querySelectorAll(
        ".gantte .el-table__body-wrapper"
      )[0];
      this.gantte.style.cssText = "overflow: scroll auto !important";
      this.gantte.addEventListener("scroll", function(e) {
        self.table.scrollTop = e.target.scrollTop;
      });
    });
  },
  computed: {},
  methods: {
    getList(obj) {
      if (obj.status === 1) {
        this.gTable = obj.msg.items.map(item => {
          return {
            ...item,
            minTime: obj.msg.startTime,
            maxTime: obj.msg.endTime
          };
        });
        let time = (24 * 60 * 60 * 1000) / this.one_px;
        if (obj.msg.startTime && obj.msg.endTime) {
          this.header_width = 0;
          this.get_top_time(obj.msg.startTime, obj.msg.endTime, time);
        } else {
          this.header_width = "calc(100% - " + this.table_width + ")";
          this.top_time_data = [];
          this.bottom_time_data = [];
        }
        this.spanArr = [];
        this.getSpanArr(this.gTable);
      }
    },
    editCname(id, na) {
      if (this.$route.meta.button.buttons.includes("编辑子项目")) {
        this.dialogVisible = true;
        this.subprojectId = id;
        this.form.cprojectName = na;
      }
    },
    subChildProjectName(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await renewalSubproject({
            id: this.subprojectId,
            subprojectName: this.form.cprojectName
          });
          if (res.status === 1) {
            this.$message({
              type: "success",
              message: "编辑成功"
            });
            this.dialogVisible = false;
            this.$router.go(0);
            // this.$emit('childByValue', 8)
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    isLeapYear(year) {
      return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
    },
    getMonthDays(year, month) {
      return (
        [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] ||
        (this.isLeapYear(year) ? 29 : 28)
      );
    },
    format(time, mode) {
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var day = time.getDate();
      
      if (mode == 1) {
        return (
          year +
          "-" +
          (month < 10 ? "0" + month : month) +
          "-" +
          (day < 10 ? "0" + day : day)
        );
      } else if (mode == 2) {
        return year + "-" + (month < 10 ? "0" + month : month);
      } else if (mode == 3) {
        return day < 10 ? "0" + day : day;
      } else if (mode == 4) {
        return month < 10 ? "0" + month : month;
      } else if (mode == 5) {
        return year;
      }
    },
    get_top_time(min, max, time) {
      min = new Date(min);
      let arr = [];
      let end_time = new Date(max).getTime();
      this.minTime = min.getFullYear() + "-" + (min.getMonth() + 1) + "-" + 1;
      min = new Date(min.getFullYear() + "-" + (min.getMonth() + 1) + "-" + 1);
      for (let i = 0; i <= end_time; ) {
        let old_time = min,
          date = this.format(old_time, 2);
        min = new Date(min.getFullYear(), min.getMonth() + 1, 1);
        let width = (min.getTime() - old_time.getTime()) / time;
        this.header_width += width;
        arr.push({
          left: (old_time.getTime() - new Date(this.minTime).getTime()) / time,
          width: width,
          date: date
        });
        i = min.getTime();
        this.maxEnd = i;
      }
      this.top_time_data = arr;
      if (this.maxEnd) {
        end_time = this.maxEnd;
      }
      this.get_bottom_time(this.minTime, end_time, time);
    },
    get_bottom_time(min, max, time) {
      min = new Date(min);
      let arr = [];
      for (let i = 0; i <= max; ) {
        let old_time = min,
          date = this.format(old_time, 3),
          title = this.format(old_time, 1),
          is_rest = false;
        min = new Date(min.getFullYear(), min.getMonth(), min.getDate() + 1);
        if (old_time.getDay() == 0 || old_time.getDay() == 6) {
          is_rest = true;
        }
        let width = (min.getTime() - old_time.getTime()) / time;
        i = min.getTime();
        if (i <= max) {
          arr.push({
            left:
              (old_time.getTime() - new Date(this.minTime).getTime()) / time,
            width: width,
            date: date,
            title: title,
            is_rest: is_rest
          });
        }
      }
      this.bottom_time_data = arr;
      this.format_gante_data(this.gTable, this.minTime, time);
    },
    format_gante_data(gante_data, minTime, time) {
      for (let i of gante_data) {
        if (i.planStartTime || i.planEndTime) {
          i["left"] = (new Date(i.planStartTime) - new Date(minTime)) / time;
          if (
            i.planEndTime &&
            new Date(i.planEndTime).getTime() >=
              new Date(i.planStartTime).getTime() &&
            i.planStartTime
          ) {
            // var _endtime = this.format(new Date(i.planEndTime), 1, 2);
            // var _starttime = this.format(new Date(i.planStartTime), 1);

            // i["width"] = (new Date(_endtime) - new Date(_starttime)) / time;
            i["width"] = (new Date(i.planEndTime).getTime() + 24*60*60*1000 - new Date(i.planStartTime).getTime()) / time;

          } else {
            i["width"] = 0;
          }
        }
        if (i.actualStartTime || i.actualEndTime) {
          i["left1"] = (new Date(i.actualStartTime) - new Date(minTime)) / time;
          if (
            i.actualStartTime &&
            new Date(i.actualEndTime).getTime() >=
              new Date(i.actualStartTime).getTime() &&
            i.actualStartTime
          ) {
            // var _endtime = this.format(new Date(i.actualEndTime), 1, 2);
            // var _starttime = this.format(new Date(i.actualStartTime), 1);

            // i["width1"] = (new Date(_endtime) - new Date(_starttime)) / time;
            i["width1"] = (new Date(i.actualEndTime).getTime() + 24*60*60*1000 - new Date(i.actualStartTime).getTime()) / time;

          } else {
            i["width1"] = 0;
          }
        }
      }
    },
    dragEvent() {
      let self = this;
      let gantteDOM = document.getElementsByClassName("gantteComponent")[0];
      var dragged;
      gantteDOM.addEventListener("drag", function(event) {}, false);

      gantteDOM.addEventListener(
        "dragstart",
        function(event) {
          dragged = event.target;
          event.target.style.opacity = 0.5;
        },
        false
      );

      gantteDOM.addEventListener(
        "dragend",
        function(event) {
          event.target.style.opacity = "";
        },
        false
      );
      gantteDOM.addEventListener(
        "dragover",
        function(event) {
          event.preventDefault();
        },
        false
      );

      gantteDOM.addEventListener(
        "drop",
        function(event) {
          event.preventDefault();
          let obj = gantteDOM;
          let l = obj.offsetLeft;
          while ((obj = obj.offsetParent)) {
            l += obj.offsetLeft;
          }
          self.table_width = event.clientX - l - 20 + "px";
        },
        false
      );
    },
    table_cell_style({ row, column, rowIndex, columnIndex }) {
      if (columnIndex !== 0) {
        if (row.flag) {
          return {
            color: "#fff",
            background: "#a21d1d"
          };
        }
      }
    },
    getSpanArr(data) {
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          if (data[i].subprojectName === data[i - 1].subprojectName) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },

    upadteData(val) {
      this.getGatten_list(val);
    },
    editTask(row) {
      if (this.$route.meta.button.buttons.includes("编辑任务")) {
        this.$emit("fun", { id: 2, msg: row });
      }
    }
  },

  data() {
    return {
      // 项目名称
      form: {
        // 新增子项目名称
        cprojectName: ""
      },
      // 最终表格以及进度条数据
      gTable: [],

      // 时间轴的长度
      header_width: 0,

      // 每个格子占的像素
      one_px: 20,

      // 最小时间和最大时间
      minTime: 0,
      maxTime: 0,

      // 所有头部,底部时间刻度集合
      top_time_data: [],
      bottom_time_data: [],

      // 所有元素的定位标识,必须是带px的字符，或者带calc的计算值
      table_width: "calc(50% - 5px)",

      // 所有需要的DOM元素
      gantte: "",
      gantte_width: "",
      table: "",
      drag: "",

      spanArr: [],
      // 任务状态值
      taskstatus: [
        { label: "待启动", id: 1 },
        { label: "暂停", id: 2 },
        { label: "进行中", id: 3 },
        { label: "已完成", id: 4 },
        { label: "已关闭", id: 5 }
      ],
      // 存值
      vuexData: {},
      // 新增弹窗验证规则
      rule: {
        cprojectName: [
          {
            required: true,
            message: "请填写子项目名称",
            trigger: "blur"
          }
        ]
      },
      // 弹窗判断值
      dialogVisible: false,
      // 项目id
      subprojectId: ""
    };
  }
};
</script>
<style lang="scss">
.ganteview-toptime {
  height: 24px !important;
  position: relative;
  background: #fdf8f4 !important;
  border-bottom: 1px solid #ddd;
}
.ganteview-bottomtime {
  height: 25px;
  position: relative;
}
.ganteview-toptime .ganteview-headercell {
  /* text-align: center; */
  padding-left: 5px;
  font-weight: bold;
  line-height: 24px !important;
  border-right: 1px solid #ddd;
}
.ganteview-bottomtime .ganteview-headercell {
  // position: relative;
  text-align: center;
  line-height: 25px !important;
  .header_cells {
    position: relative;
    padding: 0;
    margin: 0;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 200px;
      border-right: 1px solid #ddd;
    }
  }
}
.ganteview-bottomtime {
  background-color: #fff;
}
.gantte {
  div,
  th,
  .cell {
    padding: 0 !important;
    line-height: unset !important;
  }
  th {
    div {
      overflow: unset !important;
    }
  }
  // 负责人
  .charge {
    display: block;
    z-index: 11;
    padding: 0 10px;
    color: #fff;
    background: green;
    position: absolute;
    top: 5px;
    line-height: 15px;
    border-radius: 5px;
    font-size: 10px;
  }
}
.tableCellClass {
  padding: 0 !important;
  height: 50px;
}
.tableHeaderCellClass {
  padding: 0 !important;
  height: 50px;
}

.gantte_table {
  th {
    .cell {
      white-space: nowrap !important;
    }
  }
}
</style>