// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 查询
  searchUrl = '/pc/tShipinHeji/selectByAll',
  // 添加
  addUrl = '/pc/tShipinHeji/saveTShipinHeji',
  // 修改
  editUrl = '/pc/tShipinHeji/updateTShipinHeji',
  // 上下架
  upDownUrl = '/pc/tShipinHeji/updateShangXiaJia',
  // 详情
  detailUrl = '/pc/tShipinHeji/selectByOne',
  // 查询演员
  searchActorUrl = '/pc/tShipinHeji/selectByYanYuanPeiZhi',
  // 配置演员
  configActorUrl = '/pc/tShipinHeji/yanYuanPeiZhi',
  // 小类查询
  searchSmallClassUrl = '/pc/tShipinHeji/selectByXiaoLeiPeiZhi',
  // 配置小类
  configSmallClassUrl = '/pc/tShipinHeji/xiaoLeiPeiZhi',
  // 展示类别查询
  searchShowClassUrl = '/pc/tShipinHeji/selectByLeiBiePeiZhi',
  // 配置展示类别
  configShowClassUrl = '/pc/tShipinHeji/leiBiePeiZhi',
  // 查询章节
  searchChapterUrl = '/pc/tShipinZhangjie/selectByAll',
  // 添加章节
  addChapterUrl = '/pc/tShipinZhangjie/saveTShipinZhangjie',
  // 修改章节
  editChapterUrl = '/pc/tShipinZhangjie/updateTShipinZhangjie',
  // 删除章节
  deleteChapterUrl = '/pc/tShipinZhangjie/deleteTShipinZhangjie',
  // 上下架章节
  upDownChapterUrl = '/pc/tShipinZhangjie/updateShangXiaJia',
  // 批量上传章节
  uploadChapterUrl = '/pc/tShipinZhangjie/saveTShipinZhangjieList',
}

//#region

// 查询
export const reqSearch = (data: any) =>
  request.post<any, any>(API.searchUrl, obj2Query(data))

// 添加
export const reqAdd = (data: any) => request.post<any, any>(API.addUrl, data)

// 修改
export const reqEdit = (data: any) => request.post<any, any>(API.editUrl, data)

// 上下架
export const reqUpDown = (data: any) =>
  request.post<any, any>(API.upDownUrl, obj2Query(data))

// 详情
export const reqDetail = (data: any) =>
  request.post<any, any>(API.detailUrl, obj2Query(data))

// 查询演员
export const reqSearchActor = (data: any) =>
  request.post<any, any>(API.searchActorUrl, obj2Query(data))

// 配置演员
export const reqConfigActor = (bianma: string, data: any) =>
  request.post<any, any>(API.configActorUrl + `?bianma=${bianma}`, data)

// 小类查询
export const reqSearchSmallClass = (data: any) =>
  request.post<any, any>(API.searchSmallClassUrl, obj2Query(data))

// 配置小类
export const reqConfigSmallClass = (bianma: string, data: any) =>
  request.post<any, any>(API.configSmallClassUrl + `?bianma=${bianma}`, data)

// 展示类别查询
export const reqSearchShowClass = (data: any) =>
  request.post<any, any>(API.searchShowClassUrl, obj2Query(data))

// 配置展示类别
export const reqConfigShowClass = (bianma: string, data: any) =>
  request.post<any, any>(API.configShowClassUrl + `?bianma=${bianma}`, data)

// #endregion

// 查询章节
export const reqSearchChapter = (data: any) =>
  request.post<any, any>(API.searchChapterUrl, obj2Query(data))

// 添加章节
export const reqAddChapter = (data: any) =>
  request.post<any, any>(API.addChapterUrl, data)

// 修改章节
export const reqEditChapter = (data: any) =>
  request.post<any, any>(API.editChapterUrl, data)

// 删除章节
export const reqDeleteChapter = (data: any) =>
  request.post<any, any>(API.deleteChapterUrl, obj2Query(data))

// 上下架章节
export const reqUpDownChapter = (data: any) =>
  request.post<any, any>(API.upDownChapterUrl, obj2Query(data))

// 批量上传章节
export const reqUploadChapter = (data: any) =>
  request.post<any, any>(API.uploadChapterUrl, data)
