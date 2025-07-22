// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 查询
  searchUrl = '/pc/huiyuan/dingdanxiangqing/selectAll',
  // 导出
  exportUrl = '/pc/huiyuan/dingdanxiangqing/downDingDan',
}

// 查询
export const reqSearch = (data: any) =>
  request.post<any, any>(API.searchUrl, obj2Query(data))

// 导出
export const reqExport = (data: any) =>
  request.post<any, any>(API.exportUrl, obj2Query(data))
