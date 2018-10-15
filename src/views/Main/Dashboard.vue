<template>
  <div class="dashboard">
    <el-row>
      <el-col :span="13">
        <Manday />
      </el-col>
      <el-col :span="10" :offset="1">
        <Project />
        <div style="margin-top: 10px;"></div>
        <User />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import User from "@/views/Main/User.vue";
import Project from "@/views/Main/Project.vue";
import Manday from "@/views/Main/Manday.vue";
import bus from "@/bus.ts";

export default {
  name: "dashboard",
  components: {
    User,
    Project,
    Manday
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      userName: "",
      realName: ""
    };
  },
  mounted() {
    this.getUserName();
  },
  created() {
    //bus.$on('loginComplete', this.loginComplete);
  },
  methods: {
    loginComplete: function(user) {
      this.userName = user.userName;
    },
    getUserName: function() {
      this.userName = localStorage.apikey;
    },
    logout: function() {
      localStorage.removeItem("apikey");
      delete this.$http.defaults.headers.common["apikey"];
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
