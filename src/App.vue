<template>
  <div id="app">
    <header style="text-align: center;">
      <h1>WFTeam 工时</h1>
    </header>
    
    <!-- <CalendarBlockGraph></CalendarBlockGraph> -->
    <router-view></router-view>
  </div>
</template>

<script>
import CalendarBlockGraph from './components/CalendarBlockGraph'
export default {
  name: 'app',
  components: { CalendarBlockGraph }
}
</script>

<style>
#app {}

header {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-menu-item {
  height: 30px !important;
  line-height: 30px !important;
}
</style>
