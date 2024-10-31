//用户信息数据
function createUserList() {
  return [
    {
      userId: 1,
      username: 'admin',
      password: 'admin',
      desc: '平台管理员',
      // roles: ['平台管理员'],
      buttons: [
        'Btn.Protocol.Add',
        'Btn.Protocol.Update',
        'Btn.HomeSetting.Add',
        'Btn.HomeSetting.Update',
        'Btn.HomeSetting.Delete',
        'Btn.AdSetting.Add',
        'Btn.AdSetting.Update',
        'Swh.AdSetting.UpDown',
        'Btn.MemberOrder.Add',
        'Btn.MemberOrder.Update',
        'Swh.MemberOrder.UpDown',
        'Btn.VideoUnlock.Add',
        'Btn.VideoUnlock.Update',
        'Btn.CloudPlay.Add',
        'Btn.CloudPlay.UpdateParams',
        'Btn.Pay.UpdateParams',
        'Btn.Pay.Add',
        'Btn.UserManager.Add',
        'Btn.UserManager.Update',
        'Swh.UserManager.Enable',
        'Btn.UserManager.Permission',
        'Btn.MemberBuyOrder.Download',
        'Btn.VideoShowClass.Add',
        'Btn.VideoShowClass.Update',
        'Btn.VideoShowClass.Enable',
        'Btn.VideoShowClass.Delete',
        'Btn.VideoActor.Add',
        'Btn.VideoActor.Update',
        'Btn.VideoActor.Enable',
        'Btn.VideoLargeClass.Add',
        'Swh.VideoLargeClass.Enable',
        'Btn.VideoLargeClass.Update',
        'Btn.VideoSmallClass.Add',
        'Btn.VideoSmallClass.Update',
        'Swh.VideoSmallClass.Enable',
        'Btn.VideoCollection.Add',
        'Btn.VideoCollection.Update',
        'Btn.VideoCollection.Detail',
        'Btn.VideoCollection.UpDown',
        'Btn.VideoCollection.ConfigActor',
        'Btn.VideoCollection.ConfigClass',
        'Btn.VideoCollection.Chapter',
        'Btn.VideoCollection.Classify',
        'Btn.ViewScore.Delete',
        'Btn.ViewScore.Add',
        'Btn.ViewScore.Update',
        'Btn.AdScore.Add',
        'Btn.AdScore.Update',
        'Btn.AdScore.Delete',
      ],
      routes: [
        'AppConfig',
        'Protocol',
        'HomeSetting',
        'AdSetting',
        'MemberOrder',
        'VideoUnlock',
        'CloudPlay',
        'Pay',
        'PeopleManager',
        'UserManager',
        'MemberManager',
        'LogManager',
        'UserLog',
        'MemberBalanceChangeRecord',
        'MemberScoreChangeRecord',
        'MemberBuyRecord',
        'MemberViewingRecord',
        'MemberCatchRecord',
        'AdwatchOrOrderRecord',
        'OrderManager',
        'MemberBuyOrder',
        'VideoManager',
        'VideoShowClass',
        'VideoActor',
        'VideoLargeClass',
        'VideoSmallClass',
        'VideoCollection',
        'ScoreManager',
        'ScoreExchange',
        'SigninScore',
        'TreasureboxAndLottery',
        'ViewScore',
        'AdScore',
      ],
      token: 'Admin Token',
    },
  ]
}

// 对外暴漏一个数组：数组里包含两个接口
// 登录假的接口
// 获取用户信息的假的接口
export default [
  // 管理员登录接口
  {
    url: '/api/login', //请求地址
    method: 'post', //请求方式
    response: ({ body }) => {
      //获取请求体携带过来的用户名与密码
      const { username, password } = body
      //调用获取用户信息函数,用于判断是否有此用户
      const checkUser = createUserList().find((item) => {
        if (item.username === username && item.password === password) {
          return true
        }
      })
      //没有用户返回失败信息
      if (!checkUser) {
        return {
          code: -1,
          msg: '账号或者密码不正确',
        }
      }
      //如果有返回成功信息
      const { token } = checkUser
      return { code: 0, data: { token } }
    },
  },
  // 获取管理员信息
  {
    url: '/api/info',
    method: 'post',
    response: (request) => {
      //获取请求头携带token
      const token = request.headers.token
      //查看用户信息是否包含有次token用户
      const checkUser = createUserList().find((item) => item.token === token)
      //没有返回失败的信息
      if (!checkUser) {
        return { code: -1, data: { msg: '获取用户信息失败' } }
      }
      //如果有返回成功信息
      return {
        code: 0,
        data: {
          username: checkUser.username,
          routes: checkUser.routes,
          buttons: checkUser.buttons,
        },
      }
    },
  },
]
