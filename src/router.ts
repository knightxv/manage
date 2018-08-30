import Vue from 'vue';
import Router from 'vue-router';
// import { camelCase, upperFirst } from 'lodash';
import Layout from './components/Layout/Layout.vue';

Vue.use(Router);


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // routes,
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import(/* webpackChunkName: "Home" */ './pages/home/Home.vue'),
          meta: {
            title: '首页',
          },
        },
        {
          path: '/admin/user',
          name: 'userManage',
          component: () => import(/* webpackChunkName: "UserManage" */ './pages/home/UserManage.vue'),
          meta: {
            title: '用户管理',
          },
        },
      ],
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "Login" */ './pages/common/Login.vue'),
    },
    {
        path: '/404',
        component: () => import(/* webpackChunkName: "NotFound" */ './pages/common/NotFound.vue'),
    },
    {
        path: '/403',
        component: () => import(/* webpackChunkName: "NoPower" */ './pages/common/NoPower.vue'),
    },
    {
        path: '*',
        redirect: '/404',
    },
  ],
});
