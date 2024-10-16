import request, { obj2Query } from '@/utils/request'

// 个人管理
enum API {
  // 个人信息 查
  selectUserInfo = '/tAgent/selectByMy',
  // 个人信息 修改
  editUserInfo = '/tAgent/updateTAgent',
  // API 查
  selectUserApi = '/tAgent/selectByMyAPI',
  // API 修改
  editUserApi = '/tAgent/updateByMyAPI',
  // 个人日志 查
  selectUserLog = '/tAgent/tAgentLog/selectByAll',
}

// 个人信息 查
export const selectUserInfo = () => request.post(API.selectUserInfo)

// 个人信息 修改
export const editUserInfo = (data: any) =>
  request.post<any, any>(API.editUserInfo, obj2Query(data))

// API 查
export const selectUserApi = () => request.post(API.selectUserApi)

// API 修改
export const editUserApi = (data: any) =>
  request.post<any, any>(API.editUserApi, obj2Query(data))

// 个人日志 查
export const selectUserLog = (data: any) =>
  request.post<any, any>(API.selectUserLog, obj2Query(data))
