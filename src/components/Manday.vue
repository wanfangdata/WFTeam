<template>
  <div class="manday">
    <el-card>
      <div slot="header" class="card-header">工时</div>
  
      <el-table :data="mandays" :border="true">
        <el-table-column prop="date" label="日期" width="120">
        </el-table-column>
        <el-table-column prop="realName" label="成员" width="100">
        </el-table-column>
        <el-table-column prop="projectName" label="项目">
        </el-table-column>
        <el-table-column prop="hours" label="工时" width="100">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'manday',
  data() {
    return {
      mandays: []
    }
  },
  mounted() {
    this.getMandays();
  },
  methods: {
    getMandays() {
      this.mandays = [
        { date: '2017-08-07', realName: 'Richard Hendricks', projectName: '项目1', hours: 8 },
        { date: '2017-08-04', realName: '尤小右', projectName: '项目1', hours: 8 },
      ];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
