export interface STableProps {
  // 每行数据的索引值
  rowKey?: ((row: any, index: number) => string) | string
  // 表格的列数据
  columns?: any[]
  // 分页器的 切换每页展示数据条数下拉菜单数据的数据
  pageSizeOptions?: string[]
  // 表格第一行是否可以勾选
  rowSelection?: any
  // 表格是否滚动设置
  scroll?: any
  // 异步加载数据的方法 返回对象 {data:Array , total: number}
  data?: (page: number, limit: number) => any
  // 是否加载时调用请求数据方法 默认是 true
  loadData?: boolean
  // 是否展示分页器 默认不展示
  showPagination?: boolean
  // 默认展开行的 key 数组
  defaultExpandedRowKeys?: string | number[]
}
