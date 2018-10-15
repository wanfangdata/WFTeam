import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Main from '@/views/Main.vue'
import Dashboard from '@/views/Main/Dashboard.vue'
import Manday from '@/views/Main/Manday.vue'
import Project from '@/views/Main/Project.vue'
import User from '@/views/Main/User.vue'
import Deploy from '@/views/Main/Deploy.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '',
          component: Dashboard
        },
        {
          path: 'manday',
          component: Manday
        },
        {
          path: 'project',
          component: Project
        },
        {
          path: 'user',
          component: User
        },
        {
          path: 'deploy',
          component: Deploy
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
