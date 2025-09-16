// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 查询
  searchUrl = '/pc/yonghu/selectAll',
  // 查询权限
  searchPermissionUrl = '/pc/yonghu/selectQuanXian',
  // 配置权限
  configPermissionUrl = '/pc/yonghu/peiZhiQuanXian',
  // 启禁用
  enableUrl = '/pc/yonghu/qijinyong',
  // 添加
  addUrl = '/pc/yonghu/add',
  // 修改
  editUrl = '/updateinfo',
}

// 查询
export const reqSearch = (data: any) =>
  request.post<any, any>(API.searchUrl, obj2Query(data))

// 查询权限
export const reqSearchPermission = (data: any) =>
  request.post<any, any>(API.searchPermissionUrl, obj2Query(data))

// 配置权限
export const reqConfigPermission = (data: any) =>
  request.post<any, any>(API.configPermissionUrl, obj2Query(data))

// 启禁用
export const reqEnable = (data: any) =>
  request.post<any, any>(API.enableUrl, obj2Query(data))

// 添加
export const reqAdd = (data: any) =>
  request.post<any, any>(API.addUrl, obj2Query(data))

// 修改
export const reqEdit = (data: any) =>
  request.post<any, any>(API.editUrl, obj2Query(data))
