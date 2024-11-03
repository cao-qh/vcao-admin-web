// 统一管理咱们项目用户相关的接口
import request from '@/utils/request'

// 统一管理接口
enum API {
  // 视频合集
  videoCollectionUrl = '/common/selectByShiPinHeJi',
  // 视频章节
  videoChapterUrl = '/common/selectByShiPinZhangJie',
  // 广告
  adUrl = '/common/selectByGuangGao',
}

// 视频合集
export const reqVideoCollection = () =>
  request.post<any, any>(API.videoCollectionUrl)

// 视频章节
export const reqVideoChapter = () => request.post<any, any>(API.videoChapterUrl)

// 广告
export const reqAd = () => request.post<any, any>(API.adUrl)
