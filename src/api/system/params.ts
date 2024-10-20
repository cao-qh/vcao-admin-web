// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 查询
  searchUrl = '/tAdmin/tTemplate/selectByAll',
  // 添加
  addUrl = '/tAdmin/tTemplate/saveTemplate',
  // 查询接口模板
  searchInterfaceUrl = '/tAdmin/tTemplate/selectBySaveTemplate',
  // 修改参数模板
  updateUrl = '/tAdmin/tTemplate/updateTemplate',

  // 查询Json数据
  searchJsonUrl = '/tAdmin/tTemplate/selectTemplateJson',
  // 修改Json数据
  updateJsonUrl = '/tAdmin/tTemplate/updateTemplateJson',
  // 启禁用
  qijinyong = '/tAdmin/tTemplate/updateTemplateQiJinYong',
}

// 查询
export const reqSearch = (data: any) =>
  request.post(API.searchUrl, obj2Query(data))

// 添加
export const reqAdd = (data: any) => request.post(API.addUrl, obj2Query(data))

// 查询接口模板
export const reqSearchInterface = (data: any) =>
  request.post(API.searchInterfaceUrl, obj2Query(data))

// 修改参数模板
export const reqUpdate = (data: any) =>
  request.post(API.updateUrl, obj2Query(data))

// 查询Json数据
export const reqSearchJson = (data: any) =>
  request.post(API.searchJsonUrl, obj2Query(data))

// 修改Json数据
export const reqUpdateJson = (data: any) =>
  request.post(API.updateJsonUrl, obj2Query(data))

// 启禁用
export const reqQijinyong = (data: any) =>
  request.post(API.qijinyong, obj2Query(data))
