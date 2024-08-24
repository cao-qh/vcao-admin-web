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
  // {
  //   path: '/test',
  //   component: Layout,
  //   name: 'Test',
  //   meta: {
  //     title: '测试',
  //     icon: 'ExperimentOutlined',
  //   },
  //   children: [
  //     {
  //       path: '/test/test1',
  //       component: () => import('@/views/test/index.vue'),
  //       name: 'Test1',
  //       meta: {
  //         title: '测试1',
  //       },
  //     },
  //   ],
  // },
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
  // 数据大屏
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      title: '数据大屏',
      icon: 'FundProjectionScreenOutlined',
    },
  },
  // 权限管理
  {
    path: '/acl',
    component: Layout,
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
  // 可视化设计
  {
    path: '/visual',
    component: Layout,
    name: 'Visual',
    meta: {
      title: '可视化设计',
      icon: 'TableOutlined',
    },
    children: [
      {
        path: '/visual/design',
        component: () => import('@/views/visual/index.vue'),
        name: 'VisualDesign',
        meta: {
          title: '可视化设计',
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
    component: Layout,
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
  // 商品管理
  {
    path: '/product',
    component: Layout,
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'ShoppingOutlined',
    },
    redirect: '/product/tradeMark',
    children: [
      // 品牌管理
      {
        path: '/product/tradeMark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
        },
      },
      // spu管理
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
        },
      },
      // sku管理
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
        },
      },
      // 属性管理
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
        },
      },
    ],
  },
]
