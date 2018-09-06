import Vue from 'vue';
import Router from 'vue-router';
import store from './stores/store';
// import { camelCase, upperFirst } from 'lodash';
import Layout from './components/Layout/Layout.vue';

Vue.use(Router);

const router = new Router({
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
          name: 'UserManage',
          component: () => import(/* webpackChunkName: "UserManage" */ './pages/home/UserManage.vue'),
          meta: {
            title: '用户管理',
            needAuth: true,
          },
        },
        {
          path: '/admin/role',
          name: 'RoleManage',
          component: () => import(/* webpackChunkName: "RoleManage" */ './pages/home/RoleManage.vue'),
          meta: {
            title: '角色管理',
            needAuth: true,
          },
        },
        {
          path: '/admin/menu',
          name: 'MenuManage',
          component: () => import(/* webpackChunkName: "MenuManage" */ './pages/home/MenuManage.vue'),
          meta: {
            title: '菜单管理',
            needAuth: true,
          },
        },
        {
          path: '/user/profile',
          name: 'UserProfile',
          component: () => import(/* webpackChunkName: "UserProfile" */ './pages/home/UserProfile.vue'),
          meta: {
            title: '个人信息',
          },
        },
        {
          path: '/user/changepwd',
          name: 'UserChangePwd',
          component: () => import(/* webpackChunkName: "UserChangePwd" */ './pages/home/UserChangePwd.vue'),
          meta: {
            title: '修改密码',
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

const findRouterInChild = (routerInfo: { children: any[], path: string }, authPath: string): boolean => {
  if (authPath === routerInfo.path) {
    return true;
  }
  const children = routerInfo.children;
  if (!children || children.length <= 0) {
    return false;
  }
  return children.some((info: any) => {
    return findRouterInChild(info, authPath);
  });
};

router.beforeEach((to, from, next) => {
  if (!to.meta.needAuth) {
    next();
    return;
  }
  const goPath = to.path;
  const routers = (store.state as any).userInfo.router;
  const isAuth = routers.some((routerInfo: any) => {
    return findRouterInChild(routerInfo, goPath);
  });
  if (isAuth) {
    next();
    return;
  }
  next('/403');
});


export default router;
