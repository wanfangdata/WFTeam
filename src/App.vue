<template>
  <div id="app">
    <!-- <CalendarBlockGraph></CalendarBlockGraph> -->
      <router-view></router-view>
  </div>
</template>

<script>
import CalendarBlockGraph from "./components/CalendarBlockGraph";
export default {
  name: "app",
  components: { CalendarBlockGraph }
};
</script>

<style>
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

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
</style>
