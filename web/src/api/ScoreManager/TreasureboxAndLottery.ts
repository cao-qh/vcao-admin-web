// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 查询
  searchUrl = '/pc/jiFenGuanLi/tKaibaoxiangKaixinchouchouJifen/getAll',
  // 添加
  addUrl = '/pc/jiFenGuanLi/tKaibaoxiangKaixinchouchouJifen/insert',
  // 修改
  editUrl = '/pc/jiFenGuanLi/tKaibaoxiangKaixinchouchouJifen/update',
  // 删除
  deleteUrl = '/pc/jiFenGuanLi/tKaibaoxiangKaixinchouchouJifen/delete',
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
export const reqDelete = (id: any) =>
  request.post<any, any>(API.deleteUrl, obj2Query({ id }))
