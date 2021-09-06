const routes = [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    // path: '/',
    // component: '../layouts/SecurityLayout',
    // routes: [
    //   {
    path: '/',
    component: '../layouts/BasicLayout',
    // authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        name: 'home',
        path: '/home',
        component: './Home',
      },
      {
        name: 'introduce',
        path: '/introduce',
        component: './Introduce',
      },
      {
        name: 'trend',
        path: '/trend',
        component: './Trend',
      },
      {
        name: 'mec',
        path: '/mec',
        component: './mec',
        // hideInMenu: true,
      },
      {
        // app商城
        name: 'appMall',
        path: 'appMall',
        component: './Mec/AppMall',
        // hideInMenu: true,
      },
      // **** 数字展厅模块
      {
        name: 'digitalShowroom',
        path: '/digitalShowroom',
        component: './digitalShowroom',
      },
      /** 2D/3D展厅模块 */
      {
        path: '/digitalShowroom/exhibitionHall',
        component: './digitalShowroom/ExhibitionHall',
      },
      /** 云联网模块 */
      {
        path: '/digitalShowroom/cloudNetWorking',
        component: './digitalShowroom/CloudNetWorking',
      },
      /** AI赋能 */
      {
        path: '/digitalShowroom/AIspecial',
        component: './digitalShowroom/AIspecial',
      },
      {
        path: '/digitalShowroom/coreID=:dataType',
        component: './digitalShowroom/AIspecial/components/CoreDetails',
      },
      {
        path: '/digitalShowroom/solutionID=:dataType',
        component: './digitalShowroom/AIspecial/components/SolutionDetails',
      },
      {
        path: '/digitalShowroom/moreID=:dataType',
        component: './digitalShowroom/AIspecial/components/MoreDetails',
      },
      // 资源分布
      {
        path: '/digitalShowroom/CloudNetWorking/resourceDistribution',
        component: './digitalShowroom/CloudNetWorking/resourceDistri',
      },
      // 丰富资源接入
      {
        path: '/digitalShowroom/CloudNetWorking/richResourceAccess',
        component: './digitalShowroom/CloudNetWorking/richResourceAccess',
      },
      //弹性带宽
      {
        path: '/digitalShowroom/CloudNetWorking/ElasticBandwidth',
        component: './digitalShowroom/CloudNetWorking/ElasticBandwidth',
      },
      // **** 应用仓库
      {
        name: 'appStorage',
        path: '/appStorage',
        component: './appStorage',
      },
      {
        path: '/appStorage/:id',
        component: './appStorage/components/Detail',
      },
      {
        path: '/appStorage/wishOrder/:id',
        component: '../components/WishOrder',
      },
      {
        name: 'whitebook',
        path: '/whitebook',
        component: './Whitebook',
      },
      // **** 会务系统
      // {
      //   name: 'conferenceSystem',
      //   path: '/conferenceSystem',
      //   component: './ConferenceSystem',
      //   children: [
      //     {
      //       name: 'checkOrders',
      //       path: 'checkOrders',
      //       // authority: ['partner'], //管理员不可见
      //       component: () => import('@/pages/ConferenceSystem/components/CheckOrders'),
      //     },
      //   ],
      // },
      // {
      //   path: '/conferenceSystem/checkOrders',
      //   component: './ConferenceSystem/components/CheckOrders',
      // },
      // **** 创新应用
      // {
      //   name: 'case',
      //   path: '/case',
      //   component: './Case',
      // },
      // **** 5G赛事
      {
        name: 'enrollment',
        path: '/enrollment',
        component: './Enrollment',
        // children: [{
        //     name: 'enrollment',
        //     path: 'index',
        //     component: () => import('@/views/enrollment/home')
        //   },
        //   {
        //     name: 'uploadApplyFiles',
        //     path: 'upload',
        //     component: () => import('@/views/enrollment/upload'),
        //     meta: {
        //       requireAuth: true
        //     }
        //   }
        // ]
      },
      {
        name: 'detailmsg',
        path: '/detailmsg',
        component: './DetailMsg',
        hideInMenu: true,
      },
      // {
      //   // name: 'bigDataAI',
      //   path: '/bigDataAI',
      //   component: './BigDataAI',
      // },
      // {
      //   name: '5glive',
      //   path: '/5glive',
      //   component: './5glive',
      // },
      {
        path: '/searchResult',
        component: './searchResult',
      },
      // **** 需求广场
      {
        name: 'demandSquare',
        path: '/demandSquare',
        routes: [
          {
            name: 'list',
            path: 'list',
            component: './DemandSquare/list',
          },
          {
            path: 'order/:id',
            component: './DemandSquare/order',
          },
          {
            name: 'order',
            path: 'order',
            component: './DemandSquare/order',
          },
        ],
      },

      // {
      //   name: 'clazzDetails',
      //   path: '/detailmsg',
      //   component: () => import('@/views/clazzDetails')
      // },
      {
        path: '/bloom',
        component: './Bloom',
      },
      {
        component: './404',
      },
    ],
    // },
    // {
    //   component: './404',
    // },
    // ],
    // }
    // ]
  },
  {
    component: './404',
  },
];

export default routes;
