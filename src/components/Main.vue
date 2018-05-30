<template>
  <el-container>
    <el-header>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  command="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>      
    </el-header>
    <el-container>
      <el-aside width="110px">
        <el-menu :default-active="$route.path" router class="el-menu-vertical-demo">
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">仪表盘</span>
          </el-menu-item>
          <el-menu-item index="/manday">
            <i class="el-icon-menu"></i>
            <span slot="title">工时</span>
          </el-menu-item>
          <el-menu-item index="/project">
            <i class="el-icon-menu"></i>
            <span slot="title">项目</span>
          </el-menu-item>
          <el-menu-item index="user">
            <i class="el-icon-document"></i>
            <span slot="title">成员</span>
          </el-menu-item>
          <el-menu-item index="/deploy">
            <i class="el-icon-setting"></i>
            <span slot="title">部署</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import User from "./User";
import Project from "./Project";
import Manday from "./Manday";
import bus from "../bus.js";

export default {
  name: "dashboard",
  components: {
    User,
    Project,
    Manday
  },
  data() {
    return {
      userName: ""
    };
  },
  mounted() {
    this.getUserName();
  },
  methods: {
    loginComplete: function(user) {
      this.userName = user.userName;
    },
    getUserName: function() {
      this.userName = localStorage.api_key;
    },
    handleCommand(command) {
      switch (command) {
        case "logout":
          this.logout();
      }
    },
    logout: function() {
      localStorage.removeItem("api_key");
      delete this.$http.defaults.headers.common["api_key"];
      this.$router.push("/login");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-header {
  font-weight: bold;
}
</style>
