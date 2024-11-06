// 统一管理咱们项目用户相关的接口
import request from '@/utils/request'

// 统一管理接口
enum API {
  // 查询
  searchUrl = '/pc/huiyuan/dingdanxiangqing/selectDowOrderPC',
}

// 查询
export const reqSearch = () => request.post<any, any>(API.searchUrl)
