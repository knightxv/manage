import Vue from 'vue';
import Router from 'vue-router';
import store from './stores/store';
// import { camelCase, upperFirst } from 'lodash';
import Layout from './components/Layout/Layout.vue';
import { BASE_URL } from './app/config';
Vue.use(Router);

const router = new Router({
  mode: 'history', // hash history
  base: BASE_URL,
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
        {
          path: '/tenant/tenantList',
          name: 'TenantList',
          component: () => import(/* webpackChunkName: "TenantList" */ './pages/admin/tenant/TenantList.vue'),
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
          component: () => import(/* webpackChunkName: "liveList" */ './pages/live/lives.vue'),
          meta: {
            title: '直播间管理',
            needAuth: true,
          },
        },
        {
          path: '/live/addLive',
          name: 'addLive',
          component: () => import(/* webpackChunkName: "AddLive" */ './pages/live/addLive.vue'),
          meta: {
            title: '添加直播间',
            needAuth: true,
          },
        },
        {
          path: '/live/editLive/:id',
          name: 'editLive',
          component: () => import(/* webpackChunkName: "EditLive" */ './pages/live/editLive.vue'),
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
        {
          path: '/live/liveDetail/:liveId',
          name: 'LiveDetail',
          component: () => import(/* webpackChunkName: "LiveDetail" */ './pages/live/liveDetail.vue'),
          meta: {
            title: '直播详情',
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
          path: '/ball/onlineCount/allCount',
          component: () => import(/* webpackChunkName: "onlineCount" */ './pages/ball/onlineCount/AllCount.vue'),
          meta: {
            title: '直播人数',
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
              path: 'sheduleGuessList/:scheduleId',
              name: 'MatchScheduleGuessList',
              component: () =>
              import(/* webpackChunkName: "MatchScheduleGuessList" */
              './pages/ball/match/schedule/MatchScheduleGuessList.vue'),
              meta: {
                tabName: 'schedule',
              },
            },
            {
              path: ':scheduleId/createMatchScheduleGuess',
              name: 'CreateMatchScheduleGuess',
              component: () =>
              import(/* webpackChunkName: "CreateMatchScheduleGuess" */
              './pages/ball/match/schedule/CreateMatchScheduleGuess.vue'),
              meta: {
                tabName: 'schedule',
              },
            },
            {
              path: '/editMatchScheduleGuess/:matchScheduleGuessGameId',
              name: 'EditMatchScheduleGuess',
              component: () =>
              import(/* webpackChunkName: "EditMatchScheduleGuess" */
              './pages/ball/match/schedule/EditMatchScheduleGuess.vue'),
              meta: {
                tabName: 'schedule',
              },
            },
            {
              path: 'team',
              component: () =>
              import(/* webpackChunkName: "matchTeamInfo" */ './pages/ball/match/team/team.vue'),
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
            {
              path: 'editTeamPlayer/:matchTeamId',
              name: 'EditScheduleTeamPlayer',
              component: () =>
              import(/* webpackChunkName: "EditScheduleTeamPlayer" */ './pages/ball/match/team/editTeamPlayer.vue'),
              meta: {
                tabName: 'team',
              },
            },
            {
              path: 'video',
              component: () =>
              import(/* webpackChunkName: "videoList" */ './pages/ball/match/video/videoList.vue'),
              meta: {
                tabName: 'video',
              },
            },
            {
              path: 'video/videoCreate',
              name: 'CreateMatchVideo',
              component: () =>
              import(/* webpackChunkName: "videoCreate" */ './pages/ball/match/video/videoCreate.vue'),
              meta: {
                tabName: 'video',
              },
            },
            {
              path: 'video/videoEdit/:videoId',
              name: 'EditMatchVideo',
              component: () =>
              import(/* webpackChunkName: "videoEdit" */ './pages/ball/match/video/videoEdit.vue'),
              meta: {
                tabName: 'video',
              },
            },
          ],
        },
        // 内容管理
        {
          path: '/cms/slideshow/slideList',
          component: () => import(/* webpackChunkName: "slideList" */ './pages/cms/slideShow/slideList.vue'),
          meta: {
            title: '幻灯片轮播',
          },
        },
        {
          path: '/cms/slideshow/createSlideShow',
          name: 'CreateSlideShow',
          component:
          () => import(/* webpackChunkName: "CreateSlideShow" */ './pages/cms/slideShow/createSlideShow.vue'),
          meta: {
            title: '创建幻灯片',
          },
        },
        {
          path: '/cms/slideshow/editSlideShow/:slideshowId',
          name: 'EditSlideShow',
          component: () => import(/* webpackChunkName: "EditSlideShow" */ './pages/cms/slideShow/editSlideShow.vue'),
          meta: {
            title: '编辑幻灯片',
          },
        },
        {
          path: '/cms/videoGroup/groupList',
          name: 'VideoGroupList',
          component: () => import(/* webpackChunkName: "VideoGroupList" */ './pages/cms/videoGroup/VideoGroupList.vue'),
          meta: {
            title: '视频组列表',
          },
        },
        {
          path: '/cms/videoGroup/createVideoGroup',
          name: 'CreateVideoGroup',
          component: () =>
          import(/* webpackChunkName: "CreateVideoGroup" */ './pages/cms/videoGroup/CreateVideoGroup.vue'),
          meta: {
            title: '创建视频组',
          },
        },
        {
          path: '/cms/videoGroup/editVideoGroup/:videoGroupId',
          name: 'EditVideoGroup',
          component: () =>
          import(/* webpackChunkName: "EditVideoGroup" */ './pages/cms/videoGroup/EditVideoGroup.vue'),
          meta: {
            title: '修改视频组',
          },
        },
        {
          path: '/cms/videoGroup/:videoGroupId/createVideo',
          name: 'CreateVideo',
          component: () =>
          import(/* webpackChunkName: "CreateVideo" */ './pages/cms/videoGroup/CreateVideo.vue'),
          meta: {
            title: '创建视频',
          },
        },
        {
          path: '/cms/videoGroup/:videoGroupId/editVideo/:videoId',
          name: 'EditVideo',
          component: () =>
          import(/* webpackChunkName: "EditVideo" */ './pages/cms/videoGroup/EditVideo.vue'),
          meta: {
            title: '修改视频',
          },
        },
        {
          path: '/cms/videoGroup/:videoGroupId/videoList',
          name: 'VideoList',
          component: () =>
          import(/* webpackChunkName: "VideoList" */ './pages/cms/videoGroup/VideoList.vue'),
          meta: {
            title: '创建视频',
          },
        },
        {
          path: '/cms/category/categoryList',
          name: 'CategoryList',
          component: () =>
          import(/* webpackChunkName: "CategoryList" */ './pages/cms/category/CategoryList.vue'),
          meta: {
            title: '类目列表',
          },
        },
        {
          path: '/cms/category/createCategory',
          name: 'CreateCategory',
          component: () =>
          import(/* webpackChunkName: "CreateCategory" */ './pages/cms/category/CreateCategory.vue'),
          meta: {
            title: '添加类目',
          },
        },
        {
          path: '/cms/category/editCategory/:categoryId',
          name: 'EditCategory',
          component: () =>
          import(/* webpackChunkName: "EditCategory" */ './pages/cms/category/EditCategory.vue'),
          meta: {
            title: '修改类目',
          },
        },
        {
          path: '/cms/category/:categoryId/articleList',
          name: 'ArticleList',
          component: () =>
          import(/* webpackChunkName: "ArticleList" */ './pages/cms/category/ArticleList.vue'),
          meta: {
            title: '类目文章',
          },
        },
        {
          path: '/cms/category/:categoryId/CreateArticle',
          name: 'CreateArticle',
          component: () =>
          import(/* webpackChunkName: "CreateArticle" */ './pages/cms/category/CreateArticle.vue'),
          meta: {
            title: '创建文章',
          },
        },
        {
          path: '/cms/category/:categoryId/editArticle/:articleId',
          name: 'EditArticle',
          component: () =>
          import(/* webpackChunkName: "EditArticle" */ './pages/cms/category/EditArticle.vue'),
          meta: {
            title: '修改文章',
          },
        },
        {
          path: '/cms/global/properties',
          name: 'GlobalProperties',
          component: () =>
          import(/* webpackChunkName: "GlobalProperties" */ './pages/cms/global/GlobalProperties.vue'),
          meta: {
            title: '修改文章',
          },
        },
        {
          path: '/cms/guess/guessList',
          name: 'GuessList',
          component: () =>
          import(/* webpackChunkName: "GuessList" */ './pages/cms/guess/GuessList.vue'),
          meta: {
            title: '竞猜管理',
          },
        },
        {
          path: '/cms/guess/createGuess',
          name: 'CreateGuess',
          component: () =>
          import(/* webpackChunkName: "CreateGuess" */ './pages/cms/guess/CreateGuess.vue'),
          meta: {
            title: '创建竞猜',
          },
        },
        {
          path: '/cms/guess/:guessId/editGuess',
          name: 'EditGuess',
          component: () =>
          import(/* webpackChunkName: "EditGuess" */ './pages/cms/guess/EditGuess.vue'),
          meta: {
            title: '修改竞猜',
          },
        },
        // gift
        {
          path: '/ball/gift/giftList',
          name: 'BallGiftList',
          component: () =>
          import(/* webpackChunkName: "BallGiftList" */ './pages/gift/GiftList.vue'),
          meta: {
            title: '礼物列表',
          },
        },
        {
          path: '/ball/gift/createGift',
          name: 'CreateGift',
          component: () =>
          import(/* webpackChunkName: "CreateGift" */ './pages/gift/CreateGift.vue'),
          meta: {
            title: '礼物列表',
          },
        },
        {
          path: '/ball/gift/editGift/:giftId',
          name: 'EditGift',
          component: () =>
          import(/* webpackChunkName: "CreateGift" */ './pages/gift/EditGift.vue'),
          meta: {
            title: '礼物列表',
          },
        },
        // 支付
        {
          path: '/pay/:tenantId/payClientList',
          name: 'PayClientList',
          component: () =>
          import(/* webpackChunkName: "PayClientList" */ './pages/pay/PayClientList.vue'),
          meta: {
            title: '支付客户端列表',
          },
        },
        {
          path: '/pay/:tenantId/createPayClient',
          name: 'CreatePayClient',
          component: () =>
          import(/* webpackChunkName: "CreatePayClient" */ './pages/pay/CreatePayClient.vue'),
          meta: {
            title: '创建客户端',
          },
        },
        {
          path: '/pay/editPayClient/:payClientId',
          name: 'EditPayClient',
          component: () =>
          import(/* webpackChunkName: "EditPayClient" */ './pages/pay/EditPayClient.vue'),
          meta: {
            title: '修改客户端',
          },
        },
        {
          path: '/pay/:payClientId/PayClientPhoneList',
          name: 'PayClientPhoneList',
          component: () =>
          import(/* webpackChunkName: "PayClientPhoneList" */ './pages/pay/PayClientPhoneList.vue'),
          meta: {
            title: '客户端手机列表',
          },
        },
        {
          path: '/pay/:payClientId/createPayClientPhone',
          name: 'CreatePayClientPhone',
          component: () =>
          import(/* webpackChunkName: "CreatePayClientPhone" */ './pages/pay/CreatePayClientPhone.vue'),
          meta: {
            title: '创建手机',
          },
        },
        {
          path: '/pay/editPayClientPhone/:payClientPhoneId',
          name: 'EditPayClientPhone',
          component: () =>
          import(/* webpackChunkName: "EditPayClientPhone" */ './pages/pay/EditPayClientPhone.vue'),
          meta: {
            title: '修改手机信息',
          },
        },
        {
          path: '/pay/:payClientPhoneId/payClientPhoneAmountList',
          name: 'PayClientPhoneAmountList',
          component: () =>
          import(/* webpackChunkName: "PayClientPhoneAmountList" */ './pages/pay/PayClientPhoneAmountList.vue'),
          meta: {
            title: '手机金额列表',
          },
        },
        {
          path: '/pay/:payClientPhoneAmountId/payClientPhoneQrcodeList',
          name: 'PayClientPhoneQrcodeList',
          component: () =>
          import(/* webpackChunkName: "PayClientPhoneQrcodeList" */ './pages/pay/PayClientPhoneQrcodeList.vue'),
          meta: {
            title: '二维码列表',
          },
        },
        {
          path: '/pay/:payClientPhoneId/payClientPhoneQrCodeTaskList',
          name: 'PayClientPhoneQrCodeTaskList',
          component: () =>
          import(/* webpackChunkName: "PayClientPhoneQrCodeTaskList" */ './pages/pay/PayClientPhoneQrCodeTaskList.vue'),
          meta: {
            title: '二维码任务',
          },
        },
        {
          path: '/pay/:payClientPhoneId/CreatePayClientPhoneQrCodeTask',
          name: 'CreatePayClientPhoneQrCodeTask',
          component: () =>
          import(/* webpackChunkName: "CreatePayClientPhoneQrCodeTask" */
          './pages/pay/CreatePayClientPhoneQrCodeTask.vue'),
          meta: {
            title: '二维码任务',
          },
        },
        {
          path: '/ball/giftGroupList',
          name: 'GiftGroupList',
          component: () =>
          import(/* webpackChunkName: "GiftGroupList" */
          './pages/gift/GiftGroupList.vue'),
          meta: {
            title: '礼物组列表',
          },
        },
        {
          path: '/ball/:giftGroupId/editGiftGroupList',
          name: 'EditGiftGroupGift',
          component: () =>
          import(/* webpackChunkName: "EditGiftGroupGift" */
          './pages/gift/EditGiftGroupGift.vue'),
          meta: {
            title: '礼物组列表',
          },
        },
      ],
    },
    {
      path: '/:tenantId/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "Login" */ './pages/common/Login.vue'),
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
