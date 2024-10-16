export interface RequestParams {
  currentPage?: number
  pageSize?: number
  totalSize?: number
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
