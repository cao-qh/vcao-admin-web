// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 查询
  searchUrl = '/pc/jiFenGuanLi/tQiandaoJifen/getAll',
  // 添加
  addUrl = '/pc/jiFenGuanLi/tQiandaoJifen/insert',
  // 修改
  editUrl = '/pc/jiFenGuanLi/tQiandaoJifen/update',
  // 删除
  deleteUrl = '/pc/jiFenGuanLi/tQiandaoJifen/delete',
}

// 查询
export const reqSearch = (data: any) =>
  request.post<any, any>(API.searchUrl, obj2Query(data))

// 添加
export const reqAdd = (data: any) =>
  request.post<any, any>(API.addUrl, obj2Query(data))

// 修改
export const reqEdit = (data: any) =>
  request.post<any, any>(API.editUrl, obj2Query(data))

// 删除
export const reqDelete = (id: any) =>
  request.post<any, any>(API.deleteUrl, obj2Query({ id }))
