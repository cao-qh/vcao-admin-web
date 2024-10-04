import request, { obj2Query } from '@/utils/request'

const API = {
  // 订单查询
  orderUrl: '/pc/tOrder/selectOrderPc',
  // 提单
  submitUrl: '/pc/tOrder/submitOrderPc',
  // 导出
  exportUrl: '/pc/tOrder/dowOrderPC',
  // 修改备注
  editRemarkUrl: '/pc/tOrder/updateNotePc',
  // 修改收货地址
  editAddressUrl: '/pc/tOrder/updateAddressPc',

  // 录单
  recordingUrl: '/pc/tOrder/xiaDanPC',
  // 查询店铺
  searchShopUrl: '/pc/tOrder/selectTShop',
  // 查询套餐
  searchComboUrl: '/pc/tOrder/selectTgoods',
  // 修改入网号
  editNetphoneUrl: '/pc/tOrder/updateNetPhone',

  // 上传证件照
  uploadUrl: '/pc/tOrder/submitOrderPcPic',
  // 查询证件照
  searchFileUrl: '/pc/tOrder/selectZhangJianUpHuiXian',
  // 查询物流
  searchLogisticsUrl: '/pc/tOrder/selectWuLiu',
}

// 订单查询
export const reqOrder = (data: any) =>
  request.post<any, any>(API.orderUrl, obj2Query(data))

// 提单
export const reqSubmit = (data: any) =>
  request.post<any, any>(API.submitUrl, obj2Query(data))

// 导出
export const reqExport = (data: any) =>
  request.post<any, any>(API.exportUrl, obj2Query(data))

// 修改备注
export const reqEditRemark = (data: any) =>
  request.post<any, any>(API.editRemarkUrl, obj2Query(data))

// 修改收货地址
export const reqEditAddress = (data: any) =>
  request.post<any, any>(API.editAddressUrl, obj2Query(data))

// 录单
export const reqRecording = (data: any) =>
  request.post<any, any>(API.recordingUrl, data)

// 查询店铺
export const reqSearchShop = () => request.post<any, any>(API.searchShopUrl)

// 查询套餐
export const reqSearchCombo = () => request.post<any, any>(API.searchComboUrl)

// 修改入网号
export const reqEditNetphone = (data: any) =>
  request.post<any, any>(API.editNetphoneUrl, obj2Query(data))

// 上传证件照
export const reqUpload = (data: any) =>
  request.post<any, any>(API.uploadUrl, data)

// 查询证件照
export const reqSearchFile = (data: any) =>
  request.post<any, any>(API.searchFileUrl, obj2Query(data))

// 查询物流
export const reqSearchLogistics = (data: any) =>
  request.post<any, any>(API.searchLogisticsUrl, obj2Query(data))
