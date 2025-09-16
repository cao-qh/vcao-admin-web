import request, { obj2Query } from '@/utils/request'

// 个人管理
enum API {
  // 个人信息 查
  selectUserInfo = '/info',
  // 个人信息 修改
  editUserInfo = '/pc/yonghu/xiugai',
}

// 个人信息 查
export const selectUserInfo = () => request.post(API.selectUserInfo)

// 个人信息 修改
export const editUserInfo = (data: any) =>
  request.post<any, any>(API.editUserInfo, obj2Query(data))
