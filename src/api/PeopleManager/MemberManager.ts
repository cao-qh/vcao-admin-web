// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 查询
  searchUrl = '/pc/huiyuan/selectAll',
  // 启禁用
  enableUrl = '/pc/huiyuan/qijinyong',
  // 添加
  addUrl = '/pc/huiyuan/add',
  // 修改
  editUrl = '/pc/huiyuan/xiugai',
}

// 查询
export const reqSearch = (data: any) =>
  request.post<any, any>(API.searchUrl, obj2Query(data))

// 启禁用
export const reqEnable = (data: any) =>
  request.post<any, any>(API.enableUrl, obj2Query(data))

// 添加
export const reqAdd = (data: any) => request.post<any, any>(API.addUrl, data)

// 修改
export const reqEdit = (data: any) =>
  request.post<any, any>(API.editUrl, obj2Query(data))
