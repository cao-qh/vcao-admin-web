// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 查询
  searchUrl = '/pc/jiFenGuanLi/tKanjuJifen/getAll',
  // 修改
  editUrl = '/pc/jiFenGuanLi/tKanjuJifen/update',
}

// 查询
export const reqSearch = () => request.post<any, any>(API.searchUrl)

// 修改
export const reqEdit = (data: any) =>
  request.post<any, any>(API.editUrl, obj2Query(data))
