<template>
  <div class="project">
    <el-card>
      <div slot="header" class="card-header">
        <span>项目</span>
        <el-button type="primary" icon="el-icon-plus" size="mini" style="float:right;" @click="dialogFormVisible = true"></el-button>
        <el-button type="primary" size="mini" style="float:right;margin-right: 10px;" @click="getProjects()">
          <i class="fa fa-refresh" style="width: 12px;"></i>
        </el-button>
      </div>
      <el-table :data="projects">
        <el-table-column prop="projectName" label="项目名">
        </el-table-column>
        <el-table-column prop="projectKey" label="项目Key">
        </el-table-column>
        <el-table-column prop="hours" label="工时" width="80px">
        </el-table-column>
        <el-table-column prop="projectStatus" label="项目状态" width="80px">
        </el-table-column>
      </el-table>
    </el-card>
  
    <el-dialog title="新增项目" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="80px">
        <el-form-item label="项目名" prop="projectName">
          <el-input v-model="addForm.projectName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目Key" prop="projectKey">
          <el-input v-model="addForm.projectKey" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目状态" prop="projectStatus">
          <el-radio-group v-model="addForm.projectStatus" size="mini">
            <el-radio-button label="ToDo">ToDo</el-radio-button>
            <el-radio-button label="InProgress">InProgress</el-radio-button>
            <el-radio-button label="Done">Done</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProject('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

export default {
  name: "project",
  data() {
    return {
      projects: [],
      dialogFormVisible: false,
      addForm: {
        projectName: "",
        projectKey: "",
        projectStatus: "ToDo"
      },
      rules: {
        projectName: [
          { required: true, message: "请输入项目名", trigger: "blur" },
          { max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        projectKey: [
          { required: true, message: "请输入项目Key", trigger: "blur" },
          { min: 2, max: 50, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        projectStatus: [
          { required: true }
        ]
      }
    };
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    addProject(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("/api/project", this.addForm)
            .then(response => {
              this.dialogFormVisible = false;
              this.$refs.addForm.resetFields();
              this.getProjects();
            })
            .catch(error => {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
              }
              console.log(error.config);
            });
        } else {
          return false;
        }
      });
    },
    getProjects() {
      this.$http.get("/api/project").then(response => {
        this.projects = response.data;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
