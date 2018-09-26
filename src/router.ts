import Vue from 'vue';
import Router from 'vue-router';
import store from './stores/store';
// import { camelCase, upperFirst } from 'lodash';
import Layout from './components/Layout/Layout.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history', // hash history
  base: 'manage',
  // routes,
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import(/* webpackChunkName: "Home" */ './pages/home/home.vue'),
          meta: {
            title: '首页',
          },
        },
        // 系统管理
        {
          path: '/admin/user',
          name: 'user',
          component: () => import(/* webpackChunkName: "user" */ './pages/admin/user.vue'),
          meta: {
            title: '用户管理',
            needAuth: true,
          },
        },
        {
          path: '/admin/role',
          name: 'role',
          component: () => import(/* webpackChunkName: "role" */ './pages/admin/role.vue'),
          meta: {
            title: '角色管理',
            needAuth: true,
          },
        },
        {
          path: '/admin/menu',
          name: 'menu',
          component: () => import(/* webpackChunkName: "menu" */ './pages/admin/menu.vue'),
          meta: {
            title: '菜单管理',
            needAuth: true,
          },
        },
        {
          path: '/user/userProfile',
          name: 'userProfile',
          component: () => import(/* webpackChunkName: "userProfile" */ './pages/user/userProfile.vue'),
          meta: {
            title: '个人信息',
          },
        },
        {
          path: '/user/userChangePwd',
          name: 'userChangePwd',
          component: () => import(/* webpackChunkName: "userChangePwd" */ './pages/user/userChangePwd.vue'),
          meta: {
            title: '修改密码',
          },
        },
        // 球员管理
        {
          path: '/player/players',
          name: 'players',
          component: () => import(/* webpackChunkName: "players" */ './pages/player/players.vue'),
          meta: {
            title: '球员管理',
            needAuth: true,
          },
        },
        // 直播间管理
        {
          path: '/live/lives',
          name: 'lives',
          component: () => import(/* webpackChunkName: "lives" */ './pages/live/lives.vue'),
          meta: {
            title: '直播间管理',
            needAuth: true,
          },
        },
        {
          path: '/live/addLive',
          name: 'addLive',
          component: () => import(/* webpackChunkName: "Lives" */ './pages/live/addLive.vue'),
          meta: {
            title: '添加直播间',
            needAuth: true,
          },
        },
        {
          path: '/live/editLive/:id',
          name: 'editLive',
          component: () => import(/* webpackChunkName: "editLive" */ './pages/live/editLive.vue'),
          meta: {
            title: '修改直播间信息',
            needAuth: true,
          },
        },
        {
          path: '/live/liveVideo',
          name: 'liveVideo',
          component: () => import(/* webpackChunkName: "liveVideo" */ './pages/live/liveVideo.vue'),
          meta: {
            title: '直播播放',
            needAuth: false,
          },
        },
        // 赛事
        {
          path: '/ball/match',
          name: 'match',
          component: () => import(/* webpackChunkName: "match" */ './pages/ball/match.vue'),
          meta: {
            title: '赛事管理',
            needAuth: true,
          },
        },
        {
          path: '/ball/scoring/scoring/:scheduleId',
          name: 'scoring',
          component: () => import(/* webpackChunkName: "scoring" */ './pages/ball/scoring/scoring.vue'),
          meta: {
            title: '积分管理',
            // needAuth: true,
          },
        },
        {
          path: '/ball/scoring/selectSchedule',
          name: 'selectSchedule',
          component: () => import(/* webpackChunkName: "selectSchedule" */ './pages/ball/scoring/selectSchedule.vue'),
          meta: {
            title: '选择计分赛程',
            // needAuth: true,
          },
        },
        {
          path: '/ball/match/addMatch',
          name: 'addMatch',
          component: () => import(/* webpackChunkName: "addMatch" */ './pages/ball/match/addMatch.vue'),
          meta: {
            title: '添加赛事',
            // needAuth: true,
          },
        },
        {
          path: '/ball/match/editMatch/:id',
          name: 'editMatch',
          component: () => import(/* webpackChunkName: "editMatch" */ './pages/ball/match/editMatch.vue'),
          meta: {
            title: '修改赛事',
            // needAuth: true,
          },
        },
        {
          path: '/ball/match/detail/:id',
          component: () => import(/* webpackChunkName: "matchDetail" */ './pages/ball/match/detail.vue'),
          meta: {
            title: '赛事详情',
            // needAuth: true,
          },
          children: [
            {
              path: 'info',
              component: () =>
              import(/* webpackChunkName: "matchDetailInfo" */ './pages/ball/match/matchInfo.vue'),
              meta: {
                tabName: 'info',
              },
            },
            {
              path: 'schedule',
              component: () =>
              import(/* webpackChunkName: "matchSchedules" */ './pages/ball/match/schedule/schedules.vue'),
              meta: {
                tabName: 'schedule',
              },
            },
            {
              path: 'addSchedule',
              component: () =>
              import(/* webpackChunkName: "addSchedule" */ './pages/ball/match/schedule/addSchedule.vue'),
              meta: {
                tabName: 'schedule',
              },
            },
            {
              path: 'editSchedule/:scheduleId',
              component: () =>
              import(/* webpackChunkName: "editSchedule" */ './pages/ball/match/schedule/editSchedule.vue'),
              meta: {
                tabName: 'schedule',
              },
            },
            {
              path: 'team',
              component: () =>
              import(/* webpackChunkName: "matchTeamInfo" */ './pages/ball/match//team/team.vue'),
              meta: {
                tabName: 'team',
              },
            },
            {
              path: 'addTeam',
              component: () =>
              import(/* webpackChunkName: "addTeam" */ './pages/ball/match/team/addTeam.vue'),
              meta: {
                tabName: 'team',
              },
            },
            {
              path: 'editTeam/:scheduleId',
              component: () =>
              import(/* webpackChunkName: "editTeam" */ './pages/ball/match/team/editTeam.vue'),
              meta: {
                tabName: 'team',
              },
            },
          ],
        },
        {
          path: 'cms/slideshow/slideList',
          component: () => import(/* webpackChunkName: "slideList" */ './pages/cms/slideShow/slideList.vue'),
          meta: {
            title: '幻灯片轮播',
          },
        },
        {
          path: 'cms/slideshow/createSlideShow',
          name: 'CreateSlideShow',
          component:
          () => import(/* webpackChunkName: "CreateSlideShow" */ './pages/cms/slideShow/createSlideShow.vue'),
          meta: {
            title: '创建幻灯片',
          },
        },
        {
          path: 'cms/slideshow/editSlideShow/:slideshowId',
          name: 'EditSlideShow',
          component: () => import(/* webpackChunkName: "EditSlideShow" */ './pages/cms/slideShow/editSlideShow.vue'),
          meta: {
            title: '编辑幻灯片',
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
  if (new RegExp(routerInfo.path).test(authPath)) {
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
