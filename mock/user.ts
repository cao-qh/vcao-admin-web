//用户信息数据
function createUserList() {
  // 1 是管理员 ，2 是代理
  return [
    {
      userId: 1,
      username: 'admin',
      password: 'admin',
      desc: '平台管理员',
      role: 1,
      // roles: ['平台管理员'],
      // buttons: ['cuser.detail'],
      // routes: ['home'],
      token: 'Admin Token',
    },
    {
      userId: 2,
      username: 'agent',
      password: 'agent',
      desc: '平台代理员',
      role: 2,
      // roles: ['平台代理员'],
      // buttons: ['cuser.detail', 'cuser.user'],
      // routes: ['home'],
      token: 'Agent Token',
    },
  ]
}

// 对外暴漏一个数组：数组里包含两个接口
// 登录假的接口
// 获取用户信息的假的接口
export default [
  // 管理员登录接口
  {
    url: '/api/admin/login', //请求地址
    method: 'post', //请求方式
    response: ({ body }) => {
      //获取请求体携带过来的用户名与密码
      const { username, password } = body
      //调用获取用户信息函数,用于判断是否有此用户
      const checkUser = createUserList().find((item) => {
        if (
          item.username === username &&
          item.password === password &&
          item.role === 1
        ) {
          return true
        }
      })
      //没有用户返回失败信息
      if (!checkUser) {
        return {
          code: -1,
          message: '账号或者密码不正确',
        }
      }
      //如果有返回成功信息
      const { token } = checkUser
      return { code: 0, data: { token } }
    },
  },
  // 获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response: (request) => {
      //获取请求头携带token
      const token = request.headers.token
      //查看用户信息是否包含有次token用户
      const checkUser = createUserList().find((item) => item.token === token)
      //没有返回失败的信息
      if (!checkUser) {
        return { code: 201, data: { message: '获取用户信息失败' } }
      }
      //如果有返回成功信息
      return { code: 200, data: { checkUser } }
    },
  },

  // 代理登录接口
  {
    url: '/api/agent/login', //请求地址
    method: 'post', //请求方式
    response: ({ body }) => {
      //获取请求体携带过来的用户名与密码
      const { username, password } = body
      //调用获取用户信息函数,用于判断是否有此用户
      const checkUser = createUserList().find((item) => {
        if (
          item.username === username &&
          item.password === password &&
          item.role === 2
        ) {
          return true
        }
      })
      //没有用户返回失败信息
      if (!checkUser) {
        return {
          code: -1,
          message: '账号或者密码不正确',
        }
      }
      //如果有返回成功信息
      const { token } = checkUser
      return { code: 0, data: { token } }
    },
  },
]
