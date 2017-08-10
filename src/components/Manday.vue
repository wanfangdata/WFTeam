<template>
  <div class="manday">
    <el-card>
      <div slot="header" class="card-header">
        <span>工时</span>
        <el-button type="primary" icon="plus" size="mini" style="float:right;" @click="openAddForm()"></el-button>
      </div>
      <el-table :data="mandays" :border="true">
        <el-table-column prop="date" label="日期" width="120" :formatter="dateFormateer">
        </el-table-column>
        <el-table-column prop="userName" label="成员" width="100">
        </el-table-column>
        <el-table-column prop="projectKey" label="项目">
        </el-table-column>
        <el-table-column prop="hours" label="工时" width="100">
        </el-table-column>
      </el-table>
    </el-card>
  
    <el-dialog title="新增工时" :visible.sync="dialogFormVisible" size="tiny">
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="日期" prop="date">
          <el-date-picker v-model="addForm.date" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目" required label-width="50px">
          <el-col :span="11">
            <el-form-item prop="projectKey">
              <el-select v-model="addForm.projectKey" placeholder="请选择">
                <el-option v-for="item in projects" :key="item.projectKey" :label="item.projectName" :value="item.projectKey">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="7">
            <el-form-item prop="hours">
              <el-input v-model="addForm.hours" max="24" min="1" type="number">
                <template slot="append">H</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addManday()">确 定</el-button>
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
      mandays: [],
      dialogFormVisible: false,
      addForm: {
        date: new Date(),
        projectKey: '',
        hours: 8
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
      dateFormateer: function(row, column, cellValue){
        return moment(cellValue).format('YYYY-MM-DD');
      }
    }
  },
  mounted() {
    this.getMandays();
    this.getProjects();
    console.log();
  },
  methods: {
    getMandays() {
      this.$http.get('/api/manday')
        .then(response => {
          this.mandays = response.data;
        });
    },
    getProjects() {
      this.$http.get('/api/project')
        .then(response => {
          this.projects = response.data;
          if (this.projects.length > 0) {
            this.addForm.projectKey = this.projects[0].projectKey;
          }
        });
    },
    addManday() {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.addForm.date = moment(this.addForm.date).format('YYYY-MM-DD');
          this.$http.post('/api/manday', this.addForm)
            .then(response => {
              this.dialogFormVisible = false;
              this.$refs.addForm.resetFields();
              this.getMandays();
            });
        } else {
          return false;
        }
      });
    },
    openAddForm(){
      this.dialogFormVisible = true;
      this.getProjects();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
