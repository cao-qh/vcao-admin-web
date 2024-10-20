// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 查询
  searchUrl = '/tAdmin/tTemplatemode/selectByAll',
  // 添加
  addUrl = '/tAdmin/tTemplatemode/saveTemplatemode',
  // 修改
  updateUrl = '/tAdmin/tTemplatemode/updateTemplatemode',
}

// 获取省份
export const reqSearch = (data: any) =>
  request.post(API.searchUrl, obj2Query(data))

// 添加
export const reqAdd = (data: any) => request.post(API.addUrl, obj2Query(data))

// 修改
export const reqUpdate = (data: any) =>
  request.post(API.updateUrl, obj2Query(data))
