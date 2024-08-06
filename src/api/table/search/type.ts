import type { RequestParams, Response, ResponsePagination } from '@/api/type'

// 请求参数
export interface RecordSearchParams extends RequestParams {
  phone?: string
  mianzhi?: string
  tongdao?: string
  zhuangtai?: string
  staticTime: string
  endTime: string
}

export interface Record {
  id?: number
  phone?: string
  mianzhi?: string
  agentname?: string
  tongdao?: number
  chongzhitime?: string
  fankuitime?: null
  zhuangtai?: number
  dingdanhao?: string
  beizhu?: string
}

export interface RecordSearchResponseData extends Response {
  data: ResponsePagination & {
    list: Record[]
  }
}

export interface QijinyongParams {
  id: number
  qijinyong: number
}
