<template>
  <div class="manday">
    <el-card>
      <div slot="header" class="card-header">
        <span>工时</span>
        <el-button type="primary" icon="plus" size="mini" style="float:right;" @click="openMandayForm()"></el-button>
        <el-switch v-model="show" on-text="我" off-text="全部" off-color="#13ce66" on-value="me" off-value="all" style="float: right; margin-right: 10px;"></el-switch>
      </div>
      <el-table :data="mandays" :border="true">
        <el-table-column type="expand">
          <template scope="props">
            <el-form>
              <el-form-item label="描述：" label-width="60px">
                <span v-html="props.row.description.replace(/\n/g, '<br />')"></span>
              </el-form-item>
              <el-form-item style="text-align:right" v-if="props.row.userName == currentUser">
                <el-button-group>
                  <el-button size="small" icon="delete" @click="deleteManday(props.$index, props.row)"></el-button>
                  <el-button size="small" icon="edit" @click="openMandayForm(props.row)"></el-button>
                </el-button-group>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" width="140px" :formatter="dateFormatter">
          <template scope="scope">
            <span>{{ dateFormatter(null, null, scope.row.date) }}</span>
            <el-tag type="primary" v-if="isToday(scope.row.date)">今</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="user.realName" label="成员" width="120px">
        </el-table-column>
        <el-table-column prop="project.projectName" label="项目">
        </el-table-column>
        <el-table-column prop="hours" label="工时" width="70px">
        </el-table-column>
      </el-table>
    </el-card>
  
    <el-dialog :title="{add: '新增工时', modify: '编辑工时'}[mandayForm.action]" :visible.sync="dialogFormVisible" size="tiny">
      <el-form :model="mandayForm" :rules="rules" ref="mandayForm">
        <el-form-item label="日期" prop="date" label-width="50px">
          <el-date-picker v-model="mandayForm.date" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目" required label-width="50px">
          <el-col :span="11">
            <el-form-item prop="projectKey">
              <el-select v-model="mandayForm.projectKey" placeholder="请选择">
                <el-option v-for="item in projects" :key="item.projectKey" :label="item.projectName" :value="item.projectKey">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="7">
            <el-form-item prop="hours">
              <el-input v-model.number="mandayForm.hours" max="24" min="1" type="number">
                <template slot="append">H</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="描述" prop="description" label-width="50px">
          <el-input v-model="mandayForm.description" type="textarea" style="width: 300px;" :autosize="{ minRows: 4, maxRows: 10 }">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveManday()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'manday',
  data() {
    return {
      currentUser: '',
      show: 'me',
      mandays: [],
      dialogFormVisible: false,
      mandayForm: {
        action: 'add',
        _id: '',
        date: new Date(),
        projectKey: '',
        hours: 8,
        description: ''
      },
      rules: {
        date: [
          { type: 'date', required: true, message: '日期不能为空', trigger: 'blur' }
        ],
        projectKey: [
          { required: true, message: '项目必选', trigger: 'blur' }
        ],
        hours: [
          { type: 'number', required: true, message: '工时不能为空', trigger: 'blur' }
        ]
      },
      projects: [],
      dateFormatter: function (row, column, cellValue) {
        return moment(cellValue).format('YYYY-MM-DD');
      },
      today: new Date()
    }
  },
  watch: {
    show: function () {
      this.getMandays();
    }
  },
  mounted() {
    this.getMandays();
    this.getProjects();

    this.currentUser = localStorage.api_key;
  },
  methods: {
    isToday(date) {
      return moment(date).isSame(this.today, 'day');
    },
    getMandays() {
      this.$http.get('/api/manday?show=' + this.show)
        .then(response => {
          this.mandays = response.data;
        });
    },
    getProjects() {
      this.$http.get('/api/project')
        .then(response => {
          this.projects = response.data;
          if (this.projects.length > 0) {
            this.mandayForm.projectKey = this.projects[0].projectKey;
          }
        });
    },
    saveManday() {
      this.$refs['mandayForm'].validate((valid) => {
        if (valid) {
          this.mandayForm.date = moment(this.mandayForm.date).format('YYYY-MM-DD');
          if (this.mandayForm.action == 'add') {
            this.$http.post('/api/manday', this.mandayForm)
              .then(response => {
                this.dialogFormVisible = false;
                this.$refs.mandayForm.resetFields();
                this.getMandays();
              });
          }
          else {
            this.$http.put('/api/manday/' + this.mandayForm._id, this.mandayForm)
              .then(response => {
                this.dialogFormVisible = false;
                this.$refs.mandayForm.resetFields();
                this.getMandays();
              });
          }
        } else {
          return false;
        }
      });
    },
    openMandayForm(row) {
      this.getProjects();

      if (!!row) {
        this.mandayForm.action = "modify";
        this.mandayForm._id = row._id;
        this.mandayForm.date = new Date(row.date);
        this.mandayForm.projectKey = row.projectKey;
        this.mandayForm.hours = row.hours;
        this.mandayForm.description = row.description;
      }
      else {
        this.mandayForm.action = "add";
      }

      this.dialogFormVisible = true;
    },
    deleteManday(index, row) {
      this.$http.delete('/api/manday/' + row._id)
        .then(response => {
          this.$message({
            type: 'success',
            message: '删除成功'
          });
          this.getMandays();
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-tag {
  font-size: 10px;
  height: 18px;
  line-height: 18px;
  padding: 0 2px;
}
</style>
