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
      // 登录
      {
        path: '/user/login',
        component: () => import('@/views/user/login/index.vue'),
        name: 'Login',
        meta: {
          title: '登录',
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
        component: () => import('@/views/goods/index.vue'),
        name: 'List',
        meta: {
          title: '套餐列表',
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

// 异步路由
export const asyncRoute = [
  // 权限管理
  {
    path: '/acl',
    component: BaseLayout,
    name: 'Acl',
    meta: {
      title: '权限管理',
      icon: 'LockOutlined',
    },
    redirect: '/acl/user',
    children: [
      // 用户管理
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
        },
      },
      // 角色管理
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
        },
      },
      // 菜单管理
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
        },
      },
    ],
  },
]
