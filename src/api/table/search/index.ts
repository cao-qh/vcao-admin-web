import request from '@/utils/request'

import type { Record, QijinyongParams } from './type'

enum API {
  // 查询记录
  search = '/table/search',
  // 添加记录
  add = '/table/add',
  // 批量导入
  batchImport = '/table/import',
  // 修改
  edit = '/table/update',
  // 提单
  submit = '/table/submit',
  // 启禁用
  qijinyong = '/table/qijinyong',
  // 详情
  detail = '/table/detail',
}

// 查询列表
export const reqSearch = (data: any) =>
  request.get<any, any>(API.search, { params: data })

// 添加记录
export const reqAdd = (data: Record) => request.post<any, any>(API.add, data)

// 批量导入
export const reqAddBatch = (data: FormData) =>
  request.post<any, any>(API.batchImport, data)

// 更换通道并提单
export const reqEdit = (data: Record) => request.post<any, any>(API.edit, data)

// 提单
export const reqSubmit = (dingdanhao: string) =>
  request.post<any, any>(API.submit, dingdanhao)

// 启禁用
export const reqQijinyong = (data: QijinyongParams) =>
  request.post<any, any>(API.qijinyong, data)

// 详情
export const reqDetail = (data: Record) =>
  request.get<any, any>(API.detail, { params: data })
