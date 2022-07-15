import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        name: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('@/views/My')
      },
      {
        path: '/video',
        name: 'Video',
        component: () => import('@/views/Video')
      },
      {
        path: '/qa',
        name: 'home',
        component: () => import('@/views/QA')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
