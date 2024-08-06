export interface RequestParams {
  page?: number
  size?: number
  limit?: number
  [key: string]: any
}

export interface Response {
  code: number
  message: string
  data: null | object
}

export interface ResponsePagination {
  total: number
  current: number
  size: number
  pages: number
}
