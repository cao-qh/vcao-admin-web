import Mock from 'mockjs'

// 创建菜单数据
function createMenuList() {
  const data = [
    {
      id: 1,
      createTime: '2024-01-01 10:00:00',
      updateTime: '2024-01-15 14:30:00',
      pid: 0,
      name: '系统管理',
      code: 'system',
      toCode: null,
      type: 1,
      status: null,
      level: 1,
      select: false,
      children: [
        {
          id: 2,
          createTime: '2024-01-01 11:00:00',
          updateTime: '2024-01-10 09:15:00',
          pid: 1,
          name: '用户管理',
          code: 'user:manage',
          toCode: null,
          type: 1,
          status: null,
          level: 2,
          select: false,
          children: [
            {
              id: 3,
              createTime: '2024-01-02 08:30:00',
              updateTime: '2024-01-12 16:45:00',
              pid: 2,
              name: '用户列表',
              code: 'user:list',
              toCode: null,
              type: 1,
              status: null,
              level: 3,
              select: false,
              children: [
                {
                  id: 4,
                  createTime: '2024-01-03 14:20:00',
                  updateTime: '2024-01-08 11:30:00',
                  pid: 3,
                  name: '添加用户',
                  code: 'user:add',
                  toCode: null,
                  type: 2,
                  status: null,
                  level: 4,
                  select: false,
                  children: [],
                },
                {
                  id: 5,
                  createTime: '2024-01-03 15:10:00',
                  updateTime: '2024-01-09 10:25:00',
                  pid: 3,
                  name: '编辑用户',
                  code: 'user:edit',
                  toCode: null,
                  type: 2,
                  status: null,
                  level: 4,
                  select: false,
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 6,
          createTime: '2024-01-01 12:00:00',
          updateTime: '2024-01-14 15:20:00',
          pid: 1,
          name: '角色管理',
          code: 'role:manage',
          toCode: null,
          type: 1,
          status: null,
          level: 2,
          select: false,
          children: [
            {
              id: 7,
              createTime: '2024-01-02 09:45:00',
              updateTime: '2024-01-13 14:10:00',
              pid: 6,
              name: '角色列表',
              code: 'role:list',
              toCode: null,
              type: 1,
              status: null,
              level: 3,
              select: false,
              children: [],
            },
          ],
        },
      ],
    },
  ]
  return data
}

// 模拟数据存储（用于添加、更新、删除操作）
const menuDataStore = createMenuList()

// 获取全部菜单接口
export default [
  {
    url: '/api/admin/acl/permission',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '获取菜单成功',
        ok: true,
        data: menuDataStore,
      }
    },
  },
  // 添加菜单接口
  {
    url: '/api/admin/acl/permission/save',
    method: 'post',
    response: ({ body }: { body: any }) => {
      const newMenu = {
        id: Date.now(),
        createTime: new Date().toLocaleString('zh-CN'),
        updateTime: new Date().toLocaleString('zh-CN'),
        pid: body.pid,
        name: body.name,
        code: body.code,
        toCode: null,
        type: body.level === 4 ? 2 : 1, // 4级为按钮，其他为菜单
        status: null,
        level: body.level,
        select: false,
        children: [],
      }

      // 递归查找父菜单并添加子菜单
      const addToParent = (menus: any[], pid: number, newItem: any) => {
        for (const menu of menus) {
          if (menu.id === pid) {
            if (!menu.children) {
              menu.children = []
            }
            menu.children.push(newItem)
            return true
          }
          if (menu.children && menu.children.length > 0) {
            if (addToParent(menu.children, pid, newItem)) {
              return true
            }
          }
        }
        return false
      }

      if (body.pid === 0) {
        // 添加到根目录
        menuDataStore.push(newMenu)
      } else {
        // 添加到父菜单
        addToParent(menuDataStore, body.pid, newMenu)
      }

      return {
        code: 200,
        message: '添加菜单成功',
        ok: true,
        data: newMenu,
      }
    },
  },
  // 更新菜单接口
  {
    url: '/api/admin/acl/permission/update',
    method: 'put',
    response: ({ body }: { body: any }) => {
      const updateMenu = (menus: any[]) => {
        for (let i = 0; i < menus.length; i++) {
          if (menus[i].id === body.id) {
            menus[i] = {
              ...menus[i],
              name: body.name,
              code: body.code,
              level: body.level,
              pid: body.pid,
              updateTime: new Date().toLocaleString('zh-CN'),
            }
            return true
          }
          if (menus[i].children && menus[i].children.length > 0) {
            if (updateMenu(menus[i].children)) {
              return true
            }
          }
        }
        return false
      }

      const updated = updateMenu(menuDataStore)

      if (updated) {
        return {
          code: 200,
          message: '更新菜单成功',
          ok: true,
        }
      } else {
        return {
          code: 404,
          message: '菜单不存在',
          ok: false,
        }
      }
    },
  },
  // 删除菜单接口
  {
    url: '/api/admin/acl/permission/remove/:id',
    method: 'delete',
    response: (request: any) => {
      // 从URL参数中获取ID
      const id = parseInt(request.query.id)

      const deleteMenu = (menus: any[]) => {
        for (let i = 0; i < menus.length; i++) {
          if (menus[i].id === id) {
            menus.splice(i, 1)
            return true
          }
          if (menus[i].children && menus[i].children.length > 0) {
            if (deleteMenu(menus[i].children)) {
              return true
            }
          }
        }
        return false
      }

      const deleted = deleteMenu(menuDataStore)

      if (deleted) {
        return {
          code: 200,
          message: '删除菜单成功',
          ok: true,
        }
      } else {
        return {
          code: 404,
          message: '菜单不存在',
          ok: false,
        }
      }
    },
  },
]
