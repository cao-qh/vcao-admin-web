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
    children: [
      // 管理员登录
      {
        path: '/user/admin/login',
        component: () => import('@/views/admin/user/login/index.vue'),
        name: 'AdminLogin',
        meta: {
          title: '管理员登录',
        },
      },
      // 代理员登录
      {
        path: '/user/agent/login',
        component: () => import('@/views/agent/user/login/index.vue'),
        name: 'AgentLogin',
        meta: {
          title: '代理员登录',
        },
      },
    ],
  },
  // 测试
  // {
  //   path: '/',
  //   component: BaseLayout,
  //   name: 'Home',
  //   meta: {
  //     title: '测试',
  //     icon: 'ExperimentOutlined',
  //   },
  //   redirect: '/test',
  //   children: [
  //     {
  //       path: '/test',
  //       component: () => import('@/views/test/index.vue'),
  //       name: 'Test',
  //       meta: {
  //         title: '测试',
  //       },
  //     },
  //   ],
  // },
  // 数据表格
  // {
  //   path: '/table',
  //   component: BaseLayout,
  //   name: 'Table',
  //   meta: {
  //     title: '数据表格',
  //     icon: 'TableOutlined',
  //   },
  //   redirect: '/table/search',
  //   children: [
  //     // 查询表格
  //     {
  //       path: '/table/search',
  //       component: () => import('@/views/table/search/index.vue'),
  //       name: 'Search',
  //       meta: {
  //         title: '查询表格',
  //       },
  //     },
  //   ],
  // },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
    },
  },
]

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
  redirect: '/personal/info',
  children: [
    // 个人信息
    {
      path: '/personal/info',
      component: () => import('@/views/admin/personal/info/index.vue'),
      name: 'PersonalInfo',
      meta: {
        title: '个人信息',
      },
    },
    // 个人日志
    {
      path: '/personal/logs',
      component: () => import('@/views/admin/personal/logs/index.vue'),
      name: 'PersonalLogs',
      meta: {
        title: '个人日志',
      },
    },
  ],
}

// 管理员路由
export const adminRoute = [
  // 系统管理
  {
    path: '/system',
    component: BaseLayout,
    name: 'System',
    meta: {
      title: '系统管理',
      icon: 'SettingOutlined',
    },
    redirect: '/system/interface',
    children: [
      // 接口模板
      {
        path: '/system/interface',
        component: () => import('@/views/admin/system/interface/index.vue'),
        name: 'Interface',
        meta: {
          title: '接口模板',
        },
      },
      // 参数模板
      {
        path: '/system/params',
        component: () => import('@/views/admin/system/params/index.vue'),
        name: 'Params',
        meta: {
          title: '参数模板',
        },
      },
      // 管理员日志
      {
        path: '/system/admin-logs',
        component: () => import('@/views/admin/system/admin-logs/index.vue'),
        name: 'AdminLogs',
        meta: {
          title: '管理员日志',
        },
      },
      // 代理员日志
      {
        path: '/system/agent-logs',
        component: () => import('@/views/admin/system/agent-logs/index.vue'),
        name: 'AgentLogs',
        meta: {
          title: '代理员日志',
        },
      },
    ],
  },
  // 渠道管理
  {
    path: '/channel',
    component: BaseLayout,
    name: 'Channel',
    meta: {
      title: '渠道管理',
      icon: 'TeamOutlined',
    },
    redirect: '/channel/admin',
    children: [
      // 管理员管理
      {
        path: '/channel/admin',
        component: () => import('@/views/admin/channel/admin/index.vue'),
        name: 'Admin',
        meta: {
          title: '管理员管理',
        },
      },
      // 代理员管理
      {
        path: '/channel/agent',
        component: () => import('@/views/admin/channel/agent/index.vue'),
        name: 'Agent',
        meta: {
          title: '代理员管理',
        },
      },
      // 上游渠道商
      {
        path: '/channel/up-channel',
        component: () => import('@/views/admin/channel/up-channel/index.vue'),
        name: 'UpChannel',
        meta: {
          title: '上游渠道商',
        },
      },
    ],
  },
  // 订单管理
  {
    path: '/order',
    component: BaseLayout,
    name: 'Order',
    meta: {
      title: '订单管理',
      icon: 'UnorderedListOutlined',
    },
    redirect: '/order/list',
    children: [
      // 订单列表
      {
        path: '/order/list',
        component: () => import('@/views/admin/order/index.vue'),
        name: 'OrderList',
        meta: {
          title: '订单列表',
        },
      },
    ],
  },
  // 套餐管理
  {
    path: '/goods',
    component: BaseLayout,
    name: 'Goods',
    meta: {
      title: '套餐管理',
      icon: 'StarOutlined',
    },
    redirect: '/goods/list',
    children: [
      // 商品列表
      {
        path: '/goods/list',
        component: () => import('@/views/admin/goods/index.vue'),
        name: 'GoodsList',
        meta: {
          title: '套餐列表',
        },
      },
    ],
  },
  // 统计分析
  {
    path: '/statistics',
    component: BaseLayout,
    name: 'Statistics',
    meta: {
      title: '统计分析',
      icon: 'BarChartOutlined',
    },
    redirect: '/statistics/collect',
    children: [
      // 汇总统计
      {
        path: '/statistics/collect',
        component: () => import('@/views/admin/statistics/collect/index.vue'),
        name: 'Collect',
        meta: {
          title: '汇总统计',
        },
      },
      // 日统计
      {
        path: '/statistics/day_collect',
        component: () =>
          import('@/views/admin/statistics/day_collect/index.vue'),
        name: 'DayCollect',
        meta: {
          title: '日统计',
        },
      },
    ],
  },
  // 下载管理
  {
    path: '/download',
    component: BaseLayout,
    name: 'Download',
    meta: {
      title: '下载管理',
      icon: 'DownloadOutlined',
    },
    redirect: '/download/list',
    children: [
      // 下载列表
      {
        path: '/download/list',
        component: () => import('@/views/admin/download/index.vue'),
        name: 'DownloadList',
        meta: {
          title: '下载列表',
        },
      },
    ],
  },
]

// 代理路由
export const agentRoute = [
  // 订单管理
  {
    path: '/',
    component: BaseLayout,
    name: 'Order',
    meta: {
      title: '订单管理',
      icon: 'UnorderedListOutlined',
    },
    redirect: '/order/list',
    children: [
      // 订单列表
      {
        path: '/order/list',
        component: () => import('@/views/agent/order/index.vue'),
        name: 'OrderList',
        meta: {
          title: '订单列表',
        },
      },
    ],
  },
  // 套餐管理
  {
    path: '/goods',
    component: BaseLayout,
    name: 'Goods',
    meta: {
      title: '套餐管理',
      icon: 'StarOutlined',
    },
    redirect: '/goods/list',
    children: [
      // 商品列表
      {
        path: '/goods/list',
        component: () => import('@/views/agent/goods/index.vue'),
        name: 'GoodsList',
        meta: {
          title: '套餐列表',
        },
      },
    ],
  },
  // 统计分析
  {
    path: '/statistics',
    component: BaseLayout,
    name: 'Statistics',
    meta: {
      title: '统计分析',
      icon: 'BarChartOutlined',
    },
    redirect: '/statistics/collect',
    children: [
      // 汇总统计
      {
        path: '/statistics/collect',
        component: () => import('@/views/agent/statistics/collect/index.vue'),
        name: 'Collect',
        meta: {
          title: '汇总统计',
        },
      },
      // 日统计
      {
        path: '/statistics/day_collect',
        component: () =>
          import('@/views/agent/statistics/day_collect/index.vue'),
        name: 'DayCollect',
        meta: {
          title: '日统计',
        },
      },
    ],
  },
  // 下载管理
  {
    path: '/download',
    component: BaseLayout,
    name: 'Download',
    meta: {
      title: '下载管理',
      icon: 'DownloadOutlined',
    },
    redirect: '/download/list',
    children: [
      // 下载列表
      {
        path: '/download/list',
        component: () => import('@/views/admin/download/index.vue'),
        name: 'DownloadList',
        meta: {
          title: '下载列表',
        },
      },
    ],
  },
  // 个人管理
  {
    path: '/personal',
    component: BaseLayout,
    name: 'Personal',
    meta: {
      title: '个人管理',
      icon: 'UserOutlined',
    },
    redirect: '/personal/info',
    children: [
      // 个人信息
      {
        path: '/personal/info',
        component: () => import('@/views/agent/personal/info/index.vue'),
        name: 'PersonalInfo',
        meta: {
          title: '个人信息',
        },
      },
      // API信息
      {
        path: '/personal/api',
        component: () => import('@/views/agent/personal/api/index.vue'),
        name: 'PersonalApi',
        meta: {
          title: 'API信息',
        },
      },
      // 个人日志
      {
        path: '/personal/log',
        component: () => import('@/views/agent/personal/logs/index.vue'),
        name: 'PersonalLog',
        meta: {
          title: '个人日志',
        },
      },
    ],
  },
]
