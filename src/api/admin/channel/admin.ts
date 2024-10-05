import request, { obj2Query } from '@/utils/request'

enum API {
  // 查询记录
  search = '/tAdmin/cunliang/selectAdmin',
  // 启禁用
  qijinyong = '/tAdmin/cunliang/updateAdminDel',
  // 配置权限查询
  configPermissionSearchUrl = '/tAdmin/tQuanxian/adminQuanXianQuery',
  // 配置权限
  configPermissionUrl = '/tAdmin/tQuanxian/adminQuanXianPeiZhi',
  // 添加
  addUrl = '/tAdmin/cunliang/addAdmin',
  // 修改
  updateUrl = '/tAdmin/cunliang/updateAdmin',
}

// 查询代理列表
export const reqSearch = (data: any) =>
  request.post<any, any>(API.search, obj2Query(data))

// 启禁用
export const reqQijinyong = (data: any) =>
  request.post<any, any>(API.qijinyong, obj2Query(data))

// 配置权限查询
export const reqConfigPermissionSearch = (data: any) =>
  request.post<any, any>(API.configPermissionSearchUrl, obj2Query(data))

// 配置权限
export const reqConfigPermission = (data: any) =>
  request.post<any, any>(API.configPermissionUrl, obj2Query(data))

// 添加
export const reqAdd = (data: any) =>
  request.post<any, any>(API.addUrl, obj2Query(data))

// 修改
export const reqUpdate = (data: any) =>
  request.post<any, any>(API.updateUrl, obj2Query(data))
