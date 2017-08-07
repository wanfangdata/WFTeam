<template>
  <div class="user">
    <el-table :data="users">
      <el-table-column prop="realName" label="成员">
      </el-table-column>
      <el-table-column prop="userName" label="用户名">
      </el-table-column>
      <el-table-column prop="hours" label="工时">
      </el-table-column>
    </el-table>
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
      this.users = [
        { userName: 'richard', realName: 'Richard Hendricks', hours: 8 },
        { userName: 'you', realName: '尤小右', hours: 8 },
      ];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
