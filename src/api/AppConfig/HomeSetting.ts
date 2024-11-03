// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 查询
  searchUrl = '/pc/tShouyeJuchangShezhi/selectsyjc',
  // 添加
  addUrl = '/pc/tShouyeJuchangShezhi/insert',
  // 修改
  editUrl = '/pc/tShouyeJuchangShezhi/updatesyjc',
  // 删除
  deleteUrl = '/pc/tShouyeJuchangShezhi/deletasyjc',
}

// 查询
export const reqSearch = (data: any) =>
  request.post<any, any>(API.searchUrl, obj2Query(data))

// 添加
export const reqAdd = (data: any) => request.post<any, any>(API.addUrl, data)

// 修改
export const reqEdit = (data: any) => request.post<any, any>(API.editUrl, data)

// 删除
export const reqDelete = (id: number) =>
  request.post<any, any>(API.deleteUrl, obj2Query({ id }))
