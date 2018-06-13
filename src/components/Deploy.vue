<template>
  <div class="deploy">
    <el-card>
      <div slot="header" class="card-header">
        <span>部署</span>
        <el-button type="primary" icon="el-icon-plus" size="mini" style="float:right;" @click="openDeployForm()"></el-button>
        <el-button type="primary" size="mini" style="float:right;margin-right: 10px;" @click="getDeploys()">
          <i class="fa fa-refresh" style="width: 12px;"></i>
        </el-button>
      </div>
      <el-table :data="deploys" :border="true">        
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form>
              <el-form-item label="部署内容：" label-width="100px">
                <vue-markdown class="markdown-body">{{ props.row.deployContent }}</vue-markdown>
              </el-form-item>
              <el-form-item style="text-align:right">
                <el-button-group>
                  <el-button size="small" icon="el-icon-delete" @click="deleteDeploy(props.$index, props.row)"></el-button>
                  <el-button size="small" icon="el-icon-edit" @click="openDeployForm(props.row)"></el-button>
                </el-button-group>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="deployName" label="部署名称">
          <template slot-scope="scope">
            <router-link :to="'/deploy/' + scope.row._id">{{ scope.row.deployName }}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="deployProject" label="部署项目" width="160px">
        </el-table-column>
        <el-table-column prop="deployProjectVersion" label="部署项目版本" width="160px">
        </el-table-column>
        <el-table-column prop="createTime" :formatter="dateFormatter" label="创建时间" width="160px">
        </el-table-column>
        <el-table-column prop="creator" label="创建人" width="160px">
        </el-table-column>
        <el-table-column prop="deployed" label="已部署" width="80px" align="center">
          <template slot-scope="scope">
            <i style="color: green;" class="el-icon-success" v-if="scope.row.deployed"></i>
            <i style="color: red; font-size: large; font-weight: bold;" class="el-icon-loading" v-if="!scope.row.deployed"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  
    <el-dialog :title="{add: '新增部署', modify: '编辑部署'}[deployForm.action]" :visible.sync="dialogFormVisible">
      <el-form :model="deployForm" :rules="rules" ref="deployForm">
        <el-form-item label="部署名称" prop="deployName" label-width="120px">
          <el-input v-model="deployForm.deployName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部署项目" prop="deployProject" label-width="120px">
          <el-input v-model="deployForm.deployProject" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部署项目版本" prop="deployProjectVersion" label-width="120px">
          <el-input v-model="deployForm.deployProjectVersion" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="已部署" prop="deployed" label-width="120px">
          <el-switch v-model="deployForm.deployed"></el-switch>
        </el-form-item>
        <el-form-item label="部署内容" prop="deployContent" label-width="120px">
          <el-input v-model="deployForm.deployContent" type="textarea" style="width: 300px;" :autosize="{ minRows: 4, maxRows: 10 }"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDeploy()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import VueMarkdown from "vue-markdown";

export default {
  name: "deploy",
  components: {
    VueMarkdown
  },
  data() {
    return {
      deploys: [],
      dialogFormVisible: false,
      deployForm: {
        action: "add",
        _id: "",
        deployName: "",
        deployProject: "",
        deployProjectVersion: "",
        deployContent: "",
        deployed: false
      },
      rules: {
        deployName: [
          { required: true, message: "请输入部署名称", trigger: "blur" },
          { max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        deployProject: [
          { required: true, message: "请输入部署项目", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        deployProjectVersion: [
          { required: true, message: "请输入部署项目版本", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        deployContent: [
          { required: true, message: "请输入部署内容", trigger: "blur" },
          {
            min: 2,
            max: 2000,
            message: "长度在 2 到 2000 个字符",
            trigger: "blur"
          }
        ],
        deployed: [{ required: true }]
      },
      dateFormatter: function(row, column, cellValue) {
        return moment(cellValue).format("YYYY-MM-DD HH:mm");
      }
    };
  },
  mounted() {
    this.getDeploys();
  },
  methods: {
    getDeploys() {
      this.$http.get("/api/deploy").then(response => {
        this.deploys = response.data;
      });
    },
    saveDeploy() {
      this.$refs["deployForm"].validate(valid => {
        if (valid) {
          if (this.deployForm.action == "add") {
            this.$http.post("/api/deploy", this.deployForm).then(response => {
              this.dialogFormVisible = false;
              this.$refs.deployForm.resetFields();
              this.getDeploys();
            });
          } else {
            this.$http
              .put("/api/deploy/" + this.deployForm._id, this.deployForm)
              .then(response => {
                this.dialogFormVisible = false;
                this.$refs.deployForm.resetFields();
                this.getDeploys();
              });
          }
        } else {
          return false;
        }
      });
    },
    openDeployForm(row) {
      this.getDeploys();

      if (!!row) {
        this.deployForm.action = "modify";
        this.deployForm._id = row._id;
        this.deployForm.deployName = row.deployName;
        this.deployForm.deployProject = row.deployProject;
        this.deployForm.deployProjectVersion = row.deployProjectVersion;
        this.deployForm.deployContent = row.deployContent;
        this.deployForm.deployed = row.deployed;
      } else {
        this.deployForm.action = "add";
        this.deployForm.deployName = "";
        this.deployForm.deployProject = "";
        this.deployForm.deployProjectVersion = "";
        this.deployForm.deployContent = "";
        this.deployForm.deployed = false;
      }

      this.dialogFormVisible = true;
    },
    deleteDeploy(index, row) {
      this.$http.delete("/api/deploy/" + row._id).then(response => {
        this.$message({
          type: "success",
          message: "删除成功"
        });
        this.getDeploys();
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
