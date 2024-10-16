import Mock from 'mockjs'

function createRecordList() {
  const data = Mock.mock({
    'list|26': [
      {
        'id|+1': 1,
        phone: '151@string("number", 8)',
        'mianzhi|1': ['10', '20', '30'],
        agentname: '@word(8)',
        'tongdao|1-3': 3,
        chongzhitime: '@datetime',
        fankuitime: '@datetime',
        'zhuangtai|1-4': 4,
        dingdanhao: '@guid',
        beizhu: '@csentence',
        address: '@county(true) 华融国际大厦',
        qijinyong: '@integer(1, 2)',
      },
    ],
  })
  return data.list
}

export default [
  // 查询数据
  {
    url: '/api/table/search',
    method: 'get',
    response: (request) => {
      //获取请求头携带token
      // const token = request.headers.token
      // if (!token) {
      //   return { code: 201, message: '请先登录' }
      // }
      const { currentPage, pageSize } = request.query

      const fulllist = createRecordList()
      const list = fulllist.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
      )
      const totalSize = fulllist.length
      const totalPage = Math.ceil(totalSize / pageSize)

      //如果有返回成功信息
      return {
        code: 0,
        message: '查询成功',
        data: {
          list,
          totalSize,
          totalPage,
          currentPage: +currentPage,
          pageSize: +pageSize,
        },
      }
    },
  },
  // 添加记录
  {
    url: '/api/table/add',
    method: 'post',
    response: () => {
      return {
        code: 0,
        msg: '添加成功',
      }
    },
  },
  // 批量导入
  {
    url: '/api/table/import',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '导入成功',
        data: {
          success: 10,
          error: 2,
        },
      }
    },
  },
  // 提单
  {
    url: '/api/table/submit',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '提单成功',
      }
    },
  },
  // 更换通道并提单
  {
    url: '/api/table/changeAndSubmit',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '更换通道并提单成功',
      }
    },
  },
  // 启禁用
  {
    url: '/api/table/qijinyong',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '操作成功',
      }
    },
  },
  // 详情
  {
    url: '/api/table/detail',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '查询成功',
        data: {
          id: 1,
          phone: '151@string("number", 8)',
          mianzhi: '10',
          agentname: '@word(8)',
          tongdao: 3,
          chongzhitime: '@datetime',
          fankuitime: '@datetime',
          zhuangtai: 4,
          dingdanhao: '@guid',
          beizhu: '@csentence',
          qijinyong: '@integer(1, 2)',
        },
      }
    },
  },
]
