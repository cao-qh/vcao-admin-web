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
        name: 'AdminLogin',
        meta: {
          title: '管理员登录',
        },
      },
    ],
  },
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

// 管理员路由
export const asyncRoute = [
  // 系统管理
  {
    path: '/AppConfig',
    component: BaseLayout,
    name: 'AppConfig',
    meta: {
      title: '应用配置',
      icon: 'SettingOutlined',
    },
    redirect: '/AppConfig/Protocol',
    children: [
      // 用户协议
      {
        path: '/AppConfig/Protocol',
        component: () => import('@/views/AppConfig/Protocol/index.vue'),
        name: 'Protocol',
        meta: {
          title: '用户协议',
        },
      },
      // 首页设置
      {
        path: '/AppConfig/HomeSetting',
        component: () => import('@/views/AppConfig/HomeSetting/index.vue'),
        name: 'HomeSetting',
        meta: {
          title: '首页设置',
        },
      },
    ],
  },
]
