<template>
  <div id="app">
    <header style="text-align: center;">
      <h1>WFTeam 工时</h1>
    </header>
    <!-- <nav>
            <el-menu theme="dark" mode="horizontal">
              <el-menu-item index="1">
                <router-link to="/">Dashboard</router-link>
              </el-menu-item>
              <el-menu-item index="2">
                <router-link to="/projects">项目</router-link>
              </el-menu-item>
            </el-menu>
          </nav> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
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
