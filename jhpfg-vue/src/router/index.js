import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/index'
import Employment from '../views/employment'

Vue.use(VueRouter)

const routes = [
  {
		path: '',
		redirect: '/employment'
	},
  {
    path: '/index',
    component: Index,
    children: [
      {
        path: '/userStudent',
        component: () => import('../views/userStudent')
      },
      {
        path: '/userCompany',
        component: () => import('../views/userCompany')
      },
      {
        path: '/userSchool',
        component: () => import('../views/userSchool')
      },
      {
        path:'/employment',
        component: Employment
      },
      {
        path:'/forum',
        component: () => import('../views/forum')
      },
      {
        path:'/calendar',
        component: () => import('../views/calendar')
      },
      {
        path:'/messages',
        component: () => import('../views/messages')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/login')
  },
  {
    path: '/room',
    component: () => import('../views/room'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to,from,next) => {
// 	if(to.path != "/login" && store.state.user.username == "") {
// 		next("/login");
// 		alert("请先登录");
// 	} else {
// 		next();
// 	}
// })

export default router
