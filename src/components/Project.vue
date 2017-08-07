<template>
  <div class="project">
    <el-card>
      <div slot="header" class="card-header">
        <span>项目</span>
        <el-button type="primary" icon="plus" size="mini" style="float:right;" @click="dialogFormVisible = true"></el-button>
      </div>
      <el-table :data="projects">
        <el-table-column prop="projectName" label="项目名">
        </el-table-column>
        <el-table-column prop="projectKey" label="项目Key">
        </el-table-column>
        <el-table-column prop="hours" label="工时">
        </el-table-column>
      </el-table>
    </el-card>
  
    <el-dialog title="新增项目" :visible.sync="dialogFormVisible" size="tiny">
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="项目名" prop="projectName">
          <el-input v-model="addForm.projectName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目Key" prop="projectKey">
          <el-input v-model="addForm.projectKey" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProject('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./Project.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
