// 创建角色数据
function createRoleList() {
  const data = [
    {
      id: 1,
      roleName: '超级管理员',
      createTime: '2024-01-01 10:00:00',
      updateTime: '2024-01-15 14:30:00',
    },
    {
      id: 2,
      roleName: '系统管理员',
      createTime: '2024-01-02 09:15:00',
      updateTime: '2024-01-10 11:20:00',
    },
    {
      id: 3,
      roleName: '内容管理员',
      createTime: '2024-01-03 14:30:00',
      updateTime: '2024-01-12 16:45:00',
    },
    {
      id: 4,
      roleName: '用户管理员',
      createTime: '2024-01-04 08:45:00',
      updateTime: '2024-01-08 10:15:00',
    },
    {
      id: 5,
      roleName: '运营人员',
      createTime: '2024-01-05 13:20:00',
      updateTime: '2024-01-14 15:30:00',
    },
    {
      id: 6,
      roleName: '审核人员',
      createTime: '2024-01-06 11:10:00',
      updateTime: '2024-01-13 14:25:00',
    },
    {
      id: 7,
      roleName: '客服人员',
      createTime: '2024-01-07 15:40:00',
      updateTime: '2024-01-09 09:55:00',
    },
    {
      id: 8,
      roleName: '财务人员',
      createTime: '2024-01-08 10:30:00',
      updateTime: '2024-01-11 13:45:00',
    },
    {
      id: 9,
      roleName: '数据分析师',
      createTime: '2024-01-09 14:15:00',
      updateTime: '2024-01-16 17:20:00',
    },
    {
      id: 10,
      roleName: '测试人员',
      createTime: '2024-01-10 09:00:00',
      updateTime: '2024-01-15 16:35:00',
    },
  ]
  return data
}

// 模拟数据存储（用于添加、更新、删除操作）
const roleDataStore = createRoleList()

// 获取全部角色接口
export default [
  {
    url: '/api/admin/acl/role/:page/:limit',
    method: 'get',
    response: (request: any) => {
      const page = parseInt(request.query.page) || 1
      const limit = parseInt(request.query.limit) || 10
      const roleName = request.query.roleName || ''

      // 过滤数据
      let filteredData = roleDataStore
      if (roleName) {
        filteredData = filteredData.filter((role: any) =>
          role.roleName.includes(roleName),
        )
      }

      // 分页处理
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedData = filteredData.slice(startIndex, endIndex)

      return {
        code: 200,
        message: '获取角色列表成功',
        ok: true,
        data: {
          records: paginatedData,
          total: filteredData.length,
          size: limit,
          current: page,
          pages: Math.ceil(filteredData.length / limit),
        },
      }
    },
  },
  // 添加角色接口
  {
    url: '/api/admin/acl/role/save',
    method: 'post',
    response: ({ body }: { body: any }) => {
      const newRole = {
        id: Date.now(),
        roleName: body.roleName,
        createTime: new Date().toLocaleString('zh-CN'),
        updateTime: new Date().toLocaleString('zh-CN'),
      }

      roleDataStore.push(newRole)

      return {
        code: 200,
        message: '添加角色成功',
        ok: true,
        data: newRole,
      }
    },
  },
  // 更新角色接口
  {
    url: '/api/admin/acl/role/update',
    method: 'put',
    response: ({ body }: { body: any }) => {
      const index = roleDataStore.findIndex((role: any) => role.id === body.id)

      if (index !== -1) {
        roleDataStore[index] = {
          ...roleDataStore[index],
          roleName: body.roleName,
          updateTime: new Date().toLocaleString('zh-CN'),
        }

        return {
          code: 200,
          message: '更新角色成功',
          ok: true,
          data: roleDataStore[index],
        }
      } else {
        return {
          code: 404,
          message: '角色不存在',
          ok: false,
        }
      }
    },
  },
  // 删除角色接口
  {
    url: '/api/admin/acl/role/remove/:id',
    method: 'delete',
    response: (request: any) => {
      // 从URL参数中获取ID
      const id = parseInt(request.query.id)

      const index = roleDataStore.findIndex((role: any) => role.id === id)

      if (index !== -1) {
        roleDataStore.splice(index, 1)
        return {
          code: 200,
          message: '删除角色成功',
          ok: true,
        }
      } else {
        return {
          code: 404,
          message: '角色不存在',
          ok: false,
        }
      }
    },
  },
  // 获取角色权限菜单接口
  {
    url: '/api/admin/acl/permission/toAssign/:roleId',
    method: 'get',
    response: (request: any) => {
      const roleId = parseInt(request.query.roleId)

      // 这里返回菜单数据，实际项目中可能需要根据角色ID返回不同的权限数据
      // 为了简化，我们返回固定的菜单数据
      const menuData = [
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
          select: roleId === 1, // 超级管理员默认选中
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
              select: roleId === 1,
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
                  select: roleId === 1,
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
                      select: roleId === 1,
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
                      select: roleId === 1,
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
              select: roleId === 1,
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
                  select: roleId === 1,
                  children: [],
                },
              ],
            },
          ],
        },
      ]

      return {
        code: 200,
        message: '获取权限菜单成功',
        ok: true,
        data: menuData,
      }
    },
  },
  // 分配权限接口
  {
    url: '/api/admin/acl/permission/doAssign',
    method: 'post',
    response: (request: any) => {
      const roleId = request.query.roleId
      const permissionId = request.query.permissionId

      // 这里模拟分配权限成功
      // 实际项目中可能需要更新数据库中的角色权限关系

      return {
        code: 200,
        message: '分配权限成功',
        ok: true,
        data: {
          roleId,
          permissionId,
        },
      }
    },
  },
]
