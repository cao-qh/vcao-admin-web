// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 查询
  searchUrl = '/pc/tYonghuXieyi/select',
  // 添加或修改
  addOrUpdate = '/pc/tYonghuXieyi/insertOrUpdate',
}

// 查询
export const reqSearch = (id: number) =>
  request.post<any, any>(API.searchUrl, obj2Query({ id }))

// 添加或修改
export const reqAddOrUpdate = (data: any) =>
  request.post<any, any>(API.addOrUpdate, obj2Query(data))
