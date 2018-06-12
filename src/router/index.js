import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Dashboard from '@/components/Dashboard'
import Manday from '@/components/Manday'
import Project from '@/components/Project'
import User from '@/components/User'
import Deploy from '@/components/Deploy'
import DeployInfo from '@/components/DeployInfo'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
          component: Deploy,
          children: [
            {
              path: ':id',
              component: DeployInfo
            }
          ]
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
