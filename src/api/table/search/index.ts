import request from '@/utils/request'

import type {
  RecordSearchParams,
  RecordSearchResponseData,
  Record,
  QijinyongParams,
} from './type'

enum API {
  // 查询记录
  SEARCH_URL = '/table/search',
  // 添加记录
  ADD_URL = '/table/add',
  // 批量导入
  ADD_BATCH_URL = '/table/import',
  // 更换通道并提单
  UPDATE_SUBMIT_URL = '/table/changeAndSubmit',
  // 提单
  SUBMIT_URL = '/table/submit',
  // 启禁用
  QIJINYONG_URL = '/table/qijinyong',
}

// 查询代理列表
export const reqSearch = (data: RecordSearchParams) =>
  request.get<any, RecordSearchResponseData>(API.SEARCH_URL, { params: data })

// 添加记录
export const reqAdd = (data: Record) =>
  request.post<any, any>(API.ADD_URL, data)

// 批量导入
export const reqAddBatch = (data: FormData) =>
  request.post<any, any>(API.ADD_BATCH_URL, data)

// 更换通道并提单
export const reqUpdateSubmit = (data: Record) =>
  request.post<any, any>(API.UPDATE_SUBMIT_URL, data)

// 提单
export const reqSubmit = (dingdanhao: string) =>
  request.post<any, any>(API.SUBMIT_URL, dingdanhao)

// 启禁用
export const reqQijinyong = (data: QijinyongParams) =>
  request.post<any, any>(API.QIJINYONG_URL, data)
