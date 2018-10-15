<template>
  <div id="app">
      <router-view/>
  </div>
</template>

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
