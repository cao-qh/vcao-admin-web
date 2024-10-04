import request, { obj2Query } from '@/utils/request'

// 个人管理
enum API {
  // 个人信息 查
  selectUserInfo = '/tAdmin/cunliang/selectMyAdmin',
  // 个人信息 修改
  editUserInfo = '/tAdmin/cunliang/updateMyAdmin',
  // 个人日志 查
  selectUserLog = '/tAdmin/cunliang/selectMyAdminLog',
}

// 个人信息 查
export const selectUserInfo = () => request.post(API.selectUserInfo)

// 个人信息 修改
export const editUserInfo = (data: any) =>
  request.post<any, any>(API.editUserInfo, obj2Query(data))

// 个人日志 查
export const selectUserLog = (data: any) =>
  request.post<any, any>(API.selectUserLog, obj2Query(data))
