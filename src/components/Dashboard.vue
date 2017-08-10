<template>
  <div class="dashboard">
    <el-row>
      <h2 style="text-align: center;">{{realName}}({{userName}})</h2>
    </el-row>
    <el-row>
      <el-col :span="13" :offset="1">
        <Manday />
      </el-col>
      <el-col :span="8" :offset="1">
        <Project />
        <div style="margin-top: 10px;"></div>
        <User />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import User from './User'
import Project from './Project'
import Manday from './Manday'

export default {
  name: 'dashboard',
  components: {
    User, Project, Manday
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      userName: '',
      realName: ''
    }
  },
  created() {
    bus.$on('loginComplete', this.loginComplete);
  },
  methods: {
    loginComplete: function (user) {
      this.userName = user.userName;
      this.realName = user.realName;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-header {
  font-weight: bold;
}
</style>
