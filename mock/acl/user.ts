// 创建用户数据
function createUserList() {
  const data = [
    {
      id: 1,
      username: 'admin',
      name: '超级管理员',
      roleName: '超级管理员',
      createTime: '2024-01-01 10:00:00',
      updateTime: '2024-01-15 14:30:00',
    },
    {
      id: 2,
      username: 'system',
      name: '系统管理员',
      roleName: '系统管理员',
      createTime: '2024-01-02 09:15:00',
      updateTime: '2024-01-10 11:20:00',
    },
    {
      id: 3,
      username: 'content',
      name: '内容管理员',
      roleName: '内容管理员',
      createTime: '2024-01-03 14:30:00',
      updateTime: '2024-01-12 16:45:00',
    },
    {
      id: 4,
      username: 'useradmin',
      name: '用户管理员',
      roleName: '用户管理员',
      createTime: '2024-01-04 08:45:00',
      updateTime: '2024-01-08 10:15:00',
    },
    {
      id: 5,
      username: 'operator',
      name: '运营人员',
      roleName: '运营人员',
      createTime: '2024-01-05 13:20:00',
      updateTime: '2024-01-14 15:30:00',
    },
    {
      id: 6,
      username: 'auditor',
      name: '审核人员',
      roleName: '审核人员',
      createTime: '2024-01-06 11:10:00',
      updateTime: '2024-01-13 14:25:00',
    },
    {
      id: 7,
      username: 'support',
      name: '客服人员',
      roleName: '客服人员',
      createTime: '2024-01-07 15:40:00',
      updateTime: '2024-01-09 09:55:00',
    },
    {
      id: 8,
      username: 'finance',
      name: '财务人员',
      roleName: '财务人员',
      createTime: '2024-01-08 10:30:00',
      updateTime: '2024-01-11 13:45:00',
    },
    {
      id: 9,
      username: 'analyst',
      name: '数据分析师',
      roleName: '数据分析师',
      createTime: '2024-01-09 14:15:00',
      updateTime: '2024-01-16 17:20:00',
    },
    {
      id: 10,
      username: 'tester',
      name: '测试人员',
      roleName: '测试人员',
      createTime: '2024-01-10 09:00:00',
      updateTime: '2024-01-15 16:35:00',
    },
    {
      id: 11,
      username: 'developer',
      name: '开发人员',
      roleName: '开发人员',
      createTime: '2024-01-11 14:30:00',
      updateTime: '2024-01-17 10:20:00',
    },
    {
      id: 12,
      username: 'designer',
      name: '设计师',
      roleName: '设计师',
      createTime: '2024-01-12 11:15:00',
      updateTime: '2024-01-18 15:45:00',
    },
    {
      id: 13,
      username: 'manager',
      name: '项目经理',
      roleName: '项目经理',
      createTime: '2024-01-13 09:30:00',
      updateTime: '2024-01-19 14:10:00',
    },
    {
      id: 14,
      username: 'marketer',
      name: '市场专员',
      roleName: '市场专员',
      createTime: '2024-01-14 16:20:00',
      updateTime: '2024-01-20 11:35:00',
    },
    {
      id: 15,
      username: 'sales',
      name: '销售人员',
      roleName: '销售人员',
      createTime: '2024-01-15 13:45:00',
      updateTime: '2024-01-21 09:50:00',
    },
  ]
  return data
}

// 模拟数据存储（用于添加、更新、删除操作）
const userDataStore = createUserList()

// 获取全部用户接口
export default [
  {
    url: '/api/admin/acl/user/:page/:limit',
    method: 'get',
    response: (request: any) => {
      const page = parseInt(request.query.page) || 1
      const limit = parseInt(request.query.limit) || 10
      const username = request.query.username || ''

      // 过滤数据
      let filteredData = userDataStore
      if (username) {
        filteredData = filteredData.filter((user: any) =>
          user.username.includes(username),
        )
      }

      // 分页处理
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedData = filteredData.slice(startIndex, endIndex)

      return {
        code: 200,
        message: '获取用户列表成功',
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
  // 添加用户接口
  {
    url: '/api/user/add',
    method: 'post',
    response: ({ body }: { body: any }) => {
      const newUser = {
        id: Date.now(),
        username: body.username,
        name: body.name,
        roleName: body.roleName || '普通用户',
        createTime: new Date().toLocaleString('zh-CN'),
        updateTime: new Date().toLocaleString('zh-CN'),
      }

      userDataStore.push(newUser)

      return {
        code: 200,
        message: '添加用户成功',
        ok: true,
        data: newUser,
      }
    },
  },
  // 更新用户接口
  {
    url: '/api/admin/acl/user/update',
    method: 'put',
    response: ({ body }: { body: any }) => {
      const index = userDataStore.findIndex((user: any) => user.id === body.id)

      if (index !== -1) {
        userDataStore[index] = {
          ...userDataStore[index],
          username: body.username,
          name: body.name,
          roleName: body.roleName,
          updateTime: new Date().toLocaleString('zh-CN'),
        }

        return {
          code: 200,
          message: '更新用户成功',
          ok: true,
          data: userDataStore[index],
        }
      } else {
        return {
          code: 404,
          message: '用户不存在',
          ok: false,
        }
      }
    },
  },
  // 删除单个用户接口
  {
    url: '/api/admin/acl/user/remove/:id',
    method: 'delete',
    response: (request: any) => {
      // 从URL参数中获取ID
      const id = parseInt(request.query.id)

      const index = userDataStore.findIndex((user: any) => user.id === id)

      if (index !== -1) {
        userDataStore.splice(index, 1)
        return {
          code: 200,
          message: '删除用户成功',
          ok: true,
        }
      } else {
        return {
          code: 404,
          message: '用户不存在',
          ok: false,
        }
      }
    },
  },
  // 批量删除用户接口
  {
    url: '/api/admin/acl/user/batchRemove',
    method: 'delete',
    response: ({ body }: { body: any }) => {
      const idList = body

      if (!Array.isArray(idList) || idList.length === 0) {
        return {
          code: 400,
          message: '请选择要删除的用户',
          ok: false,
        }
      }

      let deletedCount = 0
      for (let i = userDataStore.length - 1; i >= 0; i--) {
        if (idList.includes(userDataStore[i].id)) {
          userDataStore.splice(i, 1)
          deletedCount++
        }
      }

      if (deletedCount > 0) {
        return {
          code: 200,
          message: `成功删除 ${deletedCount} 个用户`,
          ok: true,
        }
      } else {
        return {
          code: 404,
          message: '未找到要删除的用户',
          ok: false,
        }
      }
    },
  },
  // 获取用户角色信息接口
  {
    url: '/api/admin/acl/user/toAssign/:userId',
    method: 'get',
    response: (request: any) => {
      const userId = parseInt(request.query.userId)

      // 模拟角色数据（这里应该从角色存储中获取）
      const allRolesList = [
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
      ]

      // 查找用户当前角色
      const user = userDataStore.find((u: any) => u.id === userId)
      const assignRoles = user
        ? [
            {
              id:
                allRolesList.findIndex((r) => r.roleName === user.roleName) + 1,
              roleName: user.roleName,
            },
          ]
        : []

      return {
        code: 200,
        message: '获取角色信息成功',
        ok: true,
        data: {
          assignRoles,
          allRolesList,
        },
      }
    },
  },
  // 分配角色接口
  {
    url: '/api/admin/acl/user/doAssignRole',
    method: 'post',
    response: ({ body }: { body: any }) => {
      const { userId, roleIdList } = body

      if (!userId || !roleIdList || roleIdList.length === 0) {
        return {
          code: 400,
          message: '参数错误',
          ok: false,
        }
      }

      const userIndex = userDataStore.findIndex(
        (user: any) => user.id === userId,
      )
      if (userIndex === -1) {
        return {
          code: 404,
          message: '用户不存在',
          ok: false,
        }
      }

      // 模拟角色数据
      const roles = [
        { id: 1, roleName: '超级管理员' },
        { id: 2, roleName: '系统管理员' },
        { id: 3, roleName: '内容管理员' },
        { id: 4, roleName: '用户管理员' },
        { id: 5, roleName: '运营人员' },
      ]

      const assignedRole = roles.find((role: any) => role.id === roleIdList[0])
      if (assignedRole) {
        userDataStore[userIndex].roleName = assignedRole.roleName
        userDataStore[userIndex].updateTime = new Date().toLocaleString('zh-CN')

        return {
          code: 200,
          message: '分配角色成功',
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
]
