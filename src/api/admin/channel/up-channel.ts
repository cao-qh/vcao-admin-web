import request, { obj2Query } from '@/utils/request'

enum API {
  // 查询记录
  search = '/tAdmin/tSupper/selectByAll',
  // 启禁用
  qijinyong = '/tAdmin/tSupper/updateTSupperQiJinYong',
  // 添加
  addUrl = '/tAdmin/tSupper/saveTSupper',
  // 修改
  updateUrl = '/tAdmin/tSupper/updateTSupper',
}

// 查询代理列表
export const reqSearch = (data: any) =>
  request.post<any, any>(API.search, obj2Query(data))

// 启禁用
export const reqQijinyong = (data: any) =>
  request.post<any, any>(API.qijinyong, obj2Query(data))

// 添加
export const reqAdd = (data: any) =>
  request.post<any, any>(API.addUrl, obj2Query(data))

// 修改
export const reqUpdate = (data: any) =>
  request.post<any, any>(API.updateUrl, obj2Query(data))
