<template>
  <div class="user">
    <el-card>
      <div slot="header" class="card-header">
        <span>成员</span>
        <el-button type="primary" size="mini" style="float:right;margin-right: 10px;" @click="getUsers()">
          <i class="fa fa-refresh" style="width: 12px;"></i>
        </el-button>
      </div>
  
      <el-table :data="users">
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
export default {
  name: 'user',
  data() {
    return {
      users: []
    }
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$http.get('/api/user')
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {

        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
