// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 查询
  searchUrl = '/pc/jiFenGuanLi/tGuanggaoJifen/getAll',
  // 添加
  addUrl = '/pc/jiFenGuanLi/tGuanggaoJifen/insert',
  // 修改
  editUrl = '/pc/jiFenGuanLi/tGuanggaoJifen/update',
  // 删除
  deleteUrl = '/pc/jiFenGuanLi/tGuanggaoJifen/delete',
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
export const reqDelete = () => request.delete<any, any>(API.deleteUrl)
