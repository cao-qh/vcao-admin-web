// 基础布局组件
import BaseLayout from '@/layout/base/index.vue'
// 用户登录，注册布局组件
import UserLayout from '@/layout/user/index.vue'

// 对外暴漏配置路由(常量路由)
export const constantRoute = [
  // 登录
  {
    path: '/user',
    component: UserLayout,
    name: 'UserLayout',
    meta: {
      title: '登录',
      hidden: true, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
    },
    redirect: '/user/login',
    children: [
      // 登录
      {
        path: '/user/login',
        component: () => import('@/views/user/login/index.vue'),
        name: 'Login',
        meta: {
          title: '管理员登录',
        },
      },
    ],
  },

  // 404页面
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
    },
  },
]

export const asyncRoute = [
  // 测试
  {
    path: '/',
    component: BaseLayout,
    name: 'Home',
    meta: {
      title: '测试',
      icon: 'ExperimentOutlined',
    },
    redirect: '/test',
    children: [
      {
        path: '/test',
        component: () => import('@/views/test/index.vue'),
        name: 'Test',
        meta: {
          title: '测试',
        },
      },
    ],
  },
  // 数据表格
  {
    path: '/table',
    component: BaseLayout,
    name: 'Table',
    meta: {
      title: '数据表格',
      icon: 'TableOutlined',
    },
    redirect: '/table/search',
    children: [
      // 查询表格
      {
        path: '/table/search',
        component: () => import('@/views/table/search/index.vue'),
        name: 'Search',
        meta: {
          title: '查询表格',
        },
      },
    ],
  },
]

/*
// 管理员个人管理路由（单独添加，不参与权限筛选）
// 个人管理
export const adminPersonalRoute = {
  path: '/',
  component: BaseLayout,
  name: 'Personal',
  meta: {
    title: '个人管理',
    icon: 'UserOutlined',
  },
  redirect: '/Personal/Info',
  children: [
    // 个人信息
    {
      path: '/Personal/Info',
      component: () => import('@/views/Personal/Info/index.vue'),
      name: 'PersonalInfo',
      meta: {
        title: '个人信息',
      },
    },
  ],
}

// 异步路由
export const asyncRoute = [
  // 应用配置
  {
    path: '/AppConfig',
    component: BaseLayout,
    name: 'AppConfig',
    meta: {
      title: '应用配置',
      icon: 'AppstoreOutlined',
    },
    redirect: '/AppConfig/Protocol',
    children: [
      // 首页设置
      {
        path: '/AppConfig/HomeSetting',
        component: () => import('@/views/AppConfig/HomeSetting/index.vue'),
        name: 'HomeSetting',
        meta: {
          title: '首页设置',
        },
      },
      // 广告设置
      {
        path: '/AppConfig/AdSetting',
        component: () => import('@/views/AppConfig/AdSetting/index.vue'),
        name: 'AdSetting',
        meta: {
          title: '广告设置',
        },
      },
      // 会员订购
      {
        path: '/AppConfig/MemberOrder',
        component: () => import('@/views/AppConfig/MemberOrder/index.vue'),
        name: 'MemberOrder',
        meta: {
          title: '会员订购',
        },
      },
      // 视频解锁方式
      {
        path: '/AppConfig/VideoUnlock',
        component: () => import('@/views/AppConfig/VideoUnlock/index.vue'),
        name: 'VideoUnlock',
        meta: {
          title: '视频解锁方式',
        },
      },
      // 云点播
      {
        path: '/AppConfig/CloudPlay',
        component: () => import('@/views/AppConfig/CloudPlay/index.vue'),
        name: 'CloudPlay',
        meta: {
          title: '云点播',
        },
      },
      // 支付
      {
        path: '/AppConfig/Pay',
        component: () => import('@/views/AppConfig/Pay/index.vue'),
        name: 'Pay',
        meta: {
          title: '支付',
        },
      },
      // 客服
      {
        path: '/AppConfig/Service',
        component: () => import('@/views/AppConfig/Service/index.vue'),
        name: 'Service',
        meta: {
          title: '客服',
        },
      },
      // 用户协议
      {
        path: '/AppConfig/Protocol',
        component: () => import('@/views/AppConfig/Protocol/index.vue'),
        name: 'Protocol',
        meta: {
          title: '用户协议',
        },
      },
    ],
  },
  // 人员管理
  {
    path: '/PeopleManager',
    component: BaseLayout,
    name: 'PeopleManager',
    meta: {
      title: '人员管理',
      icon: 'UserOutlined',
    },
    redirect: '/PeopleManager/UserManager',
    children: [
      // 用户管理
      {
        path: '/PeopleManager/UserManager',
        component: () => import('@/views/PeopleManager/UserManager/index.vue'),
        name: 'UserManager',
        meta: {
          title: '用户管理',
        },
      },
      // 会员管理
      {
        path: '/PeopleManager/MemberManager',
        component: () =>
          import('@/views/PeopleManager/MemberManager/index.vue'),
        name: 'MemberManager',
        meta: {
          title: '会员管理',
        },
      },
    ],
  },
  // 日志管理
  {
    path: '/LogManager',
    component: BaseLayout,
    name: 'LogManager',
    meta: {
      title: '日志管理',
      icon: 'FileTextOutlined',
    },
    redirect: '/LogManager/UserLog',
    children: [
      // 用户日志
      {
        path: '/LogManager/UserLog',
        component: () => import('@/views/LogManager/UserLog.vue'),
        name: 'UserLog',
        meta: {
          title: '用户日志',
        },
      },
      // 会员余额变动记录
      {
        path: '/LogManager/MemberBalanceChangeRecord',
        component: () =>
          import('@/views/LogManager/MemberBalanceChangeRecord.vue'),
        name: 'MemberBalanceChangeRecord',
        meta: {
          title: '会员余额变动记录',
        },
      },
      // 会员积分变动记录
      {
        path: '/LogManager/MemberScoreChangeRecord',
        component: () =>
          import('@/views/LogManager/MemberScoreChangeRecord.vue'),
        name: 'MemberScoreChangeRecord',
        meta: {
          title: '会员积分变动记录',
        },
      },
      // 会员购剧记录
      {
        path: '/LogManager/MemberBuyRecord',
        component: () => import('@/views/LogManager/MemberBuyRecord.vue'),
        name: 'MemberBuyRecord',
        meta: {
          title: '会员购剧记录',
        },
      },
      // 会员观看记录
      {
        path: '/LogManager/MemberViewingRecord',
        component: () => import('@/views/LogManager/MemberViewingRecord.vue'),
        name: 'MemberViewingRecord',
        meta: {
          title: '会员观看记录',
        },
      },
      // 会员追剧记录
      {
        path: '/LogManager/MemberCatchRecord',
        component: () => import('@/views/LogManager/MemberCatchRecord.vue'),
        name: 'MemberCatchRecord',
        meta: {
          title: '会员追剧记录',
        },
      },
      // 广告观看或下单记录
      {
        path: '/LogManager/AdwatchOrOrderRecord',
        component: () => import('@/views/LogManager/AdwatchOrOrderRecord.vue'),
        name: 'AdwatchOrOrderRecord',
        meta: {
          title: '广告观看或下单记录',
        },
      },
    ],
  },
  // 订单管理
  {
    path: '/OrderManager',
    component: BaseLayout,
    name: 'OrderManager',
    meta: {
      title: '订单管理',
      icon: 'UnorderedListOutlined',
    },
    redirect: '/OrderManager/MemberBuyOrder',
    children: [
      // 会员购买订单
      {
        path: '/OrderManager/MemberBuyOrder',
        component: () =>
          import('@/views/OrderManager/MemberBuyOrder/index.vue'),
        name: 'MemberBuyOrder',
        meta: {
          title: '会员购买订单',
        },
      },
      // 导出订单
      {
        path: '/OrderManager/DownloadOrder',
        component: () => import('@/views/OrderManager/DownloadOrder/index.vue'),
        name: 'DownloadOrder',
        meta: {
          title: '导出订单',
        },
      },
    ],
  },
  // 影片管理
  {
    path: '/VideoManager',
    component: BaseLayout,
    name: 'VideoManager',
    meta: {
      title: '影片管理',
      icon: 'VideoCameraOutlined',
    },
    redirect: '/VideoManager/VideoShowClass',
    children: [
      // 视频展示类别
      {
        path: '/VideoManager/VideoShowClass',
        component: () =>
          import('@/views/VideoManager/VideoShowClass/index.vue'),
        name: 'VideoShowClass',
        meta: {
          title: '视频展示类别',
        },
      },
      // 视频演员角色
      {
        path: '/VideoManager/VideoActor',
        component: () => import('@/views/VideoManager/VideoActor/index.vue'),
        name: 'VideoActor',
        meta: {
          title: '视频演员角色',
        },
      },
      // 视频合集大类
      {
        path: '/VideoManager/VideoLargeClass',
        component: () =>
          import('@/views/VideoManager/VideoLargeClass/index.vue'),
        name: 'VideoLargeClass',
        meta: {
          title: '视频合集大类',
        },
      },
      // 视频合集小类
      {
        path: '/VideoManager/VideoSmallClass',
        component: () =>
          import('@/views/VideoManager/VideoSmallClass/index.vue'),
        name: 'VideoSmallClass',
        meta: {
          title: '视频合集小类',
        },
      },
      // 视频合集
      {
        path: '/VideoManager/VideoCollection',
        component: () =>
          import('@/views/VideoManager/VideoCollection/index.vue'),
        name: 'VideoCollection',
        meta: {
          title: '视频合集',
        },
      },
    ],
  },
  // 积分管理
  {
    path: '/ScoreManager',
    component: BaseLayout,
    name: 'ScoreManager',
    meta: {
      title: '积分管理',
      icon: 'SketchOutlined',
    },
    children: [
      {
        path: '',
        name: 'Default',
        component: () => import('@/views/ScoreManager/index.vue'),
      },
    ],
  },
]
*/
