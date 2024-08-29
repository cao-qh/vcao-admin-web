// 布局组件
import Layout from '@/layout/index.vue'

// 对外暴漏配置路由(常量路由)
export const constantRoute = [
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
    },
  },
  // 测试
  {
    path: '/test',
    component: Layout,
    name: 'Test',
    meta: {
      title: '测试',
      icon: 'ExperimentOutlined',
    },
    children: [
      {
        path: '/test/test1',
        component: () => import('@/views/test/index.vue'),
        name: 'Test1',
        meta: {
          title: '测试1',
        },
      },
    ],
  },
  // 登录成功以后展示数据的路由
  {
    path: '/',
    component: Layout,
    name: 'layout',
    redirect: '/dashboard',
    meta: {
      title: '仪表盘',
      icon: 'DashboardOutlined',
    },
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
      },
    ],
  },
  // 数据表格
  {
    path: '/table',
    component: Layout,
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
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
    },
  },
]
