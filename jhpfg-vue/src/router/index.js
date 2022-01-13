import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    component: Index,
  },
  {
    path: '/login',
    component: () => import('../views/login')
  }
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
