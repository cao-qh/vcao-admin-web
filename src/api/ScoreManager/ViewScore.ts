// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 查询
  searchUrl = '/pc/jiFenGuanLi/tKanjuJifen/getAll',
  // 添加
  addUrl = '/pc/jiFenGuanLi/tKanjuJifen/insert',
  // 修改
  editUrl = '/pc/jiFenGuanLi/tKanjuJifen/update',
  // 删除
  deleteUrl = '/pc/jiFenGuanLi/tKanjuJifen/delete',
}

// 查询
export const reqSearch = () => request.post<any, any>(API.searchUrl)

// 添加
export const reqAdd = (data: any) =>
  request.post<any, any>(API.addUrl, obj2Query(data))

// 修改
export const reqEdit = (data: any) =>
  request.post<any, any>(API.editUrl, obj2Query(data))

// 删除
export const reqDelete = () => request.post<any, any>(API.deleteUrl)
