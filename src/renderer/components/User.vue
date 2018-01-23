<template>
  <div class="user">
    <el-card>
      <div slot="header" class="card-header">
        <span>成员</span>
        <el-button type="primary" size="mini" style="float: right; margin-left: 10px;" @click="getUsers()">
          <i class="fa fa-refresh" style="width: 12px;"></i>
        </el-button>
        <el-switch v-model="day" active-text="今天" inactive-text="昨天" inactive-color="#13ce66" active-value="today" inactive-value="yesterday" style="float: right; margin-right: 10px;">
        </el-switch>
      </div>
  
      <el-table :data="users" :row-style="hoursStyle">
        <el-table-column prop="realName" label="成员">
        </el-table-column>
        <el-table-column prop="userName" label="用户名">
        </el-table-column>
        <el-table-column prop="hours" label="工时">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'user',
  data() {
    return {
      users: [],
      day: 'today'
    }
  },
  mounted() {
    this.getUsers();
  },
  watch: {
    day: function () {
      this.getUsers();
    }
  },
  methods: {
    getUsers() {
      let days = {'today': moment().startOf('day').toDate(), 'yesterday': moment().startOf('day').subtract(1, 'd').toDate()}

      this.$http.get('/api/user?day=' + days[this.day].toISOString())
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {

        });
    },
    hoursStyle(row, index){
      if (row.hours < 8){
        return "color: #FF4949;";
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
