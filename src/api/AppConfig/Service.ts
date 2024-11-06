// 统一管理咱们项目用户相关的接口
import request from '@/utils/request'

// 统一管理接口
enum API {
  // 查询
  searchUrl = '/pc/tLianxiKefu/selectKeFu',
  // 添加或修改
  addOrEditUrl = '/pc/tLianxiKefu/insertAndUpdate',
}

// 查询
export const reqSearch = () => request.post<any, any>(API.searchUrl)

// 添加或修改
export const reqAddOrEdit = (data: any) =>
  request.post<any, any>(API.addOrEditUrl, data)
