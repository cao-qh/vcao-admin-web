// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 查询
  searchUrl = '/pc/tHuiyuanDinggouShichang/selecthysc',
  // 添加
  addUrl = '/pc/tHuiyuanDinggouShichang/insert',
  // 修改
  editUrl = '/pc/tHuiyuanDinggouShichang/update',
  // 上下架
  upDownUrl = '/pc/tHuiyuanDinggouShichang/updateDel',
}

// 查询
export const reqSearch = (data: any) =>
  request.post<any, any>(API.searchUrl, obj2Query(data))

// 添加
export const reqAdd = (data: any) => request.post<any, any>(API.addUrl, data)

// 修改
export const reqEdit = (data: any) => request.post<any, any>(API.editUrl, data)

// 上下架
export const reqUpDown = (data: any) =>
  request.post<any, any>(API.upDownUrl, obj2Query(data))
